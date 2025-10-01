<div align="center">

# ⚡ Databricks Setup on AWS EC2

[![AWS](https://img.shields.io/badge/AWS-EC2-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![Spark](https://img.shields.io/badge/Apache-Spark-E25A1C?style=for-the-badge&logo=apache-spark)](https://spark.apache.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python)](https://python.org/)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-F37626?style=for-the-badge&logo=jupyter)](https://jupyter.org/)

*Databricks is a popular platform for **Big Data, Machine Learning, and Analytics**.  
While the official service is cloud-based, you can replicate the **core Databricks environment** (Spark + MLflow + Delta Lake) on an **AWS EC2 instance** for hands-on learning.* 🚀

</div>

---

## 📋 Table of Contents
- [🛠️ Prerequisites](#️-prerequisites)
- [⚡ Installation Guide](#-installation-guide)
- [🎯 What You Get](#-what-you-get)
- [📚 Next Steps](#-next-steps)
- [💡 Benefits](#-benefits)

---

## 🛠️ Prerequisites

| Requirement | Description |
|-------------|-------------|
| 🏗️ **AWS Account** | Active AWS account with EC2 access |
| 💻 **EC2 Instance** | Ubuntu 20.04 LTS (t2.medium or larger) |
| 🔑 **SSH Access** | Basic knowledge of Linux & SSH |
| 🧠 **Knowledge** | Familiarity with command line operations |

---

## ⚡ Installation Guide

### 🚀 Step 1: Launch an EC2 Instance

> **💡 Pro Tip:** Choose the right instance type for your workload!

1. **Navigate to AWS Console** → EC2 → Launch Instance
2. **Select AMI:** Ubuntu 20.04 LTS
3. **Instance Type:** At least `t2.medium` (2 vCPU, 4GB RAM)
4. **Security Group:** Allow SSH (22) and Jupyter (8888)

```bash
# Connect to your instance
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
```

---

### 🔧 Step 2: Update & Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential dependencies
sudo apt install -y openjdk-11-jdk python3-pip git wget

# Verify Java installation
java -version
```

---

### ⚙️ Step 3: Install Apache Spark

```bash
# Download Apache Spark
wget https://downloads.apache.org/spark/spark-3.5.0/spark-3.5.0-bin-hadoop3.tgz

# Extract and move to /opt
tar xvf spark-3.5.0-bin-hadoop3.tgz
sudo mv spark-3.5.0-bin-hadoop3 /opt/spark
```

**Configure Environment Variables:**

```bash
# Add Spark to PATH
echo "export SPARK_HOME=/opt/spark" >> ~/.bashrc
echo "export PATH=$SPARK_HOME/bin:$PATH" >> ~/.bashrc
source ~/.bashrc

# Verify installation
spark-shell --version
```

---

### 📊 Step 4: Install PySpark & Jupyter

```bash
# Install Python packages
pip3 install pyspark notebook pandas mlflow delta-spark
```

---

### 🔬 Step 5: Launch Jupyter Notebook

```bash
# Start Jupyter with external access
jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser
```

**Access your notebook at:**
```
🌐 http://<EC2-PUBLIC-IP>:8888
```

---

### ✅ Step 6: Test Your Setup

Create a new Python notebook and run this test code:

```python
from pyspark.sql import SparkSession

# Initialize Spark with Delta Lake support
spark = SparkSession.builder \
    .appName("EC2-Databricks-Clone") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .getOrCreate()

# Test basic functionality
data = spark.range(0, 10)
data.show()

print("🎉 Success! Your Databricks-like environment is ready!")
```

---

## 🎯 What You Get

<div align="center">

| Feature | Status | Description |
|---------|--------|-------------|
| ⚡ **Apache Spark** | ✅ | Distributed computing engine |
| 🔺 **Delta Lake** | ✅ | ACID transactions for big data |
| 🧪 **MLflow** | ✅ | ML lifecycle management |
| 📊 **Jupyter Notebook** | ✅ | Interactive development environment |
| 🐍 **PySpark** | ✅ | Python API for Spark |

</div>

---

## 📚 Next Steps

### 🚀 Advanced Configurations

```bash
# 1. Integrate with S3 for data storage
# 2. Use Terraform to automate EC2 + Spark setup
# 3. Connect MLflow tracking server to store models in S3
# 4. Set up cluster mode for distributed computing
```

### 🛠️ Recommended Enhancements

- [ ] **S3 Integration** - Store data and models in S3
- [ ] **Infrastructure as Code** - Use Terraform for automation
- [ ] **Monitoring** - Set up CloudWatch for instance monitoring
- [ ] **Security** - Configure VPC and proper IAM roles
- [ ] **Scaling** - Implement auto-scaling groups

---

## 💡 Benefits

<div align="center">

🎯 **Perfect for Learning** • 💰 **Cost Control** • 🔧 **Full Customization** • 🚀 **DevOps Practice**

*This EC2 setup gives you the "Databricks feel" without using the managed workspace.  
Great for practice, DevOps automation, and understanding the underlying infrastructure!*

</div>

---

<div align="center">

**⭐ Star this repo if it helped you!** • **🐛 Report issues** • **🤝 Contribute**

Made with ❤️ by [Azfar](https://www.linkedin.com/in/md-azfar-alam/) for the Data Engineering Community

</div>
