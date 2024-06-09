# Ansible Playbook for Configuring HTTPD inside Docker

This repository contains an Ansible playbook to set up an HTTPD (Apache) server inside a Docker container. By following the steps in this guide, you can easily install and configure the Apache server in a Docker container. The playbook automates everything from installing Docker and HTTPD to configuring the server and running the container.



https://github.com/mayaworld13/HelpOps-Hub/assets/127987256/15e3429d-9e79-48a5-a98d-14120711402c



## Steps

### 1. Install Ansible
Install Ansible on your master node:
```sh
sudo yum install ansible-core -y
```

### 2. Create an Ansible Directory
Create a directory for your Ansible configuration and navigate into it:
```sh
mkdir ansible
cd ansible
```

### 3. Configuration with ansible.cfg
Create the Ansible configuration file:

```sh
vim ansible.cfg
```
Paste the following content into `ansible.cfg`:

```sh
[defaults]
inventory = inventory
```

### 4. Create an Inventory File
Create an inventory file and add the IP address of your `slave node`:

```sh
vim inventory
[webservers]
<slave_node_ip> ansible_connection=ssh ansible_user=<your_user>
```

### 5. Establish Password Access
Ensure passwordless SSH access from the master node to the slave node. You can do this by copying the `SSH` key:

```sh
ssh-copy-id <your_user>@<slave_node_ip>
```

### 6. Verify Connectivity
Verify that the Ansible master node can connect to the slave node:

```sh
ansible all -m ping
```

### 7. Create the Playbook File
Create the playbook file docker.yml:

```sh
vim docker.yml
```
Paste the following content into `docker-playbook.yml`:

```sh
---
- name: Configure and Run Docker Container
  hosts: dev  # Use the group name from your inventory file
  remote_user: ec2-user  # SSH username for connecting to the EC2 instance
  become: yes
  become_method: sudo
  tasks:
    - name: Install Docker on Amazon Linux 2
      ansible.builtin.package:
        name: docker
        state: present

    - name: Start and enable Docker service
      ansible.builtin.service:
        name: docker
        state: started
        enabled: yes

    - name: Pull the httpd server image from Docker Hub
      community.docker.docker_image:
        name: httpd:latest
        source: pull

    - name: Create /var/www/html directory
      ansible.builtin.file:
        path: /var/www/html
        state: directory

    - name: Create an HTML file
      ansible.builtin.copy:
        content: "<html><body><h1>Hello, Azfar this side from Arth3. 0</h1></body></html>"
        dest: /var/www/html/index.html

    - name: Remove the existing container if it exists
      community.docker.docker_container:
        name: my_httpd_container
        state: absent
      ignore_errors: yes

    - name: Run the Docker container
      community.docker.docker_container:
        name: my_httpd_container
        image: httpd:latest
        ports:
          - "8080:80"
        volumes:
          - /var/www/html:/usr/local/apache2/htdocs/
        state: started

  handlers:
    - name: Reload Apache
      ansible.builtin.service:
        name: httpd
        state: reloaded
```

### 8. Validate the Playbook
Validate your playbook to ensure there are no errors:

```sh
ansible-playbook --syntax-check docker.yml
```

### 9. Run the Playbook

```sh
ansible-playbook docker-playbook.yml
```



