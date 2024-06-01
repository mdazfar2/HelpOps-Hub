# How can I automate the transfer of code from an EC2 instance to an S3 bucket and then download it to my local machine without using `scp` or `GitHub`?

In this directory, you'll find a comprehensive strategy to automate the process of transferring code from an EC2 instance to an S3 bucket, and subsequently downloading it to your local machine. This approach leverages AWS Lambda and AWS CLI for seamless code synchronization and transfer, eliminating the need for traditional methods like `scp` or GitHub. Explore the scripts and documentation provided to streamline your workflow and enhance your cloud automation practices.

## Prerequisites
- An AWS account with appropriate permissions to create and manage EC2, S3, and Lambda resources.
- AWS CLI installed and configured on your local machine.
- Basic knowledge of AWS services.

- Suppose you write your code directly in the terminal of your EC2 instance and want to download it to your local machine.

  <br/>
  
![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/8074d817-93c8-47af-82c5-4b6ae0fbff05)

<br/>

![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/d84b47c6-bae3-47bc-9995-eb3505d10f51)


>  here in the above you can see that there are terraform file in our ec2 terminal we are download it to local machine.


## Step 1 
  - Create IAM and give full access to `ec2` and `s3`

    <br/>
    
    ![IAM Full Access](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/36030a26-7166-4cc3-b9b0-a9008692f718)

   - & then create next and create user

## Step 2

   -  now install `aws configure` in your terminal using these commands 

  ```bash
     sudo apt install unzip -y
     curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
     unzip awscliv2.zip
     sudo ./aws/install
   ```
   - Check whether It is installed or not

     ```bash
     aws --version
     ```
     <br/>

     ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/be610f12-e49f-4301-a545-1d6111705534)


## Step 3

   - Create S3 bucket and `block all public access` 

     <br/>

     ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/0efab427-e4a5-44e7-b484-4547436a3a8c)

   - And then create a folder inside the S3 bucket because we have more code files downloading the whole folder of uploaded codes from EC2.

     <br/>

     ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/6d0c6eb7-1fe2-46c3-9da6-c6dcfce61f25)

## Step 4

   - Now Open your Ec2 Terminal and configure the AWS CLI

     ```bash
      aws configure
     ```

<br/>
   
   ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/0ccb3da5-e3e4-4413-a558-254daa4ce749)

## Step 5

   - Now Sync the command for transfer whole file to the s3 bucket-

     ```bash
     aws s3 sync Terraform_file/ s3://helpops-hub/terraform-files
     ```

     <br/>

     ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/a233fec9-aef7-4bd5-960b-f42a7735d86a)

   - Here you can see that three files are uploaded to the S3 bucket. Now, go and check the S3 bucket to see whether the files are available or not.

   - <br/>

     ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/ad96073a-64b3-4684-9b53-035701fc2222)

   - Move to that folder

     <br/>

   ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/bbb653f4-9164-4bc9-9a18-fc2015f4e445)

   - Here you can see that the file is available to the s3 bucket

## Step 6

   - Now configure AWS on your local machine
    
   <br/>
    
   ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/9638110d-74f7-4dec-8653-a7eeeb7b36ed)

   - Now download the whole file to the local machine using this command

     ```bash
     aws s3 cp s3://azfar-terraform D:\Downloads --recursive
     ```

   ![image](https://github.com/mdazfar2/HelpOps-Hub/assets/100375390/9ab84254-c3d2-468a-8328-2345d76dd38d)

   ***now when you go to that file you will find the whole files which you are uploaded***

## Conclusion

By following these steps, you have automated the process of transferring code from an EC2 instance to an S3 bucket and downloading it to your local machine without using `scp` or `GitHub`. This setup leverages AWS Lambda for automation and AWS CLI for syncing and downloading code.
   






     


    
    
