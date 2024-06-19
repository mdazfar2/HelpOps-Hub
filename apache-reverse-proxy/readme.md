# Apache Reverse Proxy for Docker Container  

This repository provides instructions for setting up an Apache reverse proxy on an Ubuntu server to proxy requests to a Docker container running on port 8000.

## Prerequisites

- Ubuntu server
- Docker installed on the server
- Basic knowledge of Apache and Docker

## Setup Instructions

### Step 1: Run your application which ever port your application is running

In my case I am using docker as my application running on container on port 8000

   ```sh
   docker run -d -p 8000:8000 mayaworld13/django-todo-app
   ```
### Step 2: update package and install apache
  ```sh
  sudo apt update
  sudo apt install apache2 -y
  ```
### Step 3: Enable Apache Modules
Enable necessary modules for reverse proxy:

```sh
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo systemctl restart apache2
```
### Step 4: Configure Apache as a Reverse Proxy
Add the configeration in  default Apache configuration file:

```sh
sudo vim /etc/apache2/sites-available/000-default.conf
```
Add or modify the configuration to proxy requests to your Docker container:

```sh
<VirtualHost *:80>
    ServerAdmin webmaster@yourdomain.com or webmaster@localhost
    ServerName your_domain_or_ip

    ProxyPreserveHost On
    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/

    <Location />
        Order allow,deny
        Allow from all
    </Location>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Replace your_domain_or_ip with your actual domain name or IP address. ServerAdmin specifies the email address to receive server-related notifications.

### Step 5: Test and Restart Apache
Test the Apache configuration for syntax errors:

```sh
sudo apache2ctl configtest
```
![image](https://github.com/mayaworld13/proxy-server/assets/127987256/cdd97088-6a4f-482a-8e54-c044ca415332)

If the test is successful, restart Apache to apply the changes:

```sh
sudo systemctl restart apache2
```

Step 6: Access Your Application

Open a web browser and navigate to http://your_domain_or_ip. You should see the content served by your Docker container running on port 8000, proxied through Apache.

![image](https://github.com/mayaworld13/proxy-server/assets/127987256/5e847214-21a3-4a11-8a5c-d7bff0c867af)

---

## To automate this Run the script I have made

```sh
./proxy.sh YOURPUBLICIP
```
