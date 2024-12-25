# How to Push Docker Images to Docker Hub 🐳

**Follow these steps to push your Docker images to Docker Hub:**

---

### 1. 🛠 Prerequisites
- **Install Docker**: Ensure Docker is installed and running on your system.
- **Docker Hub Account**: Create an account on [Docker Hub](https://hub.docker.com/) if you don’t already have one.

---

### 2. 🔑 Log in to Docker Hub
Open your terminal and run:

 ```bash
  docker login
 ```
- Enter your Docker Hub **username** and **password** correctly when prompted.

### 3. Choose which image you want to push to Docker Hub using the command `docker images`.

### 4. Suppose we take an example where there is an image, and we need to push it to Docker Hub named `helpops`.

### 5.  After successfully logging into Docker Hub, we now need to assign a tag to docker image using the command below.

 ```bash
  docker tag helpops azfaralam440/helpops:01
 ```

  - --> Here, "azfaralam440" is my own Docker Hub username, so on your side, you need to use your own Docker Hub username and specify your Docker image name and tag.

### 6. ⬆ Now, the final step is to push your image to Docker Hub.

 ```bash
  docker push azfaralam440/helpops:01
 ```

- **Congratulations, you have successfully pushed your image to Docker Hub.**
