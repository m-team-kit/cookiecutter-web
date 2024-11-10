FROM node:22 AS git-version

WORKDIR /app
COPY lib lib
COPY ["package.json", "pnpm-lock.yaml", "next.config.js", "tsconfig.json", ".eslintrc.json", ".prettierrc", "postcss.config.js", "tailwind.config.mjs", "./"]

# determine footer version
#COPY .git/ ./.git/
#RUN yarn git-info

FROM node:22 AS base
# new base because we don't want .git

WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "next.config.js", "tsconfig.json", ".eslintrc.json", ".prettierrc", "postcss.config.js", "tailwind.config.mjs", "./"]
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && pnpm install
# copy necessary files
#COPY [".env", "./"]
COPY public public
COPY styles styles
COPY pages pages
COPY components components
COPY lib lib
COPY issue_templates issue_templates

WORKDIR /app/lib/client
RUN npm run build
WORKDIR /app

FROM base AS prod-build
# relative
ARG BACKEND_URL
ENV NEXT_PUBLIC_API_HOST=${BACKEND_URL}
ARG OAUTH_AUTHORITY
ENV NEXT_PUBLIC_OAUTH_AUTHORITY=${OAUTH_AUTHORITY}
ARG OIDC_REDIRECT_HOST
ENV NEXT_PUBLIC_OIDC_REDIRECT_HOST=${OIDC_REDIRECT_HOST}
ARG OIDC_CLIENT_ID
ENV NEXT_PUBLIC_OIDC_CLIENT_ID=${OIDC_CLIENT_ID}
ARG REPOSITORY_URL
ENV NEXT_PUBLIC_TEMPLATE_REPOSITORY=${REPOSITORY_URL}
ARG FORCED_TAGS
ENV NEXT_PUBLIC_FORCED_TAGS=${FORCED_TAGS}

RUN pnpm run build

FROM node:22-alpine AS production
ENV NODE_ENV=production

WORKDIR /app
COPY --from=prod-build /app/package.json .
COPY --from=prod-build /app/pnpm-lock.yaml .
COPY --from=prod-build /app/next.config.js .
COPY --from=prod-build /app/public ./public
COPY --from=prod-build /app/.next/static ./.next/static
COPY --from=prod-build /app/.next/standalone ./
COPY issue_templates issue_templates

EXPOSE 3000
CMD ["node", "server.js"]

FROM base AS development
ENV NODE_ENV=development

EXPOSE 3000
CMD [ "pnpm", "run", "dev" ]
