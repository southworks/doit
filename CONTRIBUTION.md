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
![Git Bash console with rebasing tool](https://sofes.miximages.com/git/fI4Qr.jpg)

To resolve this conflicts, open vs code and navigate into **source control** pan. Then, select the files what you want to resolve and check the code lines of our **local changes** and **dev code.**
Finally, **stage** the conflicted files and go to **git bash**
`git rebase --continue`
And push the changes
`git push origin getById`

So, with the local changes pushed to our remote repo go to GitHub project repo and click in **New pull request**

Compare changes between **base: dev** and **compare: getById** branch. Then click in **Create pull request** and confirm.
![Pull Request](https://help.github.com/assets/images/help/pull_requests/pullrequest-send.png)

### Start a new branch or change to another
To change or create a new brach we need to not have pending changes in our local repo. Use `git status` to see it.

If we want to **change** to an existing branch simply do `git checkot {branch to change}` without the keys.

Else if we want to **create** a new branch first we need to go to dev branch and get the latest version:
`git checkout dev` then `git fetch origin dev` and `git pull origin dev`

Finally, create the new branch:
`git checkout -b newBranch`



### [Glossary]
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



## DoIT - Structure and code 


### Layers


#### controllers
This layer contains all files related to handle requests and responses. Each function send data to **model layer**.


#### models
Model layer works with business logic that determine how data can be created, stored and chanded. Each function gets a database schema related from **schema layer**.


#### persistence
The purpose of this layer is to validate and serializate data between **routes layer** and **controllers layer**. 


#### routes
This layer sets routing configuration for each endpoint and works in conjunction with **persistence layer** and **controllers layer**.


#### schema
Schema layer has all database schema from the project. These schemas are retrieved to **model layer**.


#### test
Required layer to test all relevant project code to get the most possible **coverage**.


## DoIT - Linting 


ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code.

Rules are configurable, and customized rules can be defined and loeaded.

I installed the necessary dependencies to run some rules that I added. Below a brief description of all of them.

#### node/exports-style ([link](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md))

Force to use module.exports instead exports. It is a plugin rule added with eslint-plugin-node package.

#### array-bracket-spacing ([link](https://eslint.org/docs/rules/array-bracket-spacing))

Remove space of brackets

#### block-scoped-var ([link](https://eslint.org/docs/rules/block-scoped-var))

generates warnings when variables are used outside of the block in which they were defined

#### computed-property-spacing ([link](https://eslint.org/docs/rules/computed-property-spacing))

This rule enforces consistent spacing inside computed property brackets

#### eol-last ([link](https://eslint.org/docs/rules/eol-last))

This rule enforces at least one newline (or absence thereof) at the end of non-empty files.

#### eqeqeq ([link](https://eslint.org/docs/rules/eqeqeq))

It is considered good practice to use the type-safe equality operators === and !== instead of their regular counterparts == and !=

With “smart” option, the rule enforces the use of === and !== except for these cases:

-   Comparing two literal values
-   Evaluating the value of typeof
-   Comparing against null

#### func-style ([link](https://eslint.org/docs/rules/func-style))

This rule enforces a particular type of function style throughout a JavaScript file with function expressions

#### keyword-spacing ([link](https://eslint.org/docs/rules/keyword-spacing))

This rule enforces consistent spacing around keywords and keyword-like tokens

#### max-depth ([link](https://eslint.org/docs/rules/max-depth))

This rule enforces a maximum depth that blocks can be nested to reduce code complexity

#### max-len ([link](https://eslint.org/docs/rules/max-len))

This rule enforces a maximum line length to increase code readability and maintainability

#### max-statements ([link](https://eslint.org/docs/rules/max-statements))

This rule enforces a maximum number of statements allowed in function blocks

#### new-cap ([link](https://eslint.org/docs/rules/new-cap))

This rule requires constructor names to begin with a capital letter.

#### no-extend-native ([link](https://eslint.org/docs/rules/no-extend-native))

Disallows directly modifying the prototype of builtin objects.

#### no-mixed-spaces-and-tabs ([link](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs))

Most code conventions require either tabs or spaces be used for indentation. As such, it's usually an error if a single line of code is indented with both tabs and spaces

#### no-trailing-spaces ([link](https://eslint.org/docs/rules/no-trailing-spaces))

This rule disallows trailing whitespace (spaces, tabs, and other Unicode whitespace characters) at the end of lines.

#### no-unused-vars ([link](https://eslint.org/docs/rules/no-unused-vars))

This rule is aimed at eliminating unused variables, functions, and function parameters.

#### no-var ([link](https://eslint.org/docs/rules/no-var))

This rule is aimed at discouraging the use of var and encouraging the use of const or let instead

#### quotes ([link](https://eslint.org/docs/rules/quotes))

This rule enforces the consistent use of single quotes

#### semi ([link](https://eslint.org/docs/rules/semi))

This rule enforces consistent use of semicolons
