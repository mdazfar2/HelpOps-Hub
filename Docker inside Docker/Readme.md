# Docker Inside Docker (DinD) Guide 🚀

## Overview

This guide explains how to set up Docker inside Docker (DinD). This approach is useful for CI/CD pipelines, enabling Docker commands to be executed within a Docker container.

## Prerequisites 📋

- Docker installed on the host machine
- Basic knowledge of Docker commands
- Docker Compose (optional, for easier orchestration)

## Step-by-Step Guide 🛠️

### Step 1: Install Docker 🐳

If Docker is not already installed on your host machine, follow these steps:

1. **Update the package database:**

   ```sh
   sudo apt-get update

2. **Install prerequisites:**
   ```sh
   sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

3. **Add Docker’s official GPG key:**
   ```sh
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -


4. **Add Docker’s repository:**
   ```sh
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"


5. **Install Docker CE:**
   ```sh
   sudo apt-get update
   sudo apt-get install docker-ce


6. **Verify Docker installation:**
   ```sh
   docker --version


### Step 2: Create a Dockerfile for DinD 📄
**Create a Dockerfile that uses the official Docker-in-Docker image:**
```dockerfile
# Dockerfile
FROM docker:20.10.7-dind

# Optional: Install any additional packages
RUN apk add --no-cache git

# Optional: Create a working directory
WORKDIR /app

# Optional: Copy application files
COPY . /app

# Entry point for the Docker container
CMD ["sh"]
```

### Step 3: Build the Docker Image 🏗️
**Build the Docker image from the Dockerfile:**
```sh
docker build -t my-dind-image .
```

### Step 4: Run the DinD Container ▶️
**Run a container using the DinD image with necessary Docker daemon options:**
```sh
docker run --privileged --name my-dind-container -d docker:20.10.7-dind
```
**--privileged grants the container extended privileges.**
**--name assigns a name to the container.**
**-d runs the container in detached mode.**


### Step 5: Interact with Docker Inside the Container 🐙
1. **Access the running DinD container:**
   ```sh
   docker exec -it my-dind-container sh

2. **Verify Docker daemon is running inside the container:**
   ```sh
   docker info

3. **Run Docker commands inside the container:**
   ```sh
   docker run hello-world

### Step 6: Clean Up 🧹
**To stop and remove the DinD container:**
```sh
docker stop my-dind-container
docker rm my-dind-container
```
**To remove the Docker image:**
```sh
docker rmi my-dind-image
```
### Conclusion 🎉
You have successfully set up Docker inside Docker (DinD). This configuration is ideal for CI/CD pipelines and allows you to run Docker commands within a Docker container.


