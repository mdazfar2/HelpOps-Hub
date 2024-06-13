# Hosting and Launching a Web Application with Docker on AWS EC2 Instance 🚀

## Overview

This guide provides a step-by-step process to host and launch a web application using Docker on an AWS EC2 instance.

## Prerequisites 📋

- An AWS account
- Basic knowledge of AWS and Docker
- AWS CLI installed and configured
- SSH access to your EC2 instance

## Step-by-Step Guide 🛠️

### Step 1: Launch an EC2 Instance 🚀

1. **Log in to the AWS Management Console**:
   ![AWS Management Console]

2. **Navigate to the EC2 Dashboard** and click "Launch Instance":
   ![EC2 Dashboard]

3. **Choose an Amazon Machine Image (AMI)**: Select the latest Ubuntu AMI.
   ![Choose AMI]

4. **Choose an Instance Type**: Select t2.micro (eligible for the free tier).
   ![Choose Instance Type]

5. **Configure Instance Details**: Keep the default settings.
   ![Configure Instance Details]

6. **Add Storage**: Keep the default settings.
   ![Add Storage]

7. **Add Tags**: Add a tag with Key = `Name` and Value = `Docker-WebApp`.
   ![Add Tags]

8. **Configure Security Group**:
    - Create a new security group.
    - Add rules to allow SSH (port 22) and HTTP (port 80).
   ![Configure Security Group]

9. **Review and Launch**: Click "Launch" and create a new key pair or use an existing one. Download the key pair.
   ![Review and Launch]

### Step 2: Connect to Your EC2 Instance 🔗

1. **Open your terminal** and navigate to the directory containing your key pair file.

2. **Change the permissions of the key pair file**:

   ```sh
   chmod 400 your-key-pair.pem

3. **Connect to your instance:**
   ```sh
   ssh -i "your-key-pair.pem" ubuntu@your-ec2-public-dns

### Step 3: Install Docker on EC2 Instance 🐳

1. **Update the package database:**
   ```sh
   sudo apt-get update

2. **Install Docker:**
   ```sh
   sudo apt-get install -y docker.io

3. **Start Docker and enable it to start on boot:**
   ```sh
   sudo systemctl start docker
   sudo systemctl enable docker

4. **Verify Docker installation:"
   ```sh
   docker --version

### Step 4: Set Up Your Web Application 📦
1. **Clone your web application repository (replace the URL with your repository):**
   ```sh
   git clone https://github.com/your-username/your-webapp.git
   cd your-webapp

2. **Create a Dockerfile in the root of your project (if not already present):**
   ```dockerfile
   FROM node:14

   WORKDIR /app

   COPY package*.json ./

   RUN npm install

   COPY . .

   EXPOSE 3000

   CMD ["npm", "start"]
   ```
3. **Build the Docker image:**
   ```sh
   docker build -t your-webapp .

4. **Run the Docker container:**
   ```sh
   docker run -d -p 80:3000 your-webapp

### Step 5: Access Your Web Application 🌐
Open a web browser and navigate to your EC2 instance's public DNS (IPv4) address.
Your web application should be running and accessible on port 80.

### Conclusion 🎉
You have successfully hosted and launched your web application using Docker on an AWS EC2 instance. Your application is now live and accessible via the internet.


   
