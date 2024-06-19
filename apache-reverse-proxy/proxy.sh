
#!/bin/bash

# Script to automate setup of Apache reverse proxy for Docker container on EC2 instance

# Check if the script is run with root privileges
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

# Variables
DOCKER_IMAGE="mayaworld13/django-todo-app"  # Replace with your Docker image name
EC2_PUBLIC_IP="$1"  # First argument should be the EC2 instance's public IP address
SERVER_ADMIN="webmaster@localhost"  # Replace with your email address for ServerAdmin

# Function to install Docker
install_docker() {
    sudo apt-get update
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    sudo usermod -aG docker ubuntu  # Assuming your user is 'ubuntu'
}

# Function to pull and run Docker container
run_docker_container() {
    docker pull $DOCKER_IMAGE
    docker run -d -p 8000:8000 $DOCKER_IMAGE
}

# Function to install Apache
install_apache() {
    sudo apt-get update
    sudo apt-get install -y apache2
}

# Function to enable Apache modules for reverse proxy
enable_apache_modules() {
    sudo a2enmod proxy proxy_http headers
}

# Function to configure Apache as reverse proxy
configure_apache() {
    sudo bash -c "cat <<EOF > /etc/apache2/sites-available/000-default.conf
<VirtualHost *:80>
    ServerAdmin $SERVER_ADMIN
    ServerName $EC2_PUBLIC_IP

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/

    <Location />
        Require all granted
    </Location>

    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF"

    sudo systemctl reload apache2
}

# Function to test Apache configuration
test_apache_config() {
    sudo apache2ctl configtest
}

# Function to restart Apache
restart_apache() {
    sudo systemctl restart apache2
}

# Main script
if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <EC2_PUBLIC_IP>"
    exit 1
fi

# Install Docker and run container
install_docker
run_docker_container

# Install Apache and configure as reverse proxy
install_apache
enable_apache_modules
configure_apache

# Test and restart Apache
test_apache_config
restart_apache

echo "Apache reverse proxy setup for Docker container on EC2 instance completed."
echo "Access your application at http://$EC2_PUBLIC_IP"
