# Easy to install SonarQube don't worry-
**You must install `Docker` because we are just running the `sonarqube` container. It is very easy.**

**Use the below command**
```bash
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
```
After run the container Use your `<publicIP:9000>` for sonarqube dashboard and access it via the browser. and enter username admin & password is also admin.

### Congratulation You are successfully install the Sonarqube now used for continuous inspection of code quality and many othe things. ✨

