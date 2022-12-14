---
sidebar_position: 4
---

# Code coverage

## Code Climate

We are using [Code Climate](https://codeclimate.com/github/forem/forem) to track
code quality and coverage.

Code Climate offers metrics regarding code quality for each individual PR,
however, it does not calculate these metrics for the entirety of the project. If
you'd like update the current linting rule, feel free to submit a PR to change
it.

Before merging a PR to Forem, we expected Code Climate to pass on that PR. If
you find Code Climate raising errors on your PR, please fix those issues. Do
your best to leave code in a better state than you found it!

We don't want to make a habit of pandering to Code Climate and its metrics
blindly, so if you're in doubt regarding a suggestion on your PR please start a
conversation in the PR comments.

Generally speaking, if you're looking for opportunities to contribute to the
project, but you don't have an issue you're interested in solving, improving the
Code Climate metrics is a good place to start. We're happy to see PRs that
refactor existing code to reduce duplication and increase readability, given
that those refactors are well tested.

## Rails

Rspec will generate code coverage at the end of the tests.

To get the code coverage of the entire Rails codebase, you must run the full
Ruby test suite. You can run the full test suite with the `rspec` command:

```shell
bundle exec rspec
```

or

```shell
bin/rspec
```

To get the code coverage of a single file, you can run:

```shell
bundle exec rspec spec/models/user_spec.rb
```

or

```shell
bin/rspec spec/models/user_spec.rb
```

To get the code coverage of a particular spec in a single file, append the
line-number for that spec:

```shell
bundle exec rspec spec/models/user_spec.rb:24
```

or

```shell
bin/rspec spec/models/user_spec.rb:24
```

Once your tests have completed, the `coverage/index.html` will be regenerated
with some stats concerning the overall health of our test suite including a code
coverage metric.

A few things to note:

- "Coverage" indicates whether or not the test suite runs through the code in
  question. It does not equate to actually testing for functionality, and
  shouldn’t be thought of that way.
- Running Rspec in general will overwrite the existing `coverage/index.html` so,
  if you want to reference the results of a particular run, save a copy of the
  file before re-running the test suite.

To turn off coverage report generation please set environment variable
`COVERAGE` value to `false`.

## Preact

Preact tests will generate code coverage at the end of the tests.

To get the code coverage of the Preact codebase, you must run the full JS test
suite. You can run the full test suite with the npm task `test`:

```shell
npm run test
```

or

```shell
yarn test
```

Once the tests have completed, the test coverage metric will be visible in the
terminal window. Please note that jest will fail if test coverage thresholds are
not met.


