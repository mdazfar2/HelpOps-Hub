# 📊 Grafana Installation and Setup Guide

Welcome to the Grafana installation and setup guide! Follow these simple steps to get Grafana up and running on your system.

## 🚀 Installation

### 🐧 Installing on Linux (Debian/Ubuntu)

1. **Add the Grafana APT repository:**
    ```sh
    sudo apt-get install -y software-properties-common
    sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
    ```

2. **Add the GPG key:**
    ```sh
    sudo wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
    ```

3. **Update your APT package index and install Grafana:**
    ```sh
    sudo apt-get update
    sudo apt-get install grafana
    ```

4. **Start the Grafana server:**
    ```sh
    sudo systemctl start grafana-server
    ```

5. **Enable the Grafana server to start at boot:**
    ```sh
    sudo systemctl enable grafana-server
    ```

### 🐧 Installing on Linux (RHEL/CentOS)

1. **Add the Grafana YUM repository:**
    ```sh
    sudo cat <<EOF | sudo tee /etc/yum.repos.d/grafana.repo
    [grafana]
    name=grafana
    baseurl=https://packages.grafana.com/oss/rpm
    repo_gpgcheck=1
    enabled=1
    gpgcheck=1
    gpgkey=https://packages.grafana.com/gpg.key
    sslverify=1
    sslcacert=/etc/pki/tls/certs/ca-bundle.crt
    EOF
    ```

2. **Install Grafana:**
    ```sh
    sudo yum install grafana
    ```

3. **Start the Grafana server:**
    ```sh
    sudo systemctl start grafana-server
    ```

4. **Enable the Grafana server to start at boot:**
    ```sh
    sudo systemctl enable grafana-server
    ```

### 👉 Installing on Windows

1. **Download Grafana:**
    - Go to the [Grafana download page](https://grafana.com/grafana/download) and select the Windows version.
    - Download the installer.

2. **Run the Installer:**
    - Run the downloaded installer and follow the instructions.

3. **Start Grafana:**
    - Open a Command Prompt or PowerShell window.
    - Navigate to the Grafana installation directory (usually `C:\Program Files\GrafanaLabs\grafana`).
    - Run the following command to start Grafana:
      ```sh
      bin\grafana-server.exe
      ```

### 🐋 Installing with Docker

1. **Pull the Grafana Docker image:**
    ```sh
    docker pull grafana/grafana
    ```

2. **Run a Grafana container:**
    ```sh
    docker run -d --name=grafana -p 3000:3000 grafana/grafana
    ```

## 🌐 Accessing Grafana

After installation, Grafana should be accessible via a web browser. Navigate to `http://localhost:3000` or `http://<your-server-ip>:3000`.

### 🔑 Default Login

- **Username:** `admin`
- **Password:** `admin`

You'll be prompted to change the password upon first login.

## ⚙️ Additional Configuration

To configure Grafana further, such as setting up data sources or dashboards, refer to the [Grafana documentation](https://grafana.com/docs/).

---

🎉 Congratulations! You have successfully installed and set up Grafana. Enjoy creating beautiful dashboards and gaining insights from your data!
