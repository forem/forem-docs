---
sidebar_position: 0
---

# Additional Database options

:::important

We’re currently making rapid changes to the product so our docs may be out of date. If you need help, please email [yo@forem.com](mailto:yo@forem.com).

:::

## Seed Data

By default, the amount of articles and users generated is quite tiny so that
contributors experience a quick installation. If you require more data for your
local installation, you can tune amount of data generated with the environment
variable `SEEDS_MULTIPLIER`.

This variable, which defaults to `1`, allows the developer to increase the size
of their local DB. For example:

```shell
SEEDS_MULTIPLIER=2 rails db:setup
```

Will result in twice the default amount of items being created in the database.

It's currently used only for `articles` and `users`.

It can also be used for `rails db:seed` and `rails db:reset`.

## Default Admin User

Seed data creates a handful of regular users, and a single admin user that can
be used to log into the application with the Email login option:

```
email: admin@forem.local
password: password
```

### Other seed modes

To put your local forem into "starter mode", as it would be for a new creator,
use `MODE=STARTER` i.e...

```shell
MODE=STARTER rails db:setup
```
This mode skips creation of all sample data.
