# Installing ArgoCD in the Kubernetes Cluster
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
5. Now see the service of the argocd
   
   ```bash
   kubectl get svc -n argocd
   ```
     Here in the below screenshot you can see the main argocd-server and then you have to expose this to `NodePort` 👇
   <br/>
   
![image](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/7e8b8790-8418-4586-b473-27dd746aad82)

6. No go the edit service of 'argocd-server' and replace type 'ClusterIP' to 'NodePort'
   ```bash
    kubectl edit svc argocd-server -n argocd
   ```
     You have to write it as written in the screenshot and then save. 👇
   <br/>

![image](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/dbed61fd-788d-4ae4-99ed-348f16b18863)
   <br/>
   
      > If you deploy it using AKS or Eks then you must have to write `LoadBalancer`.

8. Now again run the service command for checking the exposed Port
   ```bash
    kubectl get svc -n argocd
   ```
     Here you will find the exposed port as seen in the screenshot below.
   <br/>

![image](https://github.com/mdazfar2/ShellScript-Toolkit/assets/100375390/b73c4912-9732-4634-a89e-6d483367619b)

9. Now Copy that Port and paste it via your `<Public-IP:32236>`  & then Enter you will get ArgoCD dashboard
10. Enter `admin` in username and for password use the below command-
    ```bash
     kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
    ```
11. Copy that password and paste it via browser on `password` section.

**Now enjoy your ArgoCD journey deploying using different web or anything you want. ✨**
   

