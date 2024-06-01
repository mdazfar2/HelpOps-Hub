# Prometheus Setup Guide

This guide provides step-by-step instructions on how to download, extract, and run Prometheus version 2.52.0 on a Linux system.

## Prerequisites

Ensure you have the following installed on your system:
- `wget`
- `tar`
- A Linux-based operating system

## Installation Steps

### 1. Download Prometheus

Use `wget` to download the Prometheus tarball from the official GitHub releases page.

```sh
wget https://github.com/prometheus/prometheus/releases/download/v2.52.0/prometheus-2.52.0.linux-amd64.tar.gz
```

### 2. Extract the Tarball
Extract the contents of the tarball using the `tar` command.

```sh
tar -xvzf prometheus-2.52.0.linux-amd64.tar.gz
```
<p>
  <img src="https://github.com/mayaworld13/prometheus_monitoring/assets/127987256/5d25a49c-3e04-4930-8285-aec98cdb52f9" alt="installation" width="500" height="300" />
</p>



### 3. Navigate to the Prometheus Directory
Change your directory to the newly extracted Prometheus directory.
```sh
cd prometheus-2.52.0.linux-amd64
```
### 4. Run Prometheus

Execute the Prometheus binary to start the Prometheus server.
```sh
./prometheus
```
<p>
  <img src="https://github.com/mayaworld13/prometheus_monitoring/assets/127987256/a6b4fcb8-0880-41e8-b7f7-0cfdf6a1c0e1" alt="server started" width="500" height="100" />
</p>


### 5. Access Prometheus
Once Prometheus is running, it will be accessible on port `9090`. 
To verify that Prometheus is working correctly, open your web browser and navigate to:
```sh
IP:9090
```
You should see the Prometheus web UI.

<p>
  <img src="https://github.com/mayaworld13/prometheus_monitoring/assets/127987256/4b43e0c1-59b0-45a3-bfa4-401fcce66a8e" alt="server" width="800" height="500" />
</p>



