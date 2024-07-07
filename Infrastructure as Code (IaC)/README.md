# Infrastructure as Code (IaC) Installation and Usage Guide 🚀

Welcome to the Infrastructure as Code (IaC) installation and usage guide! This guide will walk you through the steps to install and use IaC tools on your local machine. Let's get started! 🌟

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Downloading and Installing Terraform](#downloading-and-installing-terraform)
3. [Setting Up Environment Variables](#setting-up-environment-variables)
4. [Writing Your First Terraform Configuration](#writing-your-first-terraform-configuration)
5. [Initializing and Applying Terraform Configuration](#initializing-and-applying-terraform-configuration)
6. [Using Ansible](#using-ansible)
7. [Conclusion](#conclusion)

## Prerequisites 📋
Before installing IaC tools, ensure you have the following software installed on your machine:

- [Terraform](https://www.terraform.io/downloads.html) ⛏️
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) 🔧
- [AWS CLI](https://aws.amazon.com/cli/) (if you plan to provision resources on AWS) ☁️
- [Python](https://www.python.org/downloads/) (if you plan to use Ansible) 🐍

## Downloading and Installing Terraform 📥
1. Visit the [Terraform download page](https://www.terraform.io/downloads.html).
2. Choose the appropriate package for your operating system.
3. Download the package.
4. Extract the downloaded zip file:
    ```sh
    unzip terraform_<version>_linux_amd64.zip
    ```
5. Move the extracted binary to a directory included in your system's PATH:
    ```sh
    sudo mv terraform /usr/local/bin/
    ```

## Setting Up Environment Variables ⚙️
To ensure Terraform can run from any directory, you may need to set up environment variables.

1. Open your `.bashrc` or `.zshrc` file:
    ```sh
    nano ~/.bashrc
    # or
    nano ~/.zshrc
    ```
2. Add the following line to set up the Terraform environment variable:
    ```sh
    export PATH=$PATH:/usr/local/bin/
    ```
3. Source the updated profile:
    ```sh
    source ~/.bashrc
    # or
    source ~/.zshrc
    ```

## Writing Your First Terraform Configuration 📝
Create a new directory for your Terraform configuration files and navigate into it:
```sh
mkdir terraform-project
cd terraform-project
```

Create a file named `main.tf` with the following content:
```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}
```

## Initializing and Applying Terraform Configuration 🏗️
1. Initialize your Terraform configuration:
    ```sh
    terraform init
    ```
2. Apply the Terraform configuration to create the specified resources:
    ```sh
    terraform apply
    ```

## Using Ansible 🔧
Ansible is a powerful tool for configuration management and automation. Here's how to get started with Ansible.

1. Install Ansible using pip:
    ```sh
    pip install ansible
    ```
2. Verify the installation:
    ```sh
    ansible --version
    ```

### Writing Your First Ansible Playbook 📘
Create a new directory for your Ansible playbook and navigate into it:
```sh
mkdir ansible-project
cd ansible-project
```

Create a file named `playbook.yml` with the following content:
```yaml
- name: Setup web server
  hosts: webservers
  become: yes
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

    - name: Start Apache service
      service:
        name: apache2
        state: started
```

## Running the Ansible Playbook 🏃
1. Create an inventory file named `hosts` with the IP addresses or hostnames of your servers:
    ```ini
    [webservers]
    server1 ansible_host=192.168.1.100
    server2 ansible_host=192.168.1.101
    ```
2. Run the Ansible playbook:
    ```sh
    ansible-playbook -i hosts playbook.yml
    ```

## Conclusion 🎉
Congratulations! You've successfully installed and used Terraform and Ansible on your machine. You are now ready to start automating your infrastructure and managing configurations efficiently. For more information and advanced usage, refer to the official [Terraform documentation](https://www.terraform.io/docs/index.html) and [Ansible documentation](https://docs.ansible.com/ansible/latest/index.html).

Happy automating! ✨
