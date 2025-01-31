# WSL Developer Notes

This pages has instructions and tips for developing Pilcrow using
the Windows Subsystem for Linux (WSL). This document only covers
WSL aspects of the dev setup. Refer to the project README.md file
for the complete dev setup steps.

## Prerequisites
- WSL2 is installed and configured along with your preferred Linux distribution

## Windows Setup
- Install Docker Desktop for Windows
  - Make sure WSL integration is turned on (it should be on by default).
  - Restart windows (you may experience Docker crashing on startup until a restart)

## WSL Setup
- Use the script from docker.com to install Docker Community Edition
  (`docker-ce`) in WSL.  [https://get.docker.com](https://get.docker.com)
  - Ignore the warning about WSL. You need both the Windows Docker Desktop
    and the Linux Community Edition package.
  - `docker-ce` is a required as a dependancy for the lando package
- Install the `lando` package for your distribution.
  - [https://docs.lando.dev/basics/installation.html](https://docs.lando.dev/basics/installation.html)
- Proceed with the Pilcrow setup (see the project README.md file)
- Make sure that you put the Pilcrow repo inside the WSL filesystem!
  - Accessing the Windows filesystem from WSL will slow things down considerably.


## Tips
- VS Code will automatically detect Docker is running and will suggest some extensions
- If you're using VS Code, install the `Remote Development` extension from Microsoft
  to make it easier to edit files in WSL. This will install the following extensions
  - Remote Containers
  - Remote WSL
  - Remote SSH
- To access Pilcrow with VS Code under WSL, make sure to start VS code from WSL.
  - `cd <PILROW_HOME>; code .`
