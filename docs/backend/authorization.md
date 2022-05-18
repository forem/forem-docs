---
sidebar_position: 7
---

# Authorization

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

Authorization is handled by the third-party gem
[Pundit](https://github.com/varvet/pundit) through the `authorize` method which
you can find in various controllers, look for statements like:

```ruby
authorize @user
```

All authorization policies can be found in `/app/policies`.
