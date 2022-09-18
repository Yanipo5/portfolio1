#!/usr/bin/env sh
# Deploying to github pages
# Dee: https://vitejs.dev/guide/#index-html-and-project-root

# abort on errors
set -e

# build
# npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

echo "1"
git init
# echo "2"
# git checkout -b main
echo "3"
git add -A
echo "4"
git commit -m 'deploy'
echo "5"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Yanipo5/portfolio1.git main:gh-pages
echo "6"

cd -
