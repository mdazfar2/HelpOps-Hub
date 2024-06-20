# Kubernetes Commands Cheat Sheet

Welcome to the Kubernetes Commands Cheat Sheet! This guide provides a comprehensive list of essential Kubernetes commands, detailed descriptions, and practical examples to help you efficiently manage your Kubernetes clusters.

## Table of Contents
1. [Pod Management](#pod-management)
2. [Deployment Management](#deployment-management)
3. [Service Management](#service-management)
4. [Namespace Management](#namespace-management)
5. [ConfigMap and Secret Management](#configmap-and-secret-management)
6. [Node Management](#node-management)
7. [Cluster Information](#cluster-information)
8. [Logs and Debugging](#logs-and-debugging)


## Pod Management

- #### Create a Pod

```bash
kubectl run my-pod --image=my-image
```
*Creates a pod named `my-pod` using the specified Docker image `my-image`.*

- #### List All Pods

```bash
kubectl get pods
```
*Lists all pods in the current namespace.*

- #### Describe a Pod

```bash
kubectl describe pod my-pod
```
*Displays detailed information about the pod named `my-pod`.*

- #### Delete a Pod

```bash
kubectl delete pod my-pod
```
*Deletes the pod named `my-pod`.*



## Deployment Management

- #### Create a Deployment

```bash
kubectl create deployment my-deployment --image=my-image
```
*Creates a deployment named `my-deployment` with the specified Docker image `my-image`.*

- #### List All Deployments

```bash
kubectl get deployments
```
*Lists all deployments in the current namespace.*

- #### Scale a Deployment

```bash
kubectl scale deployment my-deployment --replicas=3
```
*Scales the deployment named `my-deployment` to 3 replicas.*

- #### Update a Deployment

```bash
kubectl set image deployment/my-deployment my-container=my-image:v2
```
*Updates the image of the container named `my-container` in the deployment `my-deployment` to `my-image:v2`.*

- #### Delete a Deployment

```bash
kubectl delete deployment my-deployment
```
*Deletes the deployment named `my-deployment`.*


## Service Management

- #### Create a Service

```bash
kubectl expose deployment my-deployment --type=LoadBalancer --port=80
```
*Exposes a deployment named `my-deployment` as a service on port 80 with a LoadBalancer type.*

- #### List All Services

```bash
kubectl get services
```
*Lists all services in the current namespace.*

- #### Describe a Service

```bash
kubectl describe service my-service
```
*Displays detailed information about the service named `my-service`.*

- #### Delete a Service

```bash
kubectl delete service my-service
```
*Deletes the service named `my-service`.*



## Namespace Management

- #### Create a Namespace

```bash
kubectl create namespace my-namespace
```
*Creates a namespace named `my-namespace`.*

- #### List All Namespaces

```bash
kubectl get namespaces
```
*Lists all namespaces.*

- #### Switch Namespace

```bash
kubectl config set-context --current --namespace=my-namespace
```
*Switches the current context to use `my-namespace`.*

- #### Delete a Namespace

```bash
kubectl delete namespace my-namespace
```
*Deletes the namespace named `my-namespace`.*



## ConfigMap and Secret Management

- #### Create a ConfigMap

```bash
kubectl create configmap my-config --from-literal=key1=value1 --from-literal=key2=value2
```
*Creates a ConfigMap named `my-config` with the specified key-value pairs.*

- #### List All ConfigMaps

```bash
kubectl get configmaps
```
*Lists all ConfigMaps in the current namespace.*

- #### Describe a ConfigMap

```bash
kubectl describe configmap my-config
```
*Displays detailed information about the ConfigMap named `my-config`.*

- #### Delete a ConfigMap

```bash
kubectl delete configmap my-config
```
*Deletes the ConfigMap named `my-config`.*

- #### Create a Secret

```bash
kubectl create secret generic my-secret --from-literal=key1=value1 --from-literal=key2=value2
```
*Creates a Secret named `my-secret` with the specified key-value pairs.*

- #### List All Secrets

```bash
kubectl get secrets
```
*Lists all Secrets in the current namespace.*

- #### Describe a Secret

```bash
kubectl describe secret my-secret
```
*Displays detailed information about the Secret named `my-secret`.*

- #### Delete a Secret

```bash
kubectl delete secret my-secret
```
*Deletes the Secret named `my-secret`.*


## Node Management

- #### List All Nodes

```bash
kubectl get nodes
```
*Lists all nodes in the cluster.*

- #### Describe a Node

```bash
kubectl describe node my-node
```
*Displays detailed information about the node named `my-node`.*

- #### Cordon a Node

```bash
kubectl cordon my-node
```
*Marks the node named `my-node` as unschedulable.*

- #### Drain a Node

```bash
kubectl drain my-node --ignore-daemonsets
```
*Safely evicts all pods from the node named `my-node`.*

- #### Uncordon a Node

```bash
kubectl uncordon my-node
```
*Makes the node named `my-node` schedulable again.*


## Cluster Information

- #### View Cluster Info

```bash
kubectl cluster-info
```
*Displays information about the cluster.*

- #### Get API Resources

```bash
kubectl api-resources
```
*Lists all API resources available in the cluster.*

- #### Get Cluster Events

```bash
kubectl get events
```
*Lists all events in the cluster.*


## Logs and Debugging

- #### View Pod Logs

```bash
kubectl logs my-pod
```
*Displays the logs for the pod named `my-pod`.*

- #### Stream Pod Logs

```bash
kubectl logs -f my-pod
```
*Streams the logs for the pod named `my-pod`.*

- #### Execute a Command in a Pod

```bash
kubectl exec -it my-pod -- /bin/bash
```
*Executes a command in the pod named `my-pod`.*

- #### Port Forwarding

```bash
kubectl port-forward my-pod 8080:80
```
*Forwards port 8080 on your local machine to port 80 on the pod named `my-pod`.*


This Kubernetes cheat sheet provides a handy reference to help you manage your Kubernetes clusters effectively. 
For more detailed information, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/home/).
