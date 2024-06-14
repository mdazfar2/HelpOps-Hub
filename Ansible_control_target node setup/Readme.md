# Setting Up Control Node and Target Nodes Using Ansible 🌐🔧

## Overview

This guide provides step-by-step instructions to set up a control node and two target nodes using Ansible, a powerful automation tool. Ansible simplifies the management and configuration of multiple nodes from a single control node.

## Prerequisites 📋

- Control node and target nodes accessible over SSH
- Ansible installed on the control node
- Basic understanding of Ansible concepts (inventory, playbooks, etc.)

## Step-by-Step Guide 🛠️

### Step 1: Install Ansible on Control Node

1. **Update the package repository**:

   ```sh
   sudo apt update

2. **Install Ansible:**
   ```sh
   sudo apt install ansible

3. **Verify Ansible installation:**
   ```sh
   ansible --version

### Step 2: Configure SSH Access

1. **Generate SSH keys on the control node (if not already done):**
   ```sh
   ssh-keygen

2. **Copy the SSH public key to the target nodes:**
   ```sh
   ssh-copy-id user@target-node1
   ssh-copy-id user@target-node2
   ```
   Replace user with your username and target-node1, target-node2 with the respective IP addresses or hostnames of your target nodes.

3. **Verify SSH connectivity to target nodes:**
   ```sh
   ssh user@target-node1
   ssh user@target-node2

### Step 3: Configure Ansible Inventory

1. **Create an Ansible inventory file (e.g., hosts.ini) on the control node:**
   ```ini
   [targets]
   target-node1 ansible_host=ip_address1
   target-node2 ansible_host=ip_address2

   [targets:vars]
   ansible_user=user
   ```
   Replace ip_address1, ip_address2 with the IP addresses or hostnames of your target nodes, and user with your SSH username.

### Step 4: Write Ansible Playbook

**Create an Ansible playbook (e.g., setup.yml) to configure the target nodes:**
   ```yaml
   ---
    - hosts: targets
    tasks:
        - name: Ensure NTP (Network Time Protocol) is installed
        package:
            name: ntp
            state: present
   
```
    Customize the playbook tasks according to your requirements.

### Step 5: Run Ansible Playbook

1. **Execute the Ansible playbook from the control node:**
   ```sh
   ansible-playbook -i hosts.ini setup.yml

2. **Verify configuration on target nodes:**
   ```sh
   ssh user@target-node1
   systemctl status ntp

Repeat for target-node2.

### Conclusion 🎉

You have successfully set up a control node and configured two target nodes using Ansible.




 