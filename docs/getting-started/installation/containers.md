---
sidebar_position: 4
---

# Containers

We offer two options for container-based development.

1. VS Code with Devcontainer
1. Containerized setup with `dip` gem

Due to the way our we setup our `docker-compose.yml`, standard `docker-compose up` command is not support. Please checkout the "Containerized setup with `dip` gem option"

If you encounter any errors with our Container setup, please kindly
[report any issues](https://github.com/forem/forem/issues/new/choose)!

## VS Code with Devcontainer

Forem support VS Code's Devcontainer. Devcontainer is a flexible containized development environment with all the required dependencies set up in under 15 minutes on most modern machine.

### Installation

1. Download and install Docker Desktop from the [Docker's official site](https://www.docker.com/products/docker-desktop/)
1. Download and install [VS Code](https://code.visualstudio.com/) with the [dev container extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
1. Fork and clone our [Forem repository](https://github.com/forem/forem) into your preferred directory. For Window's WSL users, please make sure you place the Forem repository within the linux layer for optimal file loading speed.
1. Open up the repository with VS Code and you should be prompted with `Rebuild and reopen in container`. If you don't see it, you can find it in the command line palette , `Dev Containers: Rebuild and Reopen in Container`, and you're ready to go!

For additional information on Devcontainer, please checkout [the offical documentation](https://code.visualstudio.com/docs/devcontainers/containers)

![image](https://github.com/forem/forem/assets/15793250/157a58a4-41f4-4114-bfce-da1380151d8c)

## Containerized setup with `dip` gem

`dip` gem makes it simple to run docker commands and is the main way we use to interact with `docker-compose.yml`

### Installation

1. Fork and clone our [Forem repository](https://github.com/forem/forem) into your preferred directory.
1. Make sure you have Ruby installed and avaliable. You may use the system provided Ruby or you can install it with a version manager such as `Rbenv` or `mise`.
1. `gem install dip`
1. `dip provision` to build images and download dependencies.
1. `dip rails s` to start the server.

For more commands, run `dip ls`.
