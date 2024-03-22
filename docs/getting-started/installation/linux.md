---
sidebar_position: 3
---

# Linux

**Installing Forem on Bare-Metal Linux**

> As the title implies, this spins up a Forem stack for local development with no use of containerization, virtualization, etc., which comes with tradeoffs: standing the stack up will almost invariably be a slower process as various tools build from source, but attaching debuggers and the like to the resulting Forem application may be easier. If using containers through Docker or Podman isn't a deal-breaker for your usecase, [consider those docs instead](containers.md) for faster stand-up and teardown, and to leave less cruft behind when you're done working.

_For maintainer sanity reasons, this opinionated and curated instruction set assumes you're cool with the use of [mise](https://github.com/jdx/mise) to install specific versions of Ruby, NodeJS, Yarn (a JS package manager), PostgreSQL (a database), and Redis (an in-memory cache) that are tricky (when possible at all) to version-lock system-wide. If `mise` is for any reason a non-starter for you, you'll want to use your package management solutions of choice to install the tools found in `.rtx.toml`, `.ruby-version`, and `.nvmrc`, at the appropriate versions, and should be comfortable sorting out the dependencies thereof on your own. The instructions were written for Debian 12 (Bookworm), but should be directly usable on Ubuntu, Mint, and other Debian derivatives, and should be adaptable for other distributions._

## Installing Package Managers

To start, we need to install a tools manager that supports more precise version pinning than many/most system-level dependency managers do on Linux; for this, we recommend [mise](https://github.com/jdx/mise). Follow whatever their current instructions are for installation, and then come back here. Notably, make sure you've configured the appropriate shell integration (you probably should have seen something about `eval` and a `bashrc` or `zshrc`!).

## Pulling Forem's Code

Using `apt` (or [alternative means, if desired](https://docs.github.com/en/get-started/quickstart/set-up-git)), we need to install `git` a version control system we use in the development of Forem (with GitHub as our canonical host for the Git repository), and then this section is reasonably straightforward.
 
1. `sudo apt update && sudo apt install -y git`
2. Fork Forem's repository [using this GitHub link](https://github.com/forem/forem/fork). Forking is optional to read our code, but will be necessary to submit changes to us, so this is a helpful bit of upfront house-keeping.
3. Clone your forked repository:

  - With HTTPS: `git clone https://github.com/<your-username>/forem.git`
  - With SSH: `git clone git@github.com:<your-username>/forem.git`
  - Or, use a graphical Git client of your choosing, the selection of which is outside the scope of this document.

4. Then, change directories into the clone: `cd forem`

## Install System-Level Dependencies

There's a handful of system-level dependencies we can't reliably manage with `mise`, usually because they're out of that tool's scope. We'll install these with `apt` again, unless you choose to install them in some other way at your own risk:

- [ImageMagick](https://imagemagick.org/), used to manipulate images on upload. This one is particularly hairy to DIY an install of, so use your system package manager unless you know exactly why you're choosing not to.
- A C/C++ compiler, `make`, and so forth. These base development tool bundles go by many names in various distributions: `build-essential` on Debian-alikes, `base-devel` on Arch-alikes, `alpine-sdk`, etc.
- `pkg-config`, which is used to help find system-wide libraries
- `libz` and `libssl` (unless you know your distribution uses something else, this means OpenSSL) development headers
- `curl`, an HTTP (among others) client
- Various transitive dependencies of [PostgreSQL and its compilation](https://github.com/smashedtoatoms/asdf-postgres#dependencies) not already listed above: 
    * `libreadline-dev`
    * `libcurl4-openssl-dev`
    * `uuid-dev`
    * `icu-devtools`

```sh
sudo apt update
sudo apt install -y imagemagick curl build-essential pkg-config libssl-dev libz-dev libreadline-dev libcurl4-openssl-dev uuid-dev icu-devtools
```

## Installing Version-Locked Tool Dependencies

> This is the part where, if you've opted out of `mise`, you'll need to round up tools on your own. For Ruby, consider setting up `rbenv` using their [installation guide](https://github.com/rbenv/rbenv#installation) and then installing our current Ruby version target with `rbenv install $(cat .ruby-version)`. For NodeJS, consider `nvm` and install our Node version target with `nvm install`. You're on your own for installing [Yarn v1](https://yarnpkg.com/en/docs/install), [PostgreSQL v13](https://www.postgresql.org/) (perhaps via [Postgres.app](https://postgresapp.com/), also see our [auxiliary documentation](postgresql.md)), and [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/).

Use `mise install` - this will pull the exact versions we recommend for the tools listed in the block above, which helps to prevent "version drift" - where someone writes code targeting Version A of some tool, but it breaks when run against Version B of that same tool.

If prompted, respond `y` to the prompts about installing plugins to handle Yarn, PostgreSQL, and Redis.

**This step will probably take several minutes**: it's building most of these dependencies from source code. Errors at this point are unlikely, but if they pop up, should be expected to be quite varied: searching for error messages will often lead to helpful solutions, as few to none of these errors are likely to have never been seen (and triaged) before.

## Last Bits Of Setup

1. Start the caching server with `redis-server --daemonize yes` (do this every time you work on Forem!)

2. Start and configure the database (which requires some tinkering to avoid future errors; copy pasting is fine here!)

  - `pg_ctl start` - do this every time you work on Forem!
  - `createuser -U postgres -s $(whoami)`, which creates a PostgreSQL user by your system username. This only needs done once.
  - Now we need to change the default encoding of the database. These steps are copied nearly verbatim from [the Arch Linux wiki](https://wiki.archlinux.org/title/PostgreSQL#Change_default_encoding_of_new_databases_to_UTF-8). Run them one-by-one.

    * `psql -d postgres -c "UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';"`
    * `psql -d postgres -c "DROP  DATABASE template1;"`
    * `psql -d postgres -c "CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';"`
    * `psql -d postgres -c "UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';"`

3. Set up your environment variables/secrets

   - Take a look at `.env_sample` to see all the `ENV` variables we use and the
     fake default provided for any missing keys.
     If you don't need to override any environment variables, continue with
     the next step as our setup script will automatically create a default
     `.env` file.
   - If you use a remote computer as dev env, you need to set `APP_DOMAIN`
     variable to the remote computer's domain name.
   - The [backend guide](/backend/authentication) will show you how to get free API keys for
     additional services that may be required to run certain parts of the app.
   - For any key that you wish to enter/replace, follow the steps below.

     1. Create `.env` by copying from the provided template (i.e. with bash:
        `cp .env_sample .env`). This is a personal file that is ignored in git.
     2. Obtain the development variable and apply the key you wish to
        enter/replace. i.e.:

     ```shell
      export CLOUDINARY_API_KEY="SOME_REAL_SECURE_KEY_HERE"
      export CLOUDINARY_API_SECRET="ANOTHER_REAL_SECURE_KEY_HERE"
      export CLOUDINARY_CLOUD_NAME="A_CLOUDINARY_NAME"
     ```

   - You do not need "real" keys for basic development. Some features require
     certain keys, so you may be able to add them as you go. The test environment
	 is isolated from changes to the .env file, if you want to set variables in both
	 test and development, use a file named .env.local, or modify .env.test.local
	 and .env.development.local.

4. Do final application setup (including the installation of requisite Ruby gems and NodeJS modules) with `./bin/setup`.

## Start Up Your Forem!

```sh
./bin/startup
```

Presuming no errors here, your Forem should be accessible at `http://localhost:3000`.

To run unit tests, first, prepare the database:

```sh
./bin/rails db:test:prepare RAILS_ENV=test
```

Then, try running any test, for example:

```sh
./bin/rspec spec/lib/acts_as_taggable_on
```

To shut down your Forem stack when you're done tinkering, shut services down in the inverse order of how we started them:

- Press `Ctrl-C` to stop the Forem server process that's currently in the foreground
- `pg_ctl stop` will shut down the database
- `redis-cli SHUTDOWN` will stop the caching server
