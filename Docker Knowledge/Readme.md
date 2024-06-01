## Container
A  _container_  is what we eventually want to run and host in Docker. You can think of it as an isolated machine, or a virtual machine if you prefer.

From a conceptual point of view, a  _container_  runs inside the Docker host isolated from the other containers and even the host OS. It cannot see the other containers, physical storage, or get incoming connections unless you explicitly state that it can. It contains everything it needs to run: OS, packages, runtimes, files, environment variables, standard input, and output.

##  Images
Any container that runs is created from an _image_. An image describes everything that is needed to create a container; it is a template for containers. You may create as many containers as needed from a single image.

## Registries
Images are stored in a _registry_. In the example above, the _app2_ image is used to create two containers. Each container lives its own life, and they both share a common root: their image from the registry.

## Run a Container
   
    docker run hello-world
    

1.  Your command asks Docker to create and run a container based on the  _hello-world_  image.
2. Since the _hello-world_ image wasn’t already present on your disk, Docker downloaded it from a default registry, the _Docker Hub_.
3. Docker created a container based on the  _hello-world_  image.
4. The  _hello-world_  image states that, when started, it should output some text to the console, so this is the text you see as the container is running.
5. The container stopped.

## Container Management Commands

You can get help for Docker commands from the command-line itself using the _–help_ switch.

    docker run --help
   You may use the following commands for container management:

-   _docker ps_: lists the containers that are still running. Add the  **-a**  switch in order to see containers that have stopped
    
-   _docker logs_: retrieves the logs of a container, even when it has stopped
    
-   _docker inspect_: gets detailed information about a running or stopped container
    
-   _docker stop_: stops a container that is still running
    
-   _docker rm_: deletes a container


## Running a Server Container

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

You can get specific parts of the logs with options like `--since`, `--until`, or `--tail`.
   
    ```sh
    docker logs --since 10s <container_id>

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


## Creating a Docker Image

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
