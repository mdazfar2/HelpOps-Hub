# 🐳Docker Guide
A comprehensive guide to understanding Docker and its various components.
## 🚢Container
A  _container_  is what we eventually want to run and host in Docker. You can think of it as an isolated machine, or a virtual machine if you prefer.

From a conceptual point of view, a  _container_  runs inside the Docker host isolated from the other containers and even the host OS. It cannot see the other containers, physical storage, or get incoming connections unless you explicitly state that it can. It contains everything it needs to run: OS, packages, runtimes, files, environment variables, standard input, and output.

##  🖼️Images
Any container that runs is created from an _image_. An image describes everything that is needed to create a container; it is a template for containers. You may create as many containers as needed from a single image.

## 📦Registries
Images are stored in a _registry_. In the example above, the _app2_ image is used to create two containers. Each container lives its own life, and they both share a common root: their image from the registry.

## 🚀Run a Container
   
    docker run hello-world
    

1.  Your command asks Docker to create and run a container based on the  _hello-world_  image.
2. Since the _hello-world_ image wasn’t already present on your disk, Docker downloaded it from a default registry, the _Docker Hub_.
3. Docker created a container based on the  _hello-world_  image.
4. The  _hello-world_  image states that, when started, it should output some text to the console, so this is the text you see as the container is running.
5. The container stopped.

## 📝Container Management Commands

You can get help for Docker commands from the command-line itself using the _–help_ switch.

    docker run --help
   You may use the following commands for container management:

-   _docker ps_: lists the containers that are still running. Add the  **-a**  switch in order to see containers that have stopped
    
-   _docker logs_: retrieves the logs of a container, even when it has stopped
    
-   _docker inspect_: gets detailed information about a running or stopped container
    
-   _docker stop_: stops a container that is still running
    
-   _docker rm_: deletes a container


## 🌐Running a Server Container

Whether you want to host a web application, an API, or a database, you want a container that listens for incoming network connections and is potentially server containers.

To run a server with Docker, follow these steps:

 1. **Run a Container in Detached Mode:** Use the `-d` switch with the `docker run` command to run a container in the background. This allows you to disconnect from the container while it continues running.

     ```sh
    docker run -d alpine ping www.docker.com
2. **Check Running Containers:** Use `docker ps` to see a list of running containers and their status.
    ```sh
    docker ps
3. **Access Container Logs:** Retrieve the logs of a running container using its container ID.
    ```sh
    docker logs <container_id>

4. **Stop and Remove a Container:** To stop a running container and remove it, use:
    ```sh
    docker stop <container_id>
    docker rm <container_id>
5. **Expose Ports for Network Connections:** To allow external access to a containerized application, map a host port to a container port using the `-p` switch.
    ```sh
    docker run -d -p 8085:80 nginx
This maps port 8085 on the host to port 80 in the NGINX container.

6. **View Logs for NGINX:** After running the NGINX server, view its logs to see HTTP request traces.
    ```sh
    docker logs <nginx_container_id>
7. **Stop and Remove NGINX Container:** To clean up, stop and remove the NGINX container.
    ```sh
    docker stop <nginx_container_id>
    docker rm <nginx_container_id>
8. **Run a Jenkins Server:** To illustrate the isolation and ease of use with Docker, you can run a Jenkins server without installing dependencies on your host machine.
   ```sh
   docker run -p 8088:8080 jenkins/jenkins:lts
Access Jenkins at `http://localhost:8088` to complete the setup.


## 🏗️Creating a Docker Image

 1. **Create a Dockerfile:**
 -   Create a file named `Dockerfile` to define how your image should be built.
-   Begin with a `FROM` instruction to specify the base image:
    ```sh
    FROM debian:11
 - Use the `CMD` instruction to specify the command to run when the container starts:

   ```sh
   CMD ["echo", "Hello world"]
2. **Build the Image:**
-   Navigate to the directory containing your `Dockerfile`.
-   Run the `docker build` command with the `-t` switch to name the image and a dot to indicate the build context:
    ```sh
    docker build -t hello .
3. **Run the Container:**
- Use the `docker run` command to run a container from the created image:
    ```sh
    docker run --rm hello

## 🗂️Docker Registry and Repository
| Command                 | Meaning                                           | Syntax                                                      |
|-------------------------|---------------------------------------------------|-------------------------------------------------------------|
| Login to a Registry     | This command helps you log in to your Registry.   | `docker login`<br>`docker login localhost:8080`             |
| Logout from a registry  | This command helps you log out from your Registry.| `docker logout`<br>`docker logout localhost:8080`           |
| Searching an image      | By using this docker command you can search any image from your docker. | `search nginx`<br>`docker search --filter stars=3 --no-trunc nginx` |
| Pulling an Image        | This command can be used to download a specific image or set of images. | `docker image pull nginx`<br>`docker image pull eon01/nginx localhost:5000/myadmin/nginx` |
| Pushing an image        | This command can be used to push a specific image or set of images. | `docker image push eon01/nginx`<br>`docker image push eon01/nginx localhost:5000/myadmin/nginx` |

## 🚢Running Containers
| Command                           | Meaning                                         | Syntax                                                           |
|-----------------------------------|-------------------------------------------------|------------------------------------------------------------------|
| Command to create a container     | This command is used to create a container without running | `docker container create -t -i eon01/infinite --name XYZ`         |
| Command to run a container        | This command is used to run a container          | `docker container run -it --name XYZ -d eon01/infinite`           |
| Command to rename a container     | Use this command to rename a container           | `docker container rename XYZ infinity`                            |
| Command for removing a container  | This command is used to remove a container       | `docker container rm infinite`                                    |
| Update a container                | This command is used to update a container       | `docker container update --cpu-shares 512 -m 300M infinite`       |




## 🔄Commands for Starting or Stopping the Container

| Command                             | Meaning                                         | Syntax                                    |
|-------------------------------------|-------------------------------------------------|-------------------------------------------|
| Command for starting a container    | This command is used for starting a container   | `docker container start nginx`            |
| Command for stopping a container    | This command is used for stopping a container   | `docker container stop nginx`             |
| Command for restarting the container| This command is used for restarting a container | `docker container restart nginx`          |
| Command for pausing the container   | This command is used for pausing a container    | `docker container pause nginx`            |
| Command for unpausing the container | This command is used for unpausing a container in the docker | `docker container unpause nginx`           |
| Command for Blocking a container    | This command is used for blocking a container in the docker | `docker container wait nginx`              |

## 🔍Commands for Obtaining Container Information

| Command                                                                   | Meaning                                                                                                   | Syntax                                                      |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| Fetching information From Running Containers                              | We can fetch information from running containers by using this command                                     | `docker ps`<br>Or<br>`docker container ls`                  |
| Command for fetching about every container                                | This command is for fetching information about every container                                             | `docker container ls -a`<br>Or<br>`docker ps -a`             |
| Command for container log                                                 | We can use this command to see the container log                                                           | `docker logs infinite`                                       |
| Command for ‘tail -f’ Containers’ Logs                                    | With this command, the container isn't running in the foreground, and if there isn't anything running in the foreground, Docker closes automatically. | `docker container logs infinite -f`                          |
| Command for Inspecting Containers                                         | This command is used for inspecting containers                                                             | `docker container inspect infinite`<br>`docker container inspect --format '' $(docker ps -q)` |
| Command for Containers Events                                             | To obtain real-time events from the server, use docker events                                              | `docker system events infinite`                              |
| Command for Public Ports                                                  | Use this command for finding a public port                                                                 | `docker container port infinite`                             |
| Command for Running Processes                                             | We can use this command for displaying the running processes in the container                              | `docker container top infinite`                              |
| Command for Container Resource Usage                                      | It displays a live stream of resource usage statistics for containers                                      | `docker container stats infinite`                            |
| Commands for Inspecting changes to files or directories on a container’s filesystem | This command is used for inspecting changes to files or directories on a container’s filesystem             | `docker container diff inf`                                  |


## 🖼️Commands for Managing Images

| Command                                                                   | Meaning                                                                                       | Syntax                                                       |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| Commands for listing images                                               | This command is used to list images                                                           | `docker image ls`                                            |
| Command for Building images From the current directory's Dockerfile       | This command is used for building from the current directory’s Dockerfile                     | `docker build`                                               |
| Command for Building images From a GIT remote repository                  | This command is used for building images using a remote GIT repository                        | `docker build github.com/creack/docker-firefox`              |
| Commands for tagging and building                                         | This command is for tagging and building                                                      | `docker build -t eon/infinite`                               |
| Specifying the Build Context while creating a Dockerfile                  | This is used to build an image from a Dockerfile                                              | `docker build -f myDockerfile`                               |
| Creating a Dockerfile from a URL                                          | This will help to create a Dockerfile with a specific URL                                     | `curl example.com/remote/Dockerfile | docker build -f -`     |
| Command for removing an image                                             | This command is used to remove an image                                                       | `docker image rm nginx`                                      |
| Using a File or the Normal Input Stream to Load a Tarred Repository       | Use STDIN or a tar archive to load an image                                                   | `docker image load < ubuntu.tar.gz`                          |
|                                                                          |                                                                                               | `docker build -f myOtherDockerfile`                          |
| Image Saving to a Tar Archive                                             | It is used to save one or more images to a tar archive                                        | `docker image save busybox > ubuntu.tar`                     |
| Showing the History of an Image                                           | This command will let you know the history of the image inside Docker                          | `docker image history`                                       |
| Making an Image Out of a Container                                        | This command will help you to take an image out of the container                               | `docker container commit nginx`                              |
| Command for image tagging                                                 | We can use this command for image tagging                                                     | `docker image tag nginx eon01/nginx`                         |
| Command for pushing an image                                              | We can push any image through this command                                                    | `docker image push eon01/nginx`                              |

 ## 🌐Commands for Networking
 | Command                                                       | Meaning                                                                                          | Syntax                                                     |
|---------------------------------------------------------------|--------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| Command for overlay network                                   | This is used to establish a distributed network between many Docker daemon hosts.                | `docker network create -d overlay MyOverlayNetwork`        |
| Command for Bridge network                                     | To establish container test1 to bridge demo-bridge, type docker network connect demo-bridge test1| `docker network create -d bridge MyBridgeNetwork`          |
| Command for removing a network                                 | This command is used to remove an overlay network                                                | `docker network rm MyOverlayNetwork`                       |
| Command for network listing                                    | This command is used for listing the overlay networks                                            | `docker network ls`                                        |
| Command for Getting Information About a Network                | We can get information about an overlay network with the help of this command                    | `docker network inspect MyOverlayNetwork`                  |
| Command for Connecting a Running Container to a Network        | By using this command we can connect a container to a network                                    | `docker network connect MyOverlayNetwork nginx`            |
| Command for Connecting a Container to a Network When it Starts | When the container starts we can use this command to connect a container to a network            | `docker container run -it -d --network=MyOverlayNetwork nginx` |
| Command for Disconnecting a Container from a Network           | We can use this command for disconnecting a container from a network                             | `docker network disconnect MyOverlayNetwork nginx`         |


## 🧹Commands for Cleaning Docker

| Command                                   | Meaning                                          | Syntax                                       |
|-------------------------------------------|--------------------------------------------------|----------------------------------------------|
| Command for Removing a Running Container  | We can remove a running container by using this command | `docker container rm nginx`                  |
| Command for Removing a Docker Image       | This command is used for removing a docker image | `docker image rm nginx`                      |
| Command for Removing all Images           | We can remove all the images in Docker by using this command | `docker image rm $(docker image ls -a -q)`   |
| Command for Clean all                     | We can use this command for cleaning everything in Docker | `docker system prune -a`                     |

##  🔒Docker Security
Container images consist of layers and software packages, which are susceptible to vulnerabilities. These vulnerabilities can compromise the security of containers and applications.

Docker Scout is a solution for proactively enhancing your software supply chain security. By analyzing your images, Docker Scout compiles an inventory of components, also known as a Software Bill of Materials (SBOM). The SBOM is matched against a continuously updated vulnerability database to pinpoint security weaknesses.

Docker Scout is a standalone service and platform that you can interact with using Docker Desktop, Docker Hub, the Docker CLI, and the Docker Scout Dashboard. Docker Scout also facilitates integrations with third-party systems, such as container registries and CI platforms.
| Meaning                                              | Command                                                                 |
|------------------------------------------------------|-------------------------------------------------------------------------|
| Command line tool for Docker Scout                   | `docker scout`                                                          |
| Analyzes a software artifact for vulnerabilities      | `docker scout cves [OPTIONS] IMAGE|DIRECTORY|ARCHIVE`                   |
| Display vulnerabilities from a docker save tarball   | `docker save redis > redis.tar`                                         |
| Display vulnerabilities from an OCI directory        | `skopeo copy --override-os linux docker://alpine oci:redis`             |
| Export vulnerabilities to a SARIF JSON file          | `docker scout cves --format sarif --output redis.sarif.json redis`      |
| Comparing two images                                  | `docker scout compare --to redis:6.0 redis:6-bullseye`                  |
| Displaying the Quick Overview of an Image            | `docker scout quickview redis:6.0`                                      |
## 🚢Docker Compose

Docker Compose is used to run multiple containers as a single service. For example, you can start an application requiring NGNIX and MySQL with one file, without needing to start each container separately.

## 🔑Getting Started with Docker Compose

This guide covers how to get Docker Compose up and running, and how to create a simple service with MySQL and NGNIX using Docker Compose.

### 🛠️Installation

  

#### Step 1: Download Docker Compose

  

Use the following command to download Docker Compose:

    curl  -L"https://github.com/docker/compose/releases/download/1.10.0-rc2/dockercompose-$(uname  -s)-$(uname  -m)"  -o  /home/demo/docker-compose

This  command  downloads  Docker  Compose  version  1.10.0-rc2  and  stores  it  in  the  directory  `/home/demo/`.

#### Step 2: Provide Execute Privileges

  

Give  execute  privileges  to  the  downloaded  file:

    
    chmod +x /home/demo/docker-compose


#### Step 3: Verify Installation✅

  

Check the Docker Compose version:

    docker-compose  version

## 📄Creating Your First Docker Compose File

Create  a  Docker  Compose  file (YAML format) using a text editor:

    sudo vim docker-compose.yml

## Example `docker-compose.yml`

 

    version: '2'
	services:
	  database:
	    image: mysql
	    ports:
	      - "3306:3306"
	    environment:
	      MYSQL_ROOT_PASSWORD: example
	  web:
	    image: nginx
	    ports:
	      - "80:80"


  

-  database  and  web  define  two  services.

-  image  specifies  the  Docker  Hub  image  for  MySQL  and  NGNIX.

-  ports  specifies  the  ports  to  be  exposed.

-  environment  sets  the  necessary  environment  variables  for  MySQL.

  

#### 🚀Running Docker Compose and Verifying Running Containers :

    sudo ./docker-compose up
    docker ps


**Thank you for visiting our directory! We're committed to providing valuable resources to make your experience with Docker Knowledge seamless and enjoyable. If you have any questions or need further assistance, please don't hesitate to reach out. Happy containerizing!**

  

[LinkedIn](https://www.linkedin.com/in/revanth1/)





