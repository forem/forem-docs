# Deploying Forem

Anyone with the ability to merge PRs on GitHub can deploy the application.
**Whenever a PR is merged the code is deployed. When deploying complex code, be
sure that other team members are around to help if something goes wrong.**

Generally, it's a good idea to keep the SRE team in the loop on high risk
deploys. However, deployments are our collective responsibility, so it's
important to monitor your deploys. You can see deployment status in the **Actions**
tab on GitHub and in the #deployment-pipeline channel on Slack. Be prepared to
rollback or push a fix for any deployment!

# Deployment and CI/CD Process

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

## Overview

Forem relies on GitHub Actions to test and deploy continuously to Heroku. If a Pull
Request is merged, it will automatically be deployed to production once the CD
workflow completes successfully. The process currently takes about 20 minutes to
complete and will need a few additional minutes before the change goes live.

## GitHub Actions Workflows

The CI/CD process is managed via GitHub Actions and can be explored in the
[.github/workflows/](https://github.com/forem/forem/tree/main/.github/workflows)
directory of the Forem repository. The process consists of two primary workflows:

1. **CI (`ci.yml`)**: Triggered on pull requests and merge groups. It runs the automated test suites.
2. **CD (`cd.yml`)**: Triggered on push to the `main` branch (e.g., when a PR is merged). It handles deployment.

### Continuous Integration (CI)

Our CI workflow runs a comprehensive test suite across multiple parallel nodes:

- We use [KnapsackPro](https://knapsackpro.com/) to divide our RSpec tests evenly between **15 different parallel nodes**. This ensures that the test suite runs as efficiently and quickly as possible.
- The CI process pre-compiles assets, spins up PostgreSQL and Redis service containers, and runs JavaScript and Preact tests alongside SimpleCov for test coverage checks.

If all of the CI checks pass and the PR is approved, it can be merged into `main`.

### Continuous Delivery (CD)

Once code is pushed or merged to the `main` branch, the `cd.yml` workflow is triggered:

- It runs a deployment job on an Ubuntu runner.
- It installs the Heroku CLI and uses the `akhileshns/heroku-deploy` GitHub Action to push the codebase to Heroku (both staging and production environments).

Prior to deploying the code, Heroku will run database migrations and do some
final checks (more information on that below) to make sure everything is working
as expected. If these all succeed, then the deploy completes and our team is
notified.

## Deploying to Heroku

We use Heroku's
[Release Phase](https://devcenter.heroku.com/articles/release-phase) feature.
Upon deploy, the app installs dependencies, bundles assets, and gets the app
ready for launch. However, before it launches and releases the app Heroku runs a
release script on a one-off dyno. If that release script/step succeeds the new
app is released on all of the dynos. If that release script/step fails then the
deploy is halted and we are notified.

The name of the script we use is `release-tasks.sh` and its in our root
directory. During this release step we do a few checks.

1. We first check the DEPLOY_STATUS environment variable. In the event that we
   want to prevent deploys, for example after a rollback, we will set
   DEPLOY_STATUS to "blocked". This will cause the release script to exit with a
   code of 1 which will halt the deploy. This ensures that we don't accidentally
   push out code while we are waiting for a fix or running other tasks.
2. We run any outstanding migrations. This ensures that a migration finishes
   successfully before the code that uses it goes live.
3. We run any data update scripts that need to be run. A data update script is
   one that allows us to update data in the background separate from a
   migration.
4. Following updating all of our datastores we use the Rails runner to output a
   simple string. Executing a Rails runner command ensures that we can boot up
   the entire app successfully before it is deployed. We deploy asynchronously,
   so the website is running the new code a few minutes after deploy. A new
   instance of Heroku Rails console will immediately run a new code.
