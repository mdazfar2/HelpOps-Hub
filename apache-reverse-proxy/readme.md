# Apache Reverse Proxy for Docker Container

This repository provides instructions for setting up an Apache reverse proxy on an Ubuntu server to proxy requests to a Docker container running on port 8000.

## Prerequisites

- Ubuntu server
- Docker installed on the server
- Basic knowledge of Apache and Docker

## Setup Instructions

### Step 1: Run your application which ever port your application is running

In my case I am using docker as my application running on container on port 8000

   ```sh
   docker run -d -p 8000:8000 mayaworld13/django-todo-app
   ```
### Step 2: update package and install apache
  ```sh
  sudo apt update
  sudo apt install apache2 -y
  ```
### Step 3: Enable Apache Modules
Enable necessary modules for reverse proxy:

```sh
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo systemctl restart apache2
```
