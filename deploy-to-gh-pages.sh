yarn build

git checkout --orphan gh-pages
git rm -rf .

git checkout origin/main -- dist/*

git add .
git commit -m "built"

git push -u origin HEAD

git checkout main