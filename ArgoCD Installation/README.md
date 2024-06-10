# Installing ArgoCD in the Kubernetes Cluster

Once the cluster is running, you can install ArgoCD inside the cluster. You will use ArgoCD for deploying your application.

## To install ArgoCD, use these commands:

1. Firstly, create a new namespace named `argocd` in the Kubernetes cluster for managing resources related to ArgoCD.

   ```bash
   kubectl create namespace argocd
   ```

2. Now deploy ArgoCD to the `argocd` namespace using the installation manifest from the specified URL.

   ```bash
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```

3. ArgoCD will be installed in the `argocd` namespace. To get all the resources in the namespace, use the command below:

   ```bash
   kubectl get all --namespace argocd
   ```

4. Now check the service of ArgoCD:

   ```bash
   kubectl get svc -n argocd
   ```

   Here, in the screenshot below, you can see the main `argocd-server`. You need to expose this to `NodePort`.

   ![service screenshot](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/7e8b8790-8418-4586-b473-27dd746aad82)

5. Edit the service of `argocd-server` and replace type `ClusterIP` with `NodePort`:

   ```bash
   kubectl edit svc argocd-server -n argocd
   ```

   You should write it as shown in the screenshot below and then save.

   ![nodeport screenshot](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/dbed61fd-788d-4ae4-99ed-348f16b18863)

   - If you deploy it using AKS or EKS, you must set the type to `LoadBalancer`.

6. Now, run the service command again to check the exposed port:

   ```bash
   kubectl get svc -n argocd
   ```

   Here you will find the exposed port, as seen in the screenshot below.

   ![Exposed port](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/b73c4912-9732-4634-a89e-6d483367619b)

7. Now copy that port and paste it in your browser via `<Public-IP:32236>`. Press Enter, and you will see the ArgoCD dashboard.

8. Enter `admin` in the username field. For the password, use the command below:

   ```bash
   kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
   ```

9. Copy that password and paste it in the password section in your browser.

**Now enjoy your ArgoCD journey deploying using different web or anything you want. ✨**

---
