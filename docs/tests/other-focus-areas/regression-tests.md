---
sidebar_position: 3
---

# Regression Testing

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

Regression testing is a technique for detecting breaking changes over time in a
codebase.

Proper Regression testing is one of the most powerful tools in a programmer's
arsenal for avoiding the bugs that crop up as a project grows in size.

Generally speaking, Regression testing is accomplished by a combination of
[Acceptance tests](feature-tests) and [Integration tests](integration-tests)
performed on areas where bugs have been found in the past. As it happens,
software bugs tend to exist in groups; writing tests around buggy code will
almost always uncover new bugs as code evolves.

The practice of Regression testing usually takes place after code has been
written, and is used to detect if recent changes have introduced new bugs by
breaking previously functional software.

There is no perfect prescribed method for Regression testing, and it has evolved
with the introduction of [Continuous Integration][ci] practices like the ones
that Forem uses. However, CI doesn't replace the need for Regression testing.
Regression tests should still be added to the codebase when bugs are discovered.

If you submit a bug patch to the Forem application, you might be asked to write
a Regression test around your patch to help warn future Forem contributors if
that bug ever makes another appearance. This practice has the added benefit of
helping to ensure your patch fixes the bug.
