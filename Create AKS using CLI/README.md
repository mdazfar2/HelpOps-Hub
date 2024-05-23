# Creating AKS using cli

**firstly you have to login the azure cli**
   ```bash
    az login
   ```

**Then create resource group before create AKS**
   ```bash
    az group create --name azfarRG --location centralindia
   ```

**Now create AKS**
   ```bash
    az aks create --name azfar-aks --resource-group azfarRG --node-count 1
   ```
> It takes few minutes

