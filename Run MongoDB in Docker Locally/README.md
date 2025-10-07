# How to Run MongoDB in Docker Locally

Running MongoDB inside a Docker container is an efficient way to set up a development database environment without installing MongoDB directly on your system. Follow this guide to get MongoDB up and running locally using Docker.

---

## 🧰 Prerequisites

Before you begin, ensure you have the following installed:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Windows/Mac)
* [Docker Engine](https://docs.docker.com/engine/install/) (for Linux)
* Basic knowledge of terminal/command prompt

---

## ⚙️ Step 1: Pull the MongoDB Docker Image

Open your terminal and run:

```bash
docker pull mongo
```

This command downloads the official MongoDB image from Docker Hub.

---

## 🏃 Step 2: Run MongoDB Container

Start a MongoDB container with the following command:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo
```

### Explanation:

* `-d`: Runs the container in detached mode (in the background)
* `--name mongodb`: Assigns the container a name
* `-p 27017:27017`: Maps MongoDB’s default port to your local system
* `-e MONGO_INITDB_ROOT_USERNAME`: Sets the root username
* `-e MONGO_INITDB_ROOT_PASSWORD`: Sets the root password

Once the command runs successfully, MongoDB will start inside the container.

---

## 🔍 Step 3: Verify the Container is Running

Run this command to check:

```bash
docker ps
```

You should see an entry similar to:

```
CONTAINER ID   IMAGE   COMMAND                  STATUS         PORTS
abcd1234efgh   mongo   "docker-entrypoint..."   Up 5 minutes   0.0.0.0:27017->27017/tcp
```

---

## 🧩 Step 4: Connect to MongoDB

You can connect to MongoDB using:

### Option 1: Mongo Shell

```bash
docker exec -it mongodb mongosh -u admin -p admin123
```

### Option 2: MongoDB Compass (GUI)

* Open MongoDB Compass.
* Enter the connection string:

  ```
  mongodb://admin:admin123@localhost:27017
  ```
* Click **Connect**.

---

## 📦 Step 5: Persist Data with a Volume

By default, data inside containers is **temporary**. To persist MongoDB data, mount a local volume:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -v ~/mongo-data:/data/db \
  mongo
```

Now your MongoDB data will be stored in the local folder `~/mongo-data` even if the container stops or is removed.

---

## 🧹 Step 6: Stop or Remove the Container

To stop MongoDB:

```bash
docker stop mongodb
```

To remove MongoDB:

```bash
docker rm mongodb
```

---

## ✅ Step 7: (Optional) Use Docker Compose

Create a file named `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Then run:

```bash
docker-compose up -d
```

---

## 🚀 You’re Done!

Your MongoDB instance is now running locally inside Docker. You can connect from your backend apps using this connection string:

```
mongodb://admin:admin123@localhost:27017
```

---

### 💡 Pro Tips

* Use Docker volumes to persist data.
* Use environment variables or `.env` files for credentials.
* Stop and start containers easily with `docker stop` and `docker start`.

---

**Author:** *Your Name*
**Date:** $(date +%Y-%m-%d)
