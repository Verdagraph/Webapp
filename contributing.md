# Contributing

First, join the [discord server](https://discord.gg/XH4kQcpz9p). If you have an idea for a contribution to make, talk to other contributors first to establish what the contribution should look like.

# Environment Setup

The development environment consists of a docker-compose setup with one container for the frontend, server, and database to run in, and other containers for related services. The current workflow for setting up development environments is standardized to use [Development Containers](https://containers.dev/). This makes reproduction of the environment very easy. The cost is that while the devcontainer tool is an open standard, IDE support on IDEs other than VSCode or Neovim is minimal. If you wish to use different IDE, manual installation instructions will need to be created.

# Devcontainer

[Development Containers](https://containers.dev/) allows the use of Docker containers as full-featured development environments.

## Windows, VSCode

1. Install the [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install). This may require changing Windows or Bios settings for virtualization.
2. Install Docker Engine through [Docker Desktop](https://www.docker.com/products/docker-desktop/). Start Docker Engine.
3. Install [VSCode](https://code.visualstudio.com/) and [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
4. Run the VSCode command `Clone repository into container volume.` and enter the name of the repository: `Verdagraph/Webapp`. Cloning the repository into the container brings optimal performance, but if that doesn't work, clone the repository into a Windows folder and run the command in VSCode `Run folder in container.`

The container should display a terminal with no errors.

### Troubleshooting

- Is Docker Engine running?

## Windows

Instructions for the use of Devcontainers on Linux should be simpler than on Windows, but the instructions have not been created yet. If you follow this path, please update this document.

# Non-devcontainer

Instructions for manual setup of the environment have not yet been created. If you follow this path, please update this document.

Post create steps:
make sure to copy .env.default in ./common to a normal .env file.
