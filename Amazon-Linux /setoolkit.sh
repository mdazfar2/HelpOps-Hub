#!/bin/bash
sudo yum update -y
sudo yum install -y git python3 python3-pip
git clone https://github.com/trustedsec/social-engineer-toolkit.git
cd social-engineer-toolkit
sudo pip3 install -r requirements.txt
sudo python3 setup.py install
sudo ln -s /usr/share/setoolkit/setoolkit /usr/bin/setoolkit
sudo setoolkit
