# 🚀 Jenkins Setup Documentation 📂

Welcome to the Jenkins setup guide! This document will walk you through the process of installing and configuring Jenkins on your system. Let's get started! 🎉

---

## Table of Contents 📚
1. [Introduction to Jenkins](#introduction-to-jenkins)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
    - [Step 1: Install Java](#step-1-install-java)
    - [Step 2: Install Jenkins](#step-2-install-jenkins)
4. [Initial Configuration](#initial-configuration)
    - [Step 3: Start Jenkins](#step-3-start-jenkins)
    - [Step 4: Unlock Jenkins](#step-4-unlock-jenkins)
    - [Step 5: Install Plugins](#step-5-install-plugins)
5. [Setting Up Your First Job](#setting-up-your-first-job)
6. [User Management](#user-management)
7. [Backup and Restore](#backup-and-restore)
8. [Advanced Configuration](#advanced-configuration)
9. [Troubleshooting](#troubleshooting)
10. [Conclusion](#conclusion)

---

## Introduction to Jenkins 🛠️

Jenkins is an open-source automation server that helps automate parts of the software development process, such as building, testing, and deploying code. It's highly customizable and integrates with many tools, making it a powerful ally in continuous integration and continuous delivery (CI/CD) pipelines.

---

## Prerequisites 📋

Before you begin, ensure you have the following:

- A system with at least 1GB of RAM and a dual-core processor
- Administrative access to your system
- Internet connection

---

## Installation 🚀

### Step 1: Install Java ☕

Jenkins requires Java to run. Follow these steps to install Java:

**For Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
```

**For CentOS/RHEL:**
```bash
sudo yum update
sudo yum install java-11-openjdk-devel -y
```

Verify the installation:
```bash
java -version
```

### Step 2: Install Jenkins 📥

**For Ubuntu/Debian:**
```bash
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
```

**For CentOS/RHEL:**
```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
sudo yum install jenkins -y
```

---

## Initial Configuration 🔧

### Step 3: Start Jenkins 🚦

**Start the Jenkins service:**
```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

**Check the status:**
```bash
sudo systemctl status jenkins
```

### Step 4: Unlock Jenkins 🔐

1. Open a web browser and navigate to `http://your_server_ip_or_domain:8080`
2. Retrieve the initial admin password:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Enter the password in the web interface to unlock Jenkins.

### Step 5: Install Plugins 🧩

1. Choose "Install suggested plugins" for a quick setup.
2. Wait for the plugins to install.

---

## Setting Up Your First Job 🏗️

1. **Create a new job:** Click on "New Item", enter a name, select "Freestyle project", and click "OK".
2. **Configure your job:** Add a description, source code repository, build triggers, and build steps.
3. **Save and build:** Click "Save", then click "Build Now" to run the job.

---

## User Management 👥

1. **Create a user:** Go to "Manage Jenkins" > "Manage Users" > "Create User".
2. **Assign roles:** Use plugins like "Role-based Authorization Strategy" to assign specific roles and permissions.

---

## Backup and Restore 🔄

**Backup Jenkins:**
- Regularly backup the `$JENKINS_HOME` directory, which contains configuration, build history, and plugins.

**Restore Jenkins:**
- Restore the `$JENKINS_HOME` directory from your backup.

---

## Advanced Configuration ⚙️

1. **Custom Workspaces:** Configure custom workspaces for your jobs.
2. **Pipeline as Code:** Use Jenkinsfile for defining Jenkins pipelines in your source code repository.
3. **Integrations:** Integrate with tools like GitHub, Docker, Kubernetes, etc.

---

## Troubleshooting 🐛

1. **Jenkins not starting:** Check logs at `/var/log/jenkins/jenkins.log`.
2. **Build failures:** Review console output of the failed build and adjust your job configuration.
3. **Plugin issues:** Ensure plugins are up-to-date and compatible with your Jenkins version.

---

## Conclusion 🎉

Congratulations! You've successfully set up Jenkins. Jenkins is a powerful tool that can greatly enhance your CI/CD pipeline. Keep exploring its features and integrating new tools to optimize your workflow.

Happy building! 🚀
