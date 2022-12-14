---
sidebar_position: 1
---

# Philosophy

## Tests

When adding any new features to the application, we always write tests alongside our code. This may be in the form of testing:

- the user interface interactions from the end users perspective through Cypress [end to end tests](types/e2e-tests.md).
- the interaction from a request perspective through [integration tests](types/integration-tests.md).
- a single function/method in isolation with its possible inputs and outputs through [unit and functional tests](types/unit-functional-tests.md).
- JavaScript code whether it be logic in a pack file or a Preact component through [frontend tests](types/frontend-tests.md).

We also encourage [manual](other-focus-areas/manual-tests.md), [accesibility](other-focus-areas/accessibility-tests.md) and [regression](other-focus-areas/regression-tests.md) when the need arises.

We track our code coverage in each new PR using code-cov.

## QA

Whilst we do not have a dedicated QA environment, if it is essential that your branch gets tested on production before we can go live, we encourage you to either put it behind a feature flag or we can manually deploy the branch to a Forem for testing.
