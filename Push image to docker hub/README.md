# How to Push Docker Images to Docker Hub 🐳

**Follow these steps to push your Docker images to Docker Hub:**

---

### 1. Prerequisites
- *Install Docker*: Ensure Docker is installed and running on your system.
- *Docker Hub Account*: Create an account on [Docker Hub](https://app.docker.com/signup?_gl=1*p202hw*_ga*ODYyMDc4MjA4LjE3MzQ5NzE1NzQ.*_ga_XJWPQMJYHQ*MTczNDk3MTU3My4xLjEuMTczNDk3MTY5NC41OC4wLjA.) if you don’t already have one.

---

### 2. Log in to Docker Hub
Open your terminal and run:

 ```bash
  docker login
 ```
 
- Enter your Docker Hub *username* and *password* correctly when prompted.

### 3. List Your Docker Images
Choose which image you want to push to Docker Hub by listing the available images by the command docker images.

<br>

### 4. Let’s take an example where we want to push an image named helpops to Docker Hub.

<br>

### 5. After successfully logging into Docker Hub, assign a tag to the Docker image using the following command:

 ```bash
  docker tag helpops azfaralam440/helpops:01
 ```

- azfaralam440 is the *Docker Hub username*.
- helpops is the *image name*.
- 01 is the *tag* (you can choose any tag like v1.0, latest, etc.).

> Replace azfaralam440 with your Docker Hub username and specify your own image name and tag.

<br>

### 6. Now, push your tagged image to Docker Hub using the following command:

 ```bash
  docker push azfaralam440/helpops:01
 ```
 

### 7. After the push is complete:

  a) Log in to [Docker Hub](https://login.docker.com/u/login/identifier?state=hKFo2SBuSll1U3VENDRoVFhZZURLSmozY1BzdHFPV3NraVhHa6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIFpaeWJMT2RQYl9BMTRpQTR3UU5iS0dybmE1RzVvSEZHo2NpZNkgbHZlOUdHbDhKdFNVcm5lUTFFVnVDMGxiakhkaTluYjk).
  b) Navigate to your Repositories.
  c) Verify that your image appears there.

  <br>


- 🎉**Congratulations! You have successfully pushed your Docker image to Docker Hub.**
