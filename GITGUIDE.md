# Git Guide

Follow the following Git steps when adding a new feature:

1. Create a new local feature branch. `git checkout -b BRANCH_NAME`
2. Commit commit commit. `git commit -m 'MESSAGE'`
3. Push local feature branch to github repository. `git push REMOTE_NAME BRANCH_NAME`
4. Create pull request to dev branch.

AFTER Code Reviews

1. Squash commits.
  * Get commit hash of last commit to not be squashed. `git log`
  * Squash. `git rebase -i COMMIT_HASH`
2. Pull remote dev branch to local dev. `git pull REMOTE_NAME dev`
3. Rebase local feature branch onto dev. `git rebase dev`
4. Push final version of local feature branch to github repository. `git push -f REMOTE_NAME BRANCH_NAME`

**Note:** DO NOT push broken code!!!

## Testing a PR
A pull request will be associated to a branch. You will find it at the top of a pull request, the part where it says 

> (user) wants to merge 1 commit into dev from login-view

Here, github tells us the PR is coming from the `login-view` branch. So first, we need to make sure we have the latest code on **all branches**. To do that use the command

```
git fetch --all
```

Now you have the latest code, now checkout the branch you want to test. In this case `login-view`. Also, keep in mind that this is not a branch you created, it is a branch that lives in the `upstream` repo. So to check it out, use.

```
git checkout upstream/login-view
```

Now, everything in you project directory will be exactly how it looked at the moment the other developer made the Pull request. So you are able to more faithully test the changes as they were in his machine.