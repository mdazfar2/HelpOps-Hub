# 📝 JIRA Installation and Setup Guide

Welcome to the JIRA installation and setup guide! Follow these simple steps to get JIRA up and running on your system.

## 🚀 Installation

### 🐧 Installing on Linux

1. **Download the JIRA Installer:**
    ```sh
    wget https://product-downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-X.X.X-x64.bin
    ```
    (Replace `X.X.X` with the latest version number.)

2. **Make the installer executable:**
    ```sh
    chmod +x atlassian-jira-software-X.X.X-x64.bin
    ```

3. **Run the installer:**
    ```sh
    sudo ./atlassian-jira-software-X.X.X-x64.bin
    ```

    Follow the prompts to complete the installation.

### ✔ Installing on Windows

1. **Download the JIRA Installer:**
    - Go to the [JIRA download page](https://www.atlassian.com/software/jira/download) and select the Windows version.
    - Download the installer.

2. **Run the Installer:**
    - Run the downloaded installer and follow the instructions.

### 🍎 Installing on macOS

1. **Download the JIRA Installer:**
    - Go to the [JIRA download page](https://www.atlassian.com/software/jira/download) and select the macOS version.
    - Download the installer.

2. **Run the Installer:**
    ```sh
    sudo ./atlassian-jira-software-X.X.X-x64.bin
    ```
    Follow the prompts to complete the installation.

## 🌐 Accessing JIRA

After installation, JIRA should be accessible via a web browser. Navigate to `http://localhost:8080` or `http://<your-server-ip>:8080`.

## 🛠️ Setup

1. **Welcome Screen:**
    - Open your web browser and navigate to the JIRA URL.
    - You will see the JIRA setup wizard.

2. **License Agreement:**
    - Read and accept the license agreement.

3. **Database Setup:**
    - Choose your database type.
    - Enter the database details. (For testing purposes, you can use the embedded H2 database.)

4. **Configure JIRA:**
    - Enter the required information such as site title, mode, and base URL.

5. **Create Admin Account:**
    - Create an administrator account by filling in the required fields.

6. **Email Notifications:**
    - Configure email notifications. You can skip this step if you prefer to configure it later.

7. **Application Setup:**
    - Choose the setup method. You can select "My Own Settings" for a custom setup or "JIRA Default Settings" for a quick setup.

8. **Complete Setup:**
    - Finish the setup process. JIRA will apply the configurations and you will be redirected to the login page.

### 🔑 Default Login

- **Username:** Set during the setup process.
- **Password:** Set during the setup process.

## 📈 Creating Your First Project

1. **Log in to JIRA:**
    - Use the admin account credentials to log in.

2. **Create a Project:**
    - Click on the "Projects" dropdown.
    - Select "Create Project".
    - Choose a project template and follow the prompts to create your project.

## 📚 Additional Configuration

To configure JIRA further, such as setting up workflows, user management, and additional plugins, refer to the [JIRA documentation](https://confluence.atlassian.com/jirasoftware/jira-software-documentation-775771490.html).

---

🎉 Congratulations! You have successfully installed and set up JIRA. Enjoy managing your projects and improving your workflow!
