#!/usr/bin/env sh
# Deploying to github pages
# Dee: https://vitejs.dev/guide/#index-html-and-project-root

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -am 'update client'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Yanipo5/Todo-Vue-3.git main:gh-pages

cd -
