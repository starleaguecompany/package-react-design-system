FROM node:14-alpine as build
WORKDIR /build

ARG GITHUB_NPM_TOKEN
RUN npm set progress=false \
    && echo "@sravni:registry=https://npm.pkg.github.com/" > ~/.npmrc \
    && echo "//npm.pkg.github.com/:_authToken=${GITHUB_NPM_TOKEN}" >> ~/.npmrc

COPY yarn.lock package.json ./
RUN yarn --ignore-engines
COPY . .
RUN yarn build:storybook

FROM nginx:alpine
COPY --from=build /build/storybook-static /usr/share/nginx/html
