# Installation Guide-

Whether you're new to Kubernetes or looking to deploy it on your Ubuntu EC2 instances, this comprehensive k8s-install.md file has you covered with clear, step-by-step instructions.

## Pre-requisites

- Ubuntu OS (Xenial or later)
- sudo privileges
- Internet access
- t2.medium instance type or higher

---

## AWS Setup

- Make sure your all instance are in same **Security group**.
- Expose port **6443** in the **Security group**, so that worker nodes can join the cluster.

---

## Execute MASTER & WORKER node

```bash
sudo swapoff -a

# Create the .conf file to load the modules at bootup
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# sysctl params required by setup, params persist across reboots
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# Apply sysctl params without reboot
sudo sysctl --system

## Install CRIO Runtime
sudo apt-get update -y
sudo apt-get install -y software-properties-common curl apt-transport-https ca-certificates gpg

sudo curl -fsSL https://pkgs.k8s.io/addons:/cri-o:/prerelease:/main/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/cri-o-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/cri-o-apt-keyring.gpg] https://pkgs.k8s.io/addons:/cri-o:/prerelease:/main/deb/ /" | sudo tee /etc/apt/sources.list.d/cri-o.list

sudo apt-get update -y
sudo apt-get install -y cri-o

sudo systemctl daemon-reload
sudo systemctl enable crio --now
sudo systemctl start crio.service

echo "CRI runtime installed successfully"

# Add Kubernetes APT repository and install required packages
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update -y
sudo apt-get install -y kubelet="1.29.0-*" kubectl="1.29.0-*" kubeadm="1.29.0-*"
sudo apt-get update -y
sudo apt-get install -y jq

sudo systemctl enable --now kubelet
sudo systemctl start kubelet
```

---

## Now execute only on MASTER node-

1. Initialize Kubernetes control-plane on Linux with administrative privileges.

```bash
sudo kubeadm init
```

 **Troubleshoot-**

   - When running `sudo kubeadm init`, you might encounter pre-flight errors related to insufficient CPU and RAM. Below are the commands to troubleshoot and potentially bypass these errors:

      ```bash
       sudo kubeadm init --ignore-preflight-errors=NumCPU,Mem
      ```

2. Create Kubernetes config directory, copy admin config, and set correct permissions.
   
```bash
mkdir -p "$HOME"/.kube
sudo cp -i /etc/kubernetes/admin.conf "$HOME"/.kube/config
sudo chown "$(id -u)":"$(id -g)" "$HOME"/.kube/config
```

3. Apply Calico networking to Kubernetes cluster using manifest from GitHub.
   
```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/calico.yaml
```

4. Generate and print a token join command for adding nodes to Kubernetes.
   
```bash
kubeadm token create --print-join-command
```

> [!NOTE]
> After running the above command, you will receive a kubeadm token. Copy it and paste it on the Worker node.

---

## Now execute only on WORKER node-

- Perform pre-flight checks for `kubeadm reset` with administrative privileges.

 ```bash
     sudo kubeadm reset pre-flight checks
  ```

- Now paste the token that you copied from the MASTER node, but before the token, don't forget to add sudo.

  ```bash
  sudo <your-token-from-master> --v=5
  ```

> [!NOTE]
> append `--v=5` at the end of your token.

***Using all these processes, you will successfully install Kubernetes. Now you can enjoy using Kubernetes, and if you are facing any issues, please don't hesitate to ask me. You can connect with me on-***

- [LinkedIN](https://linkedin.com/in/md-azfar-alam)
- [Discord](https://discordapp.com/users/877531143610708028)
- [Mail Me](mailto:azfaralam.ops@gmail.com)

    - Let's dive into Kubernetes together and empower your containerized applications!

**Happy Kubernetizing**! 🔥
