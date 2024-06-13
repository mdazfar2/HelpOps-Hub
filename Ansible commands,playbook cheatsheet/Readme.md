# Ansible Commands, Playbooks, and Cheatsheet 🚀

## Ansible Commands

### Installation

# Install Ansible on Debian/Ubuntu
```sh
sudo apt update
sudo apt install ansible
```

# Install Ansible on CentOS/RHEL
```sh
sudo yum install ansible
```

### Basic Commands

**Check Ansible version**
```sh
ansible --version
```
**Ping test to check connectivity**
```sh
ansible all -m ping
```

**Ad-hoc command example (installing a package)**
```sh
ansible webserver -m yum -a "name=httpd state=latest"
```

### Ansible Playbooks
**Playbook Structure**
```sh
---
- name: Configure Web Servers
  hosts: webservers
  become: yes

  tasks:
    - name: Install Apache
      yum:
        name: httpd
        state: present

    - name: Start Apache Service
      service:
        name: httpd
        state: started
```

**Example Playbook**
```sh
---
- name: Setup Monitoring
  hosts: monitoring
  become: yes

  tasks:
    - name: Install SNMP Service
      yum:
        name: net-snmp
        state: present

    - name: Configure SNMP Community
      template:
        src: snmpd.conf.j2
        dest: /etc/snmp/snmpd.conf
      notify:
        - restart snmpd

  handlers:
    - name: restart snmpd
      service:
        name: snmpd
        state: restarted
```

### Ansible Cheatsheet
**Common Modules***
>yum: Manages packages on RPM-based systems.
>apt: Manages packages on Debian-based systems.
>file: Manages files and directories.
>copy: Copies files to remote locations.
>service: Manages services on the system.
>template: Manages file templates.

**Inventory File (hosts.ini)**
```ini
[webservers]
webserver1 ansible_host=192.168.1.101
webserver2 ansible_host=192.168.1.102

[monitoring]
monitor1 ansible_host=192.168.1.201
```

**Variables and Templates**
```sh
# Variable example
---
web_servers:
  - hostname: webserver1
    ip: 192.168.1.101

# Template example
---
- name: Configure Apache
  template:
    src: httpd.conf.j2
    dest: /etc/httpd/conf/httpd.conf
```

**Troubleshooting and Advanced Tips**
>Use -vvv for verbose output to debug.
>Ensure correct YAML syntax in playbooks (ansible-lint for linting).
>Utilize roles for modular and reusable playbook organization.
>Leverage Ansible Galaxy for community-contributed roles.

**Additional Resources**
For comprehensive Ansible documentation and tutorials, visit [Ansible Documentation](https://docs.ansible.com/).

This Markdown file provides an in-depth reference for Ansible commands, playbook structure, common modules, inventory setup, variables, templates, troubleshooting tips, and advanced techniques. Customize examples and details to suit your specific Ansible deployment and management needs.