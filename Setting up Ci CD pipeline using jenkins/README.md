# Jenkins CI/CD Setup Guide

Whether you're new to Jenkins or looking to set up a CI/CD pipeline on your server, this comprehensive guide will help you through clear, step-by-step instructions.

## Pre-requisites

- Ubuntu OS (Xenial or later)
- sudo privileges
- Internet access
- t2.medium instance type or higher

---

# Execute all the command step by step

## Install Jenkins

1. **Update your system**:
   
   ```bash
   sudo apt update
   sudo apt upgrade -y

2. **Install Java**:
   ```bash
   sudo apt install openjdk-11-jdk -y

3. **Add Jenkins repository**:
   ```bash
   curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null   

4. **Install Jenkins**:
   ```bash
   sudo apt update
   sudo apt install jenkins -y

5. **Start Jenkins service**:
   ```bash
   sudo systemctl start jenkins
   sudo systemctl enable jenkins

6. **Access Jenkins**:
   >Open a web browser and go to http://<your-server-ip>:8080.
   >Unlock Jenkins by copying the password from the initialAdminPassword file:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Configure Jenkins

- **Install suggested plugins** during the initial setup.
- **Create an Admin User**:
  - Follow the on-screen instructions to create your admin user.
- **Configure Jenkins URL**:
  - Set the Jenkins URL to your server's IP address or domain name.

# Set Up a Jenkins Job

## Create a New Job:

1. Go to Jenkins Dashboard.
2. Click on `New Item`.
3. Enter a name for your job and select `Pipeline`. Click `OK`.

## Configure the Pipeline:

1. In the job configuration page, scroll down to the `Pipeline` section.
2. Select `Pipeline script from SCM`.
3. Choose `Git` and enter your repository URL.
4. Specify the branch to build (e.g., `main`).

# Create a Jenkinsfile

Create a `Jenkinsfile` in the root of your repository with the following content:

    ```groovy
    pipeline {
        agent any

        stages {
            stage('Build') {
                steps {
                    echo 'Building...'
                    // Add build steps here
                }
            }
            stage('Test') {
                steps {
                    echo 'Testing...'
                    // Add test steps here
                }
            }
            stage('Deploy') {
                steps {
                    echo 'Deploying...'
                    // Add deploy steps here
                }
            }
        }

        post {
            always {
                echo 'Cleaning up...'
                // Add cleanup steps here
            }
        }
    }

    ```
# Run the Pipeline

## Trigger the Pipeline:
- Go to your job in Jenkins.
- Click `Build Now` to trigger the pipeline.

## Monitor the Build:
- Click on the build number to see the build details.
- Check the console output for logs and debug information.

# Troubleshooting

## Common Issues

- **Jenkins not starting**: Check Jenkins logs for errors:
  ```bash
  sudo journalctl -u jenkins


***Using all these processes, you will successfully set up a CI/CD pipeline using Jenkins. Now you can enjoy automating your build, test, and deployment processes, and if you are facing any issues, please don't hesitate to ask me. You can connect with me on:***

- [LinkedIn](https://www.linkedin.com/in/v-litesh-kumar-2094b5218)
- [Mail Me](mailto:kvlitesh@gmail.com)

Let's dive into Jenkins together and streamline your software delivery!

**Happy CI/CD-ing!** 🚀


 
    
