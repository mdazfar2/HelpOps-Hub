# How to Add SSL and Connect a Custom Domain to Your Public IP? 🔒

Securing your public IP with SSL and linking it to a custom domain enhances security and professionalism. Follow this easy step-by-step guide to achieve it with **Let's Encrypt** and **Certbot**.

## 📌 What You’ll Need
- **A Public IP Address** (e.g., `13.232.107.219`).-
- **A Domain Name** (e.g., `yourdomain.com`).
- **Apache Installed** on your server.
- **SSH Access** to your server.
- **DNS Access** to configure your domain.


## 🚀 Step-by-Step Guide

## Step 1

   - DNS Record Setup
      - For your domain (yourdomain.com), you can only use the **IP address** in the DNS settings. Port numbers cannot be included in DNS records. DNS records only map domain names to IP addresses.

   - Here’s how your DNS records should look:

<br/>

![{3E4AC3B6-7CD9-4149-A27A-B769F800169C}](https://github.com/user-attachments/assets/5caa08dd-1f4c-402f-8d1b-bb8c83a8bb46)

<br>

   - You must have to add DNS records which write "A" on Type, "@" on Name and you have to write your IP address on "value" and click on "Save" button.


## Step 2

   - Open your Terminal and Install Required Modules:


  ```bash
  sudo a2enmod proxy
  sudo a2enmod proxy_http
  sudo systemctl restart apache2
  ```

## Step 3

   - Update Virtual Host File:
     
**Create or edit the Apache configuration file for your domain:**

<br/>

  ```bash
  vim /etc/apache2/sites-available/yourdomain.com.conf
  ```

<br/>

 - Instead of `yourdomain.com`, you have to enter your own domain that you purchased or currently own.

## Step 4

   - Now, Add the following configuration:

  ```bash
  <VirtualHost *:80>
    ServerName yourdomain.com

    ProxyPreserveHost On
    ProxyPass / http://ur_public_ip:port/
    ProxyPassReverse / http://ur_public_ip:port/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
  </VirtualHost>
```

<br/>

  - **Check out the image below for reference. You need to paste and edit your domain and public IP, something like that.** 👇🏼

    <br/>

![image](https://github.com/user-attachments/assets/ea794cc0-baf5-4bca-a4d0-5564d77b6e78)

<br/>


## Step 5

   - Enable the Site and Reload Apache:

  ```bash
  sudo a2ensite yourdomain.com.conf
  sudo systemctl reload apache2
  ```
  - Here instead of "yourdomain.com" you have to write your own domain.

## Step 6

   - Run Certbot (After setting up DNS and Apache, run Certbot to issue the SSL certificate)

  ```bash
  sudo certbot --apache -d yourdomain.com -n --agree-tos --email azfaralam.ops@gmail.com
```

   - Here, you will enter your domain and the email at the above command associated with the domain purchase or the email where your domain is registered and then `Enter`.

## 💡 Conclusion

🎉 Congratulations! You’ve successfully secured your website with SSL and linked it to a custom domain. 

- After all this, if your website is not live on the custom domain (yourdomain.com), don't worry. It takes some time to propagate worldwide. Make sure to wait for about half an hour to an hour, and your website should be live on your custom domain. 😊





 




