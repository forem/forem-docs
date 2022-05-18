# Test Flags

When creating tests using Rspec we have the ability to add flags to those tests
that will signal to Rspec to run certain commands before, after, or around the
test example.

Some flags that we use are:

- `js: true`
- `throttle: true`
- `type: <test type>`

### `js: true` Flag

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

`js: true` indicates that we want the JavaScript on the page to be executed when
the page is rendered, and a headless chrome instance will be initialized to do
so (instead of the default
[rack_test](https://github.com/teamcapybara/capybara#racktest) driver).

If you are debugging a `js: true` spec and want to see the browser, you can set
`HEADLESS=false` before running a spec:

```shell
HEADLESS=false bundle exec rspec spec/app/system
```
