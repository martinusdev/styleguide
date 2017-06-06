#!/bin/bash

STATUS="$(git status)"

if [[ $STATUS == *"nothing to commit, working directory clean"* ]]
then
    # remove `dist` from .gitignore
    sed -i"" '/dist/d' ./.gitignore #linux
    sed -i "" '/dist/d' ./.gitignore #macos
    # set git user settings
    # git config --global user.email "build@lbstudio.com"
    # git config --global user.name "Build"
    # add files to commit
    git add .
    git commit -m "Build"
    # push dist subtree to build branch
    git push origin `git subtree split --prefix dist master`:build --force
    # reset last commit
    git reset HEAD~
    # reset gitignore
    git checkout .gitignore
else
    echo "Need clean working directory to publish"
fi
