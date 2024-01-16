FROM node:18 as git-version

WORKDIR /app
COPY lib lib
COPY ["package.json", "yarn.lock", "next.config.js", "tsconfig.json", ".eslintrc.json", ".prettierrc", "postcss.config.js", "tailwind.config.mjs", "./"]

# determine footer version
#COPY .git/ ./.git/
#RUN yarn git-info

FROM node:18 as base
# new base because we don't want .git

WORKDIR /app

COPY ["package.json", "yarn.lock", "next.config.js", "tsconfig.json", ".eslintrc.json", ".prettierrc", "postcss.config.js", "tailwind.config.mjs", "./"]
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn install
# copy necessary files
#COPY [".env", "./"]
COPY public public
COPY styles styles
COPY pages pages
COPY components components
COPY lib lib

#COPY --from=git-version /app/utils/generatedGitInfo.json utils/generatedGitInfo.json

FROM base as prod-build
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

RUN yarn build

FROM node:18-alpine as production
ENV NODE_ENV=production

WORKDIR /app
COPY --from=prod-build /app/package.json .
COPY --from=prod-build /app/yarn.lock .
COPY --from=prod-build /app/next.config.js .
COPY --from=prod-build /app/public ./public
COPY --from=prod-build /app/.next/static ./.next/static
COPY --from=prod-build /app/.next/standalone ./

EXPOSE 3000
CMD ["node", "server.js"]

FROM base as development
ENV NODE_ENV=development

EXPOSE 3000
CMD [ "yarn", "dev" ]
