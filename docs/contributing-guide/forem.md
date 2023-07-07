---
sidebar_position: 2
---

# Contributing to Forem

We expect contributors to abide by our underlying
[Code of Conduct](https://dev.to/code-of-conduct). All discussions about this
project must be respectful and harassment-free.

Remember that communication is the lifeblood of any Open Source project. We are
all working on this together, and we are all benefiting from this software.

It's very easy to misunderstand one another in asynchronous, text-based
conversations. When in doubt, assume everyone has the best intentions.

If you feel anyone has violated our Code of Conduct, you should anonymously
contact the team with our [abuse report form](https://dev.to/report-abuse).

### Where to contribute

All [issues](https://github.com/forem/forem/issues) labeled
[ready for dev](https://github.com/forem/forem/issues?q=is%3Aissue+is%3Aopen+label%3A%22ready+for+dev%22)
and
[bug](https://github.com/forem/forem/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
are up for grabs. Please note that issues with the
[Forem team](https://github.com/forem/forem/labels/Forem%20team) label are
internal tasks that will be completed by a Forem
[core team member](https://github.com/forem/forem/#core-team).

- [good first issue](https://github.com/forem/forem/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+)
  issues are meant for newer developers.

PRs without an associated issue may still be merged, but the core team will
focus on changes that solve existing issues. We strongly encourage creating an
issue before working on a PR!

When in doubt, ask a
[core team member](https://github.com/forem/forem/#core-team) by mentioning us
on the issue.

**Documentation** is almost always a great place to start contributing to a new
project. Forem is an Open Source, community-driven project. Therefore, providing
and maintaining quality documentation is one of our most important jobs. You can
find more information in our
[docs guide](https://developers.forem.com/contributing-guide/docs)!

**Refactoring**, which involves improving the code without modifying behavior,
is a great place to help out! Generally speaking, you can rely on existing tests
to ensure that your refactor doesn't introduce any unexpected behavior. If an
area isn't well tested, you might be asked to include a regression test with
your refactoring PR. Refactors can touch many files, so we encourage breaking
big changes into small PRs.

**Fixing bugs** is a super fast way to improve the experience for our users!
When you're fixing bugs, we appreciate communication in a GitHub issue. If an
issue exists, please claim that issue and link it in your PR, otherwise creating
an issue is the best first step! Be sure to surround bug fixes with ample tests;
bugs are magnets for other bugs. Write tests around bugs!

**Features** tend to be subjective and might spur some debate. If you'd like to
propose a new feature, please visit [Discussions](https://github.com/forem/forem/discussions/categories/feature-requests) to start a
discussion around a new feature (or chime in on a pre-existing discussion!).

### How to contribute

1. Fork the project and clone
   it to your local machine. Follow the installation guide,
   [for example, the Mac guide](https://developers.forem.com/getting-started/installation/mac)!
2. Create a branch with your GitHub username and the ID of the
   [issue](https://github.com/forem/forem/issues), for example:
   `git checkout -b USERNAME/some-new-feature-1234`
3. Code and commit your changes. Bonus points if you write a
   [good commit message](https://chris.beams.io/posts/git-commit/):
   `git commit -m 'Add some feature'`
4. Push to the branch: `git push -u origin USERNAME/some-new-feature-1234`
5. [Create a pull request](https://docs.forem.com/getting-started/pull-request/)
   for your branch. 🎉

## Contribution guidelines

### Create an issue

Nobody's perfect. Something doesn't work? Something could be better? Check to
see if the issue already exists, and if it does, leave a comment to get our
attention! If the issue doesn't already exist, feel free to create a new one. A
core team member will triage incoming issues.

_Please note: core team members may update the title of an issue to reflect the
discussion._

### Issue claimers’ responsibility
Once you’ve claimed an issue, you have a responsibility to work on that ticket in a reasonably timely fashion. If you don’t have time to work on it, please unclaim it so someone else may work on it.

If there’s no sign of progress on a particular claimed issue for a week or two, we may ask you to relinquish the issue claim to open it up to other contributors.

If you’ve claimed an issue and it’s taking a long time (weeks) to code, keep everybody updated by posting comments on the issue. If you don’t provide regular updates, and you don’t respond to a request for a progress report, we may open it back up to other contributors.

Any pull requests older than 90 days will be closed. Exceptions can be made for pull requests that have active review comments, or that are awaiting other dependent pull requests. Closed pull requests are easy to recreate, and little work is lost by closing a pull request that subsequently needs to be reopened. We want to limit the total number of pull requests in flight to:

- Maintain a clean project
- Remove old pull requests that would be difficult to rebase as the underlying code has changed over time
- Encourage code velocity

As always, more communication is better than less communication! We are all humans trying to work together to improve the community. Always be kind and appreciate the need for tradeoffs. ❤️

### Please include tests

Some areas of the project could use updated tests, and new features should
always include test coverage. Feel free to read our testing section for guides, such as the [front end tests page](https://developers.forem.com/tests/frontend-tests).

### Code quality

We use [Code Cov](https://docs.codecov.com/docs) to  incentivize us to write tests and increase coverage.

We deliver the coverage metrics directly into the PR to promote more code coverage, especially in pull requests where new features and bug fixes commonly occur.

 We encourage you to always increase the code coverage with any new feature or bug fix.

### Consider accessibility in UI changes

If the change you're proposing touches a user interface, include accessibility
in your approach. This includes things like color contrast, keyboard
accessibility, screen reader labels, and other common requirements. For more
information, check out the
[Forem Accessibility docs page](https://docs.forem.com/frontend/accessibility).

### Please use inclusive language

Inclusion and respect are core tenets of our
[Code of Conduct](https://dev.to/code-of-conduct). We expect thoughtful language
all the way down to the code. Some technical metaphors are alienating or
triggering. We ask that contributors go the extra mile to submit code which is
inclusive in nature.

If you unintentionally use language deemed harmful, there is no shame. We will
work together to find a better alternative. Being thoughtful about language also
encourages more thoughtful code!

### Create a pull request

- Try to keep the pull requests small. A pull request should try its very best
  to address only a single concern.
- For work in progress pull requests, please use the
  [Draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests/)
  feature.
- Make sure all tests pass and add additional tests for the code you submit.
  [More info here](https://docs.forem.com/tests/).
- Document your reasoning behind the changes. Explain why you wrote the code in
  the way you did. The code should explain what it does.
- If there's an existing issue, reference to it by adding something like
  `References/Closes/Fixes/Resolves #123`, where 123 is the issue number.
  [More info here](https://github.com/blog/1506-closing-issues-via-pull-requests).
- Please fill out the PR Template when making a PR.
- All commits in a pull request will be squashed when merged.

_Please note: a core team member may close your PR if it has gone stale or if we
don't plan to merge the code._

### Pull request reviews

All community pull requests are reviewed by our core team.

- All contributors must sign the CLA.
  - You will be asked from [CLAassistant](https://github.com/CLAassistant). You
    can confirm the signing status and signed content at
    https://cla-assistant.io/forem/forem.
- All required checks are expected to pass on each PR.
  - In the case of flaky or unrelated test failures, a core team member will
    restart CI.
- We require 2 approvals from core team members for each PR.
- Requested Changes must be resolved (with code or discussion) before merging.
- If you make changes to a PR, be sure to re-request a review.
- Style discussions are generally discouraged in PR reviews; make a PR to the
  linter configurations instead.
- Your code will be deployed shortly after it is merged.

### A note on "force pushing"

After you submit your pull request, one of the members of the core team will
review your code.

Please avoid force pushing unless you need to rebase with the main branch.

If feedback is provided, any changes should be contained in new commits. Please
don't force push or worry about squashing your commits.

Force pushing (despite being useful) has some drawbacks. GitHub doesn't always
keep the review history, which results in lost context for the reviewers.

We squash every PR before merging, so there is no need to force push!