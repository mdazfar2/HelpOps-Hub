# Step by Step Guide for setting up minicube for a small web app

## First lets create a simple python app
Here is a simple Python web app using Flask that can be deployed on a local Minikube cluster:

**app.py**
```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
```
This app has two routes:

1. `/`: returns a simple "Hello, World!" message
2. `/api/data`: returns a JSON response with a message

To deploy this app on a local Minikube cluster, you'll need to:

1. Install Docker and Minikube on your machine refer to [this](https://docs.docker.com/engine/install/) for docker installation and [this](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fdebian+package) for minicube
2. Create a Docker image for your app
3. Deploy the image to a Kubernetes deployment
4. Expose the deployment as a service

Here are the steps:

here is the directory structure;
![image](https://github.com/Raghucharan16/HelpOps-Hub/assets/104614903/76df803c-cf71-40a8-ba69-c582ddba98ab)


**Step 1: Create a Docker image**

Create a file named `Dockerfile` in the same directory as your `app.py` file:
```dockerfile

FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```
This Dockerfile uses the official Python 3.9 image, installs the required dependencies from `requirements.txt`, and sets the command to run the `app.py` file.

**Step 2: Build the Docker image**

Run the following command in your terminal:
```
docker build -t my-flask-app .
```
This will create a Docker image with the tag `my-flask-app`.

After building a docker image, you need to start the minicube on your local machine. It is a basic single cluster configuration which is pretty easy to setup.
 - Set up the minicube on your local machine. hit this [site](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fdebian+package) and get according to your machine 
 - Next Go Ahead and start the service
```
minikube start
```

**Step 3: Deploy the image to a Kubernetes deployment**

Create a file named `deployment.yaml` in the same directory:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-flask-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-flask-app
  template:
    metadata:
      labels:
        app: my-flask-app
    spec:
      containers:
      - name: my-flask-app
        image: my-flask-app
        ports:
        - containerPort: 5000
```
This YAML file defines a Kubernetes deployment that runs a single container from the `my-flask-app` image, exposes port 5000.

**Step 4: Expose the deployment as a service**

Create a file named `service.yaml` in the same directory:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-flask-app
spec:
  selector:
    app: my-flask-app
  ports:
  - name: http
    port: 80
    targetPort: 5000
  type: LoadBalancer
```
This YAML file defines a Kubernetes service that exposes the deployment on port 80, forwarding traffic to port 5000.

**Step 5: Apply the YAML files**

Run the following command in your terminal:
```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
This will create the deployment and service in your local Minikube cluster.

**Step 6: Verify the app**

Run the following command in your terminal:
```
kubectl get svc
```
This will display the service details, including the external IP address.

Open a web browser and navigate to the external IP address to access your Flask app!

## Note: I want to make sure everything is as followed in the above steps and I do want to attach screenshots but 
## I'm on ubuntu 24.01LTS so docker isn't supported on my system as of now. and if any one feel stuck or doesn't understand, feel free to reach me out.
