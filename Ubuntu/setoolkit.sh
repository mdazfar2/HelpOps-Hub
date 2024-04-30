#!/bin/bash
sudo apt update
sudo apt install -y git python3-pip python3-tk xterm
git clone https://github.com/trustedsec/social-engineer-toolkit.git
cd social-engineer-toolkit
sudo python3 setup.py install
sudo setoolkit
