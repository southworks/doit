# How to contribute to DoIT


This repo is a reference and learning resource and everyone is invited to contribute, however not all PRs will be accepted automatically into the main branch (**`dev`**).

## DoIT - GIT GUIDE

Following are the most important branches:

- `dev`: Contains the latest code **and it is the branch actively developed**. Note that **all PRs must be against `dev` branch to be considered**. 
- `master`: Synced time to time from dev. It contains "stable" code, although not the latest one. We plan to do periodic merges from `dev` to `master`.

Any other branch is considered temporary and could be deleted at any time. Do not do any PR to them!

### How to start

Clone the repository in your local folder with
`git clone https://github.com/southworks/doit.git`

Then, check if your remote is called **origin** and points to the repo url with
`git remote -v`

Create a local dev branch with
`git checkout -b dev`
and pull the latest changes :
`git fetch origin dev`
and
`git pull origin dev`

After that, create a new branch of task or feature related with a camelCased name e.g. getById
`git checkout -b getById`

### How to push local changes

If we want to push our changes to the repo, first we need to check our files status
`git status`
Files labeled in red are the ones that were changed and what we were to commit
`git add .`
To **add** all files
`git commit -m "Short description of changes to push"`
To **commit** the added files with a message
Then, we are going to pull the latest changes of dev branch and rebase them
`git pull --rebase origin dev`
If all it's ok, we should push our changes to the remote repo
`git push origin getById`

Sometimes, we may found conflicts that must to resolve with rebasing tool. You will notice that  your branch has suffix **| REBASE x/x** in parentheses.

To resolve this conflicts, open vs code and navigate into **source control** pan. Then, select the files what you want to resolve and check the code lines of our **local changes** and **dev code.**
Finally, **stage** the conflicted files and go to **git bash**
`git rebase --continue`
And push the changes
`git push origin getById`

So, with the local changes pushed to our remote repo go to GitHub project repo and click in **New pull request**

Compare changes between **base: dev** and **compare: getById** branch. Then click in **Create pull request** and confirm.

## [Glossary]
[GitGlossary](https://git-scm.com/docs/gitglossary)

#### master

The default development  [branch](https://git-scm.com/docs/gitglossary#def_branch). Whenever you create a Git  [repository](https://git-scm.com/docs/gitglossary#def_repository), a branch named "master" is created, and becomes the active branch. In most cases, this contains the local development, though that is purely by convention and is not required.


#### branch

A "branch" is an active line of development. The most recent  [commit](https://git-scm.com/docs/gitglossary#def_commit)  on a branch is referred to as the tip of that branch. The tip of the branch is referenced by a branch  [head](https://git-scm.com/docs/gitglossary#def_head), which moves forward as additional development is done on the branch. A single Git  [repository](https://git-scm.com/docs/gitglossary#def_repository)  can track an arbitrary number of branches, but your  [working tree](https://git-scm.com/docs/gitglossary#def_working_tree)  is associated with just one of them (the "current" or "checked out" branch), and  [HEAD](https://git-scm.com/docs/gitglossary#def_HEAD)  points to that branch.

#### checkout

The action of updating all or part of the  [working tree](https://git-scm.com/docs/gitglossary#def_working_tree)  with a  [tree object](https://git-scm.com/docs/gitglossary#def_tree_object)  or  [blob](https://git-scm.com/docs/gitglossary#def_blob_object)  from the  [object database](https://git-scm.com/docs/gitglossary#def_object_database), and updating the  [index](https://git-scm.com/docs/gitglossary#def_index)  and  [HEAD](https://git-scm.com/docs/gitglossary#def_HEAD)  if the whole working tree has been pointed at a new  [branch](https://git-scm.com/docs/gitglossary#def_branch).


#### commit

As a noun: A single point in the Git history; the entire history of a project is represented as a set of interrelated commits. The word "commit" is often used by Git in the same places other revision control systems use the words "revision" or "version". Also used as a short hand for  [commit object](https://git-scm.com/docs/gitglossary#def_commit_object).

#### fetch

Fetching a  [branch](https://git-scm.com/docs/gitglossary#def_branch)  means to get the branch’s  [head ref](https://git-scm.com/docs/gitglossary#def_head_ref)  from a remote  [repository](https://git-scm.com/docs/gitglossary#def_repository), to find out which objects are missing from the local  [object database](https://git-scm.com/docs/gitglossary#def_object_database), and to get them, too. See also  [git-fetch[1]](https://git-scm.com/docs/git-fetch).

#### rebase

To reapply a series of changes from a  [branch](https://git-scm.com/docs/gitglossary#def_branch)  to a different base, and reset the  [head](https://git-scm.com/docs/gitglossary#def_head)  of that branch to the result.
