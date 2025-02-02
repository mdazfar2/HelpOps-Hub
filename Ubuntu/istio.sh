#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Download and install Istio
echo "Downloading and installing Istio..."
curl -L https://istio.io/downloadIstio | sh -

# Navigate to the Istio directory
ISTIO_VERSION=$(ls | grep istio-)
cd "$ISTIO_VERSION"

# Add Istioctl to the system PATH
export PATH=$PWD/bin:$PATH
echo "export PATH=\$PWD/bin:\$PATH" >> ~/.bashrc
source ~/.bashrc

# Install Istio using the demo profile without gateways
echo "Installing Istio..."
istioctl install -f samples/bookinfo/demo-profile-no-gateways.yaml -y

# Enable automatic sidecar injection for the default namespace
kubectl label namespace default istio-injection=enabled --overwrite

echo "Istio installation and setup completed successfully!"
