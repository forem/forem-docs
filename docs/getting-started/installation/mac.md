---
sidebar_position: 1
---

# MacOS

**Installing Forem on macOS**

> This spins up a Forem stack for local development with no use of containerization, virtualization, etc., which comes with tradeoffs: standing up the stack will almost invariably be a slower process as various tools build from source, but attaching debuggers and the like to the resulting Forem application will be easier, not to mention the lack of I/O overhead that comes with, for example, running a full Linux VM to run containers in (which, for example, Docker Desktop does). However, more cruft gets left behind when you're done working: you'll have PostgreSQL databases and so forth to clean up. If you'd rather take the containers side of the tradeoffs, [those docs are here](containers.md).

_For maintainer sanity reasons, this opinionated and curated instruction set assumes you're cool with the use of [Homebrew](https://brew.sh) to install certain system-wide dependencies, and  [rtx](https://github.com/jdx/rtx) to install specific versions of Ruby, NodeJS, Yarn (a JS package manager), PostgreSQL (a database), and Redis (an in-memory cache) that are tricky to version-lock system-wide. If these package managers are for any reason a non-starter for you, you'll want to use your package management solutions of choice to install the tools found in `.rtx.toml`, `.ruby-version`, and `.nvmrc`, at the appropriate versions, and should be comfortable sorting out the dependencies thereof on your own._

_This has been tested on Apple Silicon Macs, but should be expected to work without noteworthy modification on Intel Macs. If you find a setup issue on Intel Macs, [file an issue with us](https://github.com/forem/forem/issues)._

## Installing Package Managers

To start, we need to install (two of the three...) package managers that we'll use later in the guide: [Homebrew](https://brew.sh) and [rtx](https://github.com/jdx/rtx). Follow whatever their current instructions are at those links, and then come back here. Notably for rtx, make sure you've configured the appropriate shell integration (you probably should have seen something about `eval` and a `bashrc` or `zshrc`!).

## Pulling Forem's Code

Using Homebrew (or [alternative means, if desired](https://docs.github.com/en/get-started/quickstart/set-up-git)), we need to install `git` a version control system we use in the development of Forem (with GitHub as our canonical host for the Git repository), and then this section is reasonably straightforward.
 
> Those with the Xcode Command Line Tools already installed, for example those using AWS EC2 Mac instances in the cloud, will alerady have a working Git install at `/usr/bin/git`. That's fine: let's install Homebrew's version anyway, for consistency, unless you really know what you're doing.

1. `brew install git`
2. Fork Forem's repository [using this GitHub link](https://github.com/forem/forem/fork). Forking is optional to read our code, but will be necessary to submit changes to us, so this is a helpful bit of upfront house-keeping.
3. Clone your forked repository:

  - With HTTPS: `git clone https://github.com/<your-username>/forem.git`
  - With SSH: `git clone git@github.com:<your-username>/forem.git`
  - Or, use a graphical Git client of your choosing, the selection of which is outside the scope of this document.

4. Then, change directories into the clone: `cd forem`

## Installing System-Level Dependencies

> This is the part where, if you've opted out of Homebrew, you'll need to round up a few tools on your own. Most notably, [ImageMagick](https://imagemagick.org/script/download.php#macosx) is somewhat non-trivial.

Homebrew makes this step quick: run `brew bundle`, and assuming it finishes successfully, you're done. This step should only fail if Homebrew is not installed correctly, or there is a version conflict between what we depend on for Forem, and whatever you might already have installed on your system (`gpg` is a potential candidate here). In the event of such a collision, you can either uninstall the existing package on your system, or skip the failed package for now and attempt to complete these setup instructions anyway. It might work. If not, open an issue with us and we'll see if we can help.

## Installing Version-Locked Tool Dependencies

> This is the part where, if you've opted out of `rtx`, you'll need to round up tools on your own. For Ruby, consider setting up `rbenv` using their [installation guide](https://github.com/rbenv/rbenv#installation) and then installing our current Ruby version target with `rbenv install $(cat .ruby-version)`. For NodeJS, consider `nvm` and install our Node version target with `nvm install`. You're on your own for installing [Yarn v1](https://yarnpkg.com/en/docs/install), [PostgreSQL v13](https://www.postgresql.org/) (perhaps via [Postgres.app](https://postgresapp.com/), also see our [auxiliary documentation](postgresql.md)), and [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/).

Use `rtx install` - this will pull the exact versions we recommend for the tools listed in the block above, which helps to prevent "version drift" - where someone writes code targeting Version A of some tool, but it breaks when run against Version B of that same tool.

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

### Possible error messages

This section serves as a collection of various things that have gone wrong in the past while setting up Forem on Macs: not all of them are necessarily common anymore, and in particular many of them impact `rbenv`-based setups more than `rtx`-based setups (so far), but they're preserved here just in case.

---

**Error:** `rbenv install hangs at ruby-build: using readline from homebrew`

**_Solution:_**
[Stackoverflow answer](https://stackoverflow.com/questions/63599818/rbenv-install-hangs-at-ruby-build-using-readline-from-homebrew)
`RUBY_CONFIGURE_OPTS=--with-readline-dir="$(brew --prefix readline)" rbenv install 2.0.0`

---

**Error:**
`__NSPlaceholderDate initialize] may have been in progress in another thread when fork() was called`

**_Solution:_** Run the command `export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES`
(or `set -x OBJC_DISABLE_INITIALIZE_FORK_SAFETY YES` in fish shell)

---

**Error:** `User does not have CONNECT privilege.`

**_Solution:_** Complete the steps outlined in the
[PostgreSQL setup guide](postgresql.md).

---

**Error:**
`rbenv: version '<version number>' is not installed (set by /Path/To/Local/Repository/.ruby-version)`

**_Solution:_** Run the command `rbenv install <version number>`

---

**Error:** `ruby-build: definition not found: <version number>` when `rbenv` was
installed via `brew`.

```shell
ruby-build: definition not found: <version number>

See all available versions with `rbenv install --list`.
If the version you need is missing, try upgrading ruby-build:
```

**_Solution:_** Run the following to update `ruby-build`,
`brew update && brew upgrade ruby-build`. After that, rerun
`rbenv install <version number>` and that version will get installed.

---

**Error:**

```shell
== Preparing database ==
    Sorry, you can't use byebug without Readline. To solve this, you need to
    rebuild Ruby with Readline support. If using Ubuntu, try `sudo apt-get
    install libreadline-dev` and then reinstall your Ruby.
rails aborted!
LoadError: dlopen(/Users/<username>/.rbenv/versions/2.6.5/lib/ruby/2.6.0/x86_64-darwin18/readline.bundle, 9): Library not loaded: /usr/local/opt/readline/lib/libreadline.<some version number>.dylib
```

**_Solution:_** Run
`ln -s /usr/local/opt/readline/lib/libreadline.dylib /usr/local/opt/readline/lib/libreadline.<some version number>.dylib`
from the command line then run `bin/setup` again. You may have a different
version of libreadline, so replace `<some version number>` with the version that
errored.

---

**Error:**

```shell
PG::Error: ERROR:  invalid value for parameter "TimeZone": "UTC"
: SET time zone 'UTC'
```

**_Solution:_** Restart your Postgres.app, or, if you installed PostgreSQL with
Homebrew, restart with:

```shell
brew services restart postgresql
```

If that doesn't work, reboot your Mac.

---

**Error:**

```shell
ERROR:  Error installing pg:
  ERROR: Failed to build gem native extension.
  [...]
Can't find the 'libpq-fe.h header
*** extconf.rb failed ***
```

**_Solution:_** You may encounter this when installing PostgreSQL with the
Postgres.app. Try restarting the app and reinitializing the database. If that
doesn't work, install PostgreSQL with Homebrew instead:
`brew install postgresql`

---

**Error:**

```shell
node-pre-gyp ERR! stack Error: Failed to execute '/Users/yourusername/.nvm/versions/node/v14.17.6/bin/node /Users/yourusername/.nvm/versions/node/v14.17.6/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js configure --fallback-to-build --module=/Users/yourusername/Code/forem/node_modules/canvas/build/Release/canvas.node --module_name=canvas --module_path=/Users/yourusername/Code/forem/node_modules/canvas/build/Release --napi_version=8 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v83 --python=/opt/homebrew/opt/python@3.9/bin/python3' (1)
```

**_Solution:_**

On an M1 Mac, this is due to there [not being a prebuilt release for the `node-canvas` JavaScript package](https://github.com/Automattic/node-canvas/releases). You can get it to build itself from source if you install the following packages via the `arm64` version of Homebrew:

```shell
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

---

> If you encountered any errors that you subsequently resolved, **please
> consider updating this section** with your errors and their solutions.
