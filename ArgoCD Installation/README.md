# Installing ArgoCD in the AKS Cluster
Once the cluster is running, you can install ArgoCD inside the cluster. You will use ArgoCD for deploying your application.

## To install ArgoCD, use these commands

1. Firstly create a new namespace named `argocd` in the Kubernetes cluster for managing resources related to ArgoCD.

   ```bash
    kubectl create namespace argocd
   ```
3. Now deploy ArgoCD to the `argocd` namespace using the installation manifest from the specified URL.
   ```bash
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```
4. ArgoCD will be installed in the `argocd` namespace. To get all the resources in the namespace use the below command
   ```bash
    kubectl get all --namespace argocd
   ```
5. 

