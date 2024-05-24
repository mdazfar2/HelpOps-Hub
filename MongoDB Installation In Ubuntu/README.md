# Installation Guide for MongoDB-

- ***From a terminal, install gnupg and curl if they are not already available:***
  ```bash
  sudo apt-get install gnupg curl
  ```

- ***To import the MongoDB public GPG key, run the following command:***
  ```bash
  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
  ```

- ***Create the `/etc/apt/sources.list.d/mongodb-org-7.0.list` file for Ubuntu 22.04 (Jammy):***
  ```bash
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
  ```

- ***Issue the following command to reload the local package database:***
  ```bash
  sudo apt-get update
  ```

- ***To install the latest stable version, issue the following***
  ```bash
  sudo apt-get install -y mongodb-org
  ```

  - ***Start MongoDB***
    ```bash
    sudo systemctl start mongod
    ```

  - ***Begin using MongoDB.***
    ```bash
    mongosh
    ```
