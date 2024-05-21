# Run Firefox inside Docker Container on Red Hat 🐧🐳

**This steps provide a simple way to run Mozilla Firefox 🌐 browser inside a Docker container on `Red Hat-based` systems.**
  
## To get started with Dockerized Firefox, follow these simple steps:

   1. 📥**Pulling an Image from DockerHub**
      ```bash
      docker pull azfaralam440/firefox:latest
      ```
   2. 🐢**Now run the container, after it automatically open firefox**

      ```bash
      docker run -it --rm --net=host --env="DISPLAY" --volume="$HOME/.Xauthority:/root/.Xauthority:rw" azfaralam440/firefox:latest
      ```
      
  After that, it will automatically open Firefox inside the Docker container. Enjoy your Firefox browser! 🎉

---

# 🔄 Or

### You can also create you own image follow these steps-

## Steps to be follow-
1. 📝 **Create `Dockerfile` and build it-**
   
> [!NOTE]
> Create Dockerfile from here, you will get Dockerfile [here](https://github.com/mdazfar2/HelpOps-Hub/blob/main/Dockerized%20Mozilla%20Firefox/Dockerfile).

3. 🛠️ **Build the Docker `Images`**

   ```bash
   docker build -t <ur-dockerHUB-userName>/firefox:v1 .
   ```
4. 📤 **Pushing Docker image to DockerHub `(optional)`-**
   ```bash
   docker login
   docker push <ur-dockerHUB-userName>/firefox:v1
   ```

5. 📥 **And then pulling the image from your own `DockerHub`**
   ```bash
   docker pull <ur-dockerHUB-userName>/firefox:v1
   ```

6. 🐢**Now run the container, after it automatically open firefox**
   ```bash
   docker run -it --rm --net=host --env="DISPLAY" --volume="$HOME/.Xauthority:/root/.Xauthority:rw" <ur-dockerHUB-userName>/firefox:v1
   ```
After that, it will automatically open Firefox inside the Docker container. Enjoy your Firefox browser! 🎉
