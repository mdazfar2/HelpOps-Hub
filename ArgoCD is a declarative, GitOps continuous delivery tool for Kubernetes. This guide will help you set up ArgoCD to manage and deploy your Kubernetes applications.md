# *"Setting Up Continuous Deployment with ArgoCD on Kubernetes"*

---

## Setting Up Continuous Deployment with ArgoCD on Kubernetes
ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. This guide will help you set up ArgoCD to manage and deploy your Kubernetes applications.

### Pre-requisites
- Kubernetes cluster (minikube, EKS, GKE, etc.)
- kubectl installed
- Helm installed
- Git repository containing your Kubernetes manifests

### Install ArgoCD

**Step 1: Create a namespace for ArgoCD**

```bash
kubectl create namespace argocd
```

**Step 2: Install ArgoCD using kubectl**

```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Access the ArgoCD API Server

**Step 1: Forward the ArgoCD server port**

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

**Step 2: Get the initial admin password**

```bash
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | \
  cut -d'/' -f 2 | \
  xargs -I {} kubectl get pod {} -n argocd -o jsonpath="{.status.phase}"
```

### Login to ArgoCD

- Open a web browser and go to `https://localhost:8080`.
- Login with the username `admin` and the password you retrieved in the previous step.

### Connect Your Git Repository

**Step 1: Add a new repository in ArgoCD**

- Go to the ArgoCD UI.
- Navigate to `Settings > Repositories`.
- Click on `Connect Repo using HTTPS/SSH`.

**Step 2: Provide repository details**

- Enter your repository URL.
- Provide the authentication details (username/password or SSH key).

### Create a New Application

**Step 1: Add a new application in ArgoCD**

- Go to the ArgoCD UI.
- Click on `New App`.

**Step 2: Fill in the application details**

- **Application Name**: Your app name.
- **Project**: Default.
- **Sync Policy**: Automatic or Manual.
- **Repository URL**: Your Git repository URL.
- **Revision**: Branch name (e.g., main).
- **Path**: Path to your Kubernetes manifests in the repository.
- **Cluster URL**: https://kubernetes.default.svc (for in-cluster deployment).
- **Namespace**: Namespace where you want to deploy the app.

### Sync and Deploy Your Application

**Step 1: Sync the application**

- Go to the application details page.
- Click on the `Sync` button.

**Step 2: Monitor the deployment**

- Check the application status and logs in the ArgoCD UI.

### Configure Automatic Sync

**Step 1: Edit the application configuration**

- Go to the application details page.
- Click on `App Details > Edit`.

**Step 2: Enable automatic sync**

- Under `Sync Policy`, select `Automatic`.

### Troubleshooting

**Common Issues**

- **Sync failures**: Check the application logs and events for error messages.
- **Authentication issues**: Ensure that the repository URL and credentials are correct.

### Resources

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

By following these steps, you will successfully set up continuous deployment with ArgoCD on Kubernetes. Enjoy automating your application deployments! If you have any questions or face any issues, feel free to reach out to me.

Happy deploying! 🚀

---

Would you like another topic or additional details on this guide?
