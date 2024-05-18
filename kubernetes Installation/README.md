# Installation Guide-

Whether you're new to Kubernetes or looking to deploy it on your Ubuntu EC2 instances, this comprehensive k8s-install.md file has you covered with clear, step-by-step instructions.

## Pre-requisites

- Ubuntu OS (Xenial or later)
- sudo privileges
- Internet access
- t2.medium instance type or higher

---

## Execute all the command step by step
1. Firstly updates the list of available packages and their versions on your Ubuntu system.
   
   ```bash
    sudo apt-get update
   ```
3. Now installs necessary packages for secure APT operations, including HTTPS support and certificate handling.
    ```bash
      sudo apt-get install -y apt-transport-https ca-certificates curl gpg
    ```
4. Download the public signing key for the Kubernetes package repositories.
    ```bash
      curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
    ```
5. Adding the Kubernetes repository to your APT sources list, enabling access to Kubernetes packages.
    ```bash
     echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
    ```
6. Now, update the apt packages, install kubelet, kubeadm and kubectl, and enable the kubelet.
    ```bash
      sudo apt-get update
      sudo apt-get install -y kubelet kubeadm kubectl
      sudo apt-mark hold kubelet kubeadm kubectl
      sudo systemctl enable --now kubelet
   ```
7. Create a configuration file to enable IPv4 packet forwarding, necessary for Kubernetes networking.
    ```bash
      cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
      net.ipv4.ip_forward = 1
      EOF
    ```
8. Now reload the system configuration files to apply new settings, including kernel parameters.
    ```bash
     sudo sysctl --system
    ```

# Install CRI-O for Kubernetes
## To install CRI-O, a lightweight container runtime, for Kubernetes, follow these steps:

1. Save the GPG key for the CRI-O repository to verify package integrity.

   ```bash
    sudo curl -fsSL https://pkgs.k8s.io/addons:/cri-o:/prerelease:/main/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/cri-o-apt-keyring.gpg
   ```
2. Now adding the CRI-O repository to your APT sources list, allowing access to CRI-O packages.
    ```bash
     echo "deb [signed-by=/etc/apt/keyrings/cri-o-apt-keyring.gpg] https://pkgs.k8s.io/addons:/cri-o:/prerelease:/main/deb/ /" | sudo tee /etc/apt/sources.list.d/cri-o.list   
   ```
3. Update package lists, install CRI-O, reload the systemd daemon, and enable and start CRI-O.
   ```bash
    sudo apt-get update -y
    sudo apt-get install -y cri-o
    sudo systemctl daemon-reload
    sudo systemctl enable crio --now
   ```

  ## Now Initialize the Kubernetes cluster

  1. Pull the necessary images:

     ```bash
      sudo kubeadm config images pull
     ```
  2. Initialize the kubernetes cluster
     ```bash
     sudo kubeadm init
     ```
      ### Troubleshoot-
      If you facing issue while running `sudo kubeadm init` related this-
       > [init] Using Kubernetes version: v1.30.1
[preflight] Running pre-flight checks
error execution phase preflight: [preflight] Some fatal errors occurred:
        [ERROR FileContent--proc-sys-net-ipv4-ip_forward]: /proc/sys/net/ipv4/ip_forward contents are not set to 1
[preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`
To see the stack trace of this error execute with --v=5 or higher

      **Then you must have to use the below command-**

        ```bash
         sudo sysctl net.ipv4.ip_forward=1
        ```   
     
  4. To set up kubeconfig for managing the Kubernetes cluster, run the following commands which helps in enabling you to use kubectl to manage your cluster.
     ```bash
     mkdir -p $HOME/.kube
     sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
     sudo chown $(id -u):$(id -g) $HOME/.kube/config
     ```
  5. Sets the environment variable KUBECONFIG to the Kubernetes admin configuration file for cluster management.
     ```bash
      export KUBECONFIG=/etc/kubernetes/admin.conf
     ```
  6. Now, change the permissions of the Kubernetes admin configuration file to read-only for the owner and group.
     ```bash
      sudo chmod 644 /etc/kubernetes/admin.conf
     ```
  7. Now, check if the Kubernetes cluster is running or not.
     ```bash
      kubectl get pods
     ```
     The result will shown like that-
     <br/>
     
     ![image](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/0048afea-ffd5-45f2-80a5-ab6962ccdd2d)

  8. Now, apply the Calico networking manifest from a URL to the Kubernetes cluster for network configuration.
     
     ```bash
      kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/calico.yaml
     ```
  9. The below command taints all nodes with the "control-plane" role to prevent regular pods from being scheduled on them.
     ```bash
     kubectl taint nodes --all node-role.kubernetes.io/control-plane-
     ```
     <br/>
***Using all these processes, you will successfully install Kubernetes. Now you can enjoy using Kubernetes, and if you are facing any issues, please don't hesitate to ask me. You can connect with me on-***

- [LinkedIN](https://linkedin.com/in/md-azfar-alam)
- [Discord](https://discordapp.com/users/877531143610708028)
- [Mail Me](mailto:azfaralam.ops@gmail.com)

    - Let's dive into Kubernetes together and empower your containerized applications!

**Happy Kubernetizing**! 🔥
