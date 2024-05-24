# Installation Guide for NodeJS and NPM in Ubuntu Image-

- ***Install NVM (Node Version Manager)***

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```

- ***After using above command you have to restart your Terminal***
  ```bash
  sudo reboot
  ```

- ***Download and install Node.js***
  ```bash
  nvm install 21
  ```

- ***Now check Whether Node.js is installed or not***
  ```bash
  node -v
  ```
  > should print `v21.7.3`

- ***Then checking the NPM Version***
  ```bash
  npm -v
  ```
  > should print `10.5.0`
