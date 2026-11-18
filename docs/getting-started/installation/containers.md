---
sidebar_position: 4
---

# Containers

We offer two options for container-based development.

1. VS Code with Devcontainer
1. Containerized setup with `dip` gem

Both options use the repository's `docker-compose.yml`, but a bare `docker compose up` is not a supported workflow; use one of the two routes below.

**Linux hosts: free ports 5432 and 6379 first.** PostgreSQL and Redis run with host networking, so they need those ports on your machine. If a local PostgreSQL or Redis is already running, stop it (for example `sudo systemctl stop postgresql redis-server`). Otherwise the container's PostgreSQL logs `could not bind IPv4 address "0.0.0.0": Address already in use`, its health check passes against your local server, and `bin/setup` fails with an authentication error.

If you encounter any errors with our Container setup, please kindly
[report any issues](https://github.com/forem/forem/issues/new/choose)!

## VS Code with Devcontainer

Forem supports VS Code's Devcontainer, a containerized development environment with all the required dependencies. The first start (image build plus `bin/setup`) takes about 4 to 15 minutes depending on your machine.

### Installation

1. Download and install Docker Desktop from the [Docker's official site](https://www.docker.com/products/docker-desktop/), or update it: building the images needs Buildx 0.17 or newer (check with `docker buildx version`). An older Docker Desktop stops with `compose build requires buildx 0.17.0 or later`.
1. Download and install [VS Code](https://code.visualstudio.com/) with the [dev container extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
1. Fork and clone our [Forem repository](https://github.com/forem/forem) into your preferred directory. For Windows WSL users, please make sure you place the Forem repository within the linux layer for optimal file loading speed.
1. Open up the repository with VS Code and you should be prompted with `Rebuild and reopen in container`. If you don't see it, you can find it in the command line palette , `Dev Containers: Rebuild and Reopen in Container`, and you're ready to go!

Once the container is up, run `bin/setup` in its terminal, then `bin/startup` to start the server.

**Without VS Code**, you need only Docker (Docker Engine with the Compose plugin on Linux) and Node 20 or newer. From the repository root:

```sh
npx --yes @devcontainers/cli up --workspace-folder .
npx --yes @devcontainers/cli exec --workspace-folder . bin/setup
```

**Running tests:** prepare the test database once, then run specs inside the container:

```sh
npx --yes @devcontainers/cli exec --workspace-folder . bin/rails db:test:prepare
npx --yes @devcontainers/cli exec --workspace-folder . bundle exec rspec spec/models/concept_spec.rb
```

`bin/setup` and Rails commands print a block of `already initialized constant Gem::Platform` warnings from Bundler, plus some Yarn peer-dependency warnings. They are expected and harmless.

For additional information on Devcontainer, please check out [the official documentation](https://code.visualstudio.com/docs/devcontainers/containers)

![image](https://github.com/forem/forem/assets/15793250/157a58a4-41f4-4114-bfce-da1380151d8c)

## Containerized setup with `dip` gem

`dip` gem makes it simple to run docker commands and is the main way we use to interact with `docker-compose.yml`

### Installation

1. Fork and clone our [Forem repository](https://github.com/forem/forem) into your preferred directory.
1. Make sure you have Ruby installed and available. You may use the system provided Ruby or you can install it with a version manager such as `Rbenv` or `mise`.
1. `gem install dip`. With the system Ruby on Linux, install it for your user and put its bin directory on your `PATH`:
   `gem install --user-install dip && export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"`
   (add that `export` line to `~/.bashrc` or `~/.profile` so `dip` is found in new terminals)
1. `dip provision` to build images and download dependencies.
1. `dip rails s` to start the server.
1. `dip rspec spec/models/concept_spec.rb` to run specs (it runs with `RAILS_ENV=test`).
1. `dip compose down` stops everything; add `--volumes` to reset the databases.

For more commands, run `dip ls`.
