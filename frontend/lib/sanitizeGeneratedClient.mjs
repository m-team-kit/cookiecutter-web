import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';

const WORK_DIR = './client';

const ifProvided = (value) => {
  return value && value.length > 0 ? value : undefined
}

const GIT_REPO_URL = ifProvided(process.env.GIT_REPO_URL);
const AUTHOR = process.env.AUTHOR ?? "User";
const LICENSE = process.env.LICENSE ?? "UNLICENSED";

const sanitizePackageJson = async () => {
  const dirtyPackageJson = JSON.parse(fs.readFileSync(`${WORK_DIR}/package.json`, 'utf8'));

  delete dirtyPackageJson.main;
  dirtyPackageJson.module = './dist/index.js';
  dirtyPackageJson.sideEffects = false;

  dirtyPackageJson.dependencies.axios = '^1.4.0';
  // cloudflare pages configured to node 18, don't use higher versions
  dirtyPackageJson.devDependencies['@types/node'] = '^18.16.17';
  dirtyPackageJson.devDependencies['typescript'] = '^5.1.6';

  if (GIT_REPO_URL === undefined) {
    delete dirtyPackageJson.repository;
  }
  else {
    dirtyPackageJson.repository = {
      type: 'git',
      url: GIT_REPO_URL,
    };
  }

  dirtyPackageJson.license = LICENSE;
  dirtyPackageJson.author = AUTHOR;

  dirtyPackageJson.type = "module";
  dirtyPackageJson.exports = {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/index.js",
      default: "./dist/index.js",
    }
  };

  dirtyPackageJson.files = [
    "/dist",
    "/package.json",
    "/README.md",
  ];

  fs.writeFileSync(`${WORK_DIR}/package.json`, JSON.stringify(dirtyPackageJson, null, 2), 'utf8');
};

const sanitizeTsConfig = async () => {
  const dirtyTsConfig = JSON.parse(fs.readFileSync(`${WORK_DIR}/tsconfig.json`, 'utf8'));

  dirtyTsConfig.compilerOptions.target = 'ES6';
  dirtyTsConfig.compilerOptions.module = 'NodeNext';
  dirtyTsConfig.compilerOptions.moduleResolution = 'NodeNext';
  dirtyTsConfig.compilerOptions.allowSyntheticDefaultImports = true;
  delete dirtyTsConfig.compilerOptions.lib;

  fs.writeFileSync(`${WORK_DIR}/tsconfig.json`, JSON.stringify(dirtyTsConfig, null, 2), 'utf8');
};

const sanitizeTsImports = async () => {
  // https://gist.github.com/lovasoa/8691344?permalink_comment_id=3299089#gistcomment-3299089
  async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
      const entry = path.join(dir, d.name);
      if (d.isDirectory()) {
        yield* await walk(entry);
      }
      else if (d.isFile()) {
        yield entry;
      }
    }
  }

  for await (const p of walk(`${WORK_DIR}/`)) {
    if (p.endsWith('.ts')) {
      fs.writeFileSync(
          p,
          fs.readFileSync(p, 'utf8')
              // replace imports of files with *.js
              .replaceAll(
                  /(from\s+)(["'])(?!.*\.js)(\.?\.\/(?!(apis|models)["']).*)(["'])/g,
                  '$1$2$3.js$5')
              // replace imports of api/models folders with */index.js
              .replaceAll(
                  /(from\s+)(["'])(?!.*\.js)(\.?\.\/(apis|models))(["'])/g,
                  '$1$2$3/index.js$5'),
          'utf8');
    }
  }
}

await Promise.all([
  sanitizePackageJson(),
  sanitizeTsConfig(),
  sanitizeTsImports(),
]);
