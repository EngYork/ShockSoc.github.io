#!/bin/bash
set -e

repo_uri="https://x-access-token:${ACCESS_TOKEN}@github.com/ShockSoc/ShockSoc.github.io.git"
remote_name="origin"

pip install -r requirements.txt

python3 shock.py build

cd build/
# create a fresh new git repo in the output directory
git init
git checkout -b master
git add -A
git commit -m 'deploy'

git push -f "$repo_uri" master:gh-deploy