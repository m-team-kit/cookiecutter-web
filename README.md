# THIS REPOSITORY HAS MOVED

**New commits to this old location are no longer found by anyone!**

The location for this project moved here: https://codebase.helmholtz.cloud/m-team/ai/cookiecutter-web

# What to do next

- If you want to clone this repo: Follow instructions here: https://codebase.helmholtz.cloud/m-team/ai/cookiecutter-web
- If you want to continue your development, and have not yet pulled: replace the remote `git.scc.kit.edu` with the new one, following the instructions here: https://codebase.helmholtz.cloud/m-team/ai/cookiecutter-web
- If you have already pulled, and you can run bash scripts: Run `migrate.sh` (see below)
- If you have already pulled, but cannot run the migration script: see below under "manual"



# migrate.sh

First of all **MAKE A BACKUP**

For migration, just run the script `migrate.sh` found in this repository.
Observe `/tmp/migrate.log` for logs.

Please run `migrate.sh` before you push!



# Manual

In case you can't use `migrate.sh` (often on some weird environment (windows, or an IDE)), you need to click your way to do two steps manually:

1. Revert to the last status before this ugly message appeared:
    `git reset --hard ORIG_HEAD`
2. Replace the remote `git.scc.kit.edu` with the new one: `git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git`
3. Remove the old remote: `git remote remove ...git.scc.kit.edu...`
3. `git push` to the new remote (may need extra parameters to set the default upstream)



# General notes

To keep you safe, I've protected all branches on the git.scc.kit.edu

## DO NOTs

- Push new branches here!
- Accept any pull requests on this repository
  You can use "Settings => Repository => Protected branches => Add => '*'"
  To turn off pushing.


`Rather push new branches to the new repo, by running:`
```
git remote rename origin old-scc-origin
git remote add origin git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git
git push -u origin <branch name>
```

# Help my data is lost

Contact marcus in case of problems. (Even if he can't help you, you can at
least yell at him, as a revenge for all your lost files).
