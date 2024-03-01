# Reducing Git Repo Size
`forem` clones are currently 1.5G due to old vendor/cache gem's committed to the
git repo.  Use the steps below to reduce your clone size by 80% -- meaning
faster _clone_ , deploy , _log_ and less disk usage

**caveat**: This uses a "partial clone" method which fetches a complete working
tree but avoids cloning older objects from the history  . See 
[this guide](https://about.gitlab.com/blog/2019/03/13/partial-clone-for-massive-repositories/)
and the [git docs on partial clones](https://git-scm.com/docs/partial-clone) for a
more complete command and config overview. 

## Preferred Method for New Clones
```
# do a partial clone 
$ git clone --single-branch --branch main --filter=blob:none  git@github.com:forem/forem.git
```
### Test to Confirm the Repo Size
```
# your repo will be about 300MB instead of 1500MB
$ du -sh .
280M  .
```

## Existing Clones (for experts)
You can clean up existing clones, but with this method you will have to rebase
any changes before submitting PRs. Added work will be required.

#### 1. Update the ref config in `.git/config`
update `fetch` and `partialCloneFilter`
```
[remote "upstream"]
        url = git@github.com:forem/forem.git
        fetch = +refs/heads/main:refs/remotes/upstream/main
        promisor = true
        partialclonefilter = blob:none
```
#### 2. Prune Old Objects Out of your Clone
Prerequisite: [git-filter-repo](https://github.com/newren/git-filter-repo) needs to be installed
```
git filter-repo --force --invert-paths --path-glob 'vendor/cache'
```
