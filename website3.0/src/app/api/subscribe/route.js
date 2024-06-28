import NewsLetterSubscribe from "@utils/models/newslettersub"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  
  const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
  const MONGO_URI_NEWSLETTER = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.iol43dc.mongodb.net/Newsletter?retryWrites=true&w=majority&appName=Cluster0`;
  const validApiKey = process.env.DB_KEY;

  if (apiKey === validApiKey) {
    let data = []; // Initialize variable to store fetched data
    console.log("GET");
    try {
      // Connect to MongoDB using Mongoose
      await mongoose.connect(MONGO_URI_NEWSLETTER);

      // Fetch all newsletter subscription records
      data = await NewsLetterSubscribe.find();
    } catch (error) {
      // If an error occurs during database connection or query, return error response
      data = { success: false };
    }

    // Return fetched data as JSON response
    return NextResponse.json({ result: data });
  } else {
    const msg = "Unauthorized Access";
    return NextResponse.json({ result: msg });
  }
}
// POST endpoint to handle new newsletter subscriptions
export async function POST(req) {
  // Parse JSON payload(email) from request body
  const { email } = await req.json();

  // Connect to MongoDB using Mongoose
  try {
    const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
    const MONGO_URI_NEWSLETTER = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.iol43dc.mongodb.net/Newsletter?retryWrites=true&w=majority&appName=Cluster0`;
  
    await mongoose.connect(MONGO_URI_NEWSLETTER);
    // Check if user already exists
    let user = await NewsLetterSubscribe.findOne({ email });

    if (user) {
      console.log("user exists");
      return NextResponse.json({
        success: false,
        message: "User already subscribed",
      });
    } else {
      // Create a new instance of NewsLetterSubscribe model with the received payload
      let subscribe = new NewsLetterSubscribe({ email });
      // Save the new subscription record to MongoDB
      let result = await subscribe.save();

      // Set up Nodemailer transporter
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_APP_PASS,
        },
      });

      // Set up email options
      let mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: "Welcome to HelpOps-Hub Community!",
        html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width, initial-scale=1" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta content="telephone=no" name="format-detection">
                        <title>Welcome to HelpOps-Hub Community!</title>
                        <style>
                        /* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
                        /*
                        END OF IMPORTANT
                        */
                        @media only screen and (max-width: 600px) {
                        .es-text-7586,
                        .es-text-7586 p,
                        .es-text-7586 a,
                        .es-text-7586 h1,
                        .es-text-7586 h2,
                        .es-text-7586 h3,
                        .es-text-7586 h4,
                        .es-text-7586 h5,
                        .es-text-7586 h6,
                        .es-text-7586 ul,
                        .es-text-7586 ol,
                        .es-text-7586 li,
                        .es-text-7586 span,
                        .es-text-7586 sup,
                        .es-text-7586 sub,
                        .es-text-7586 u,
                        .es-text-7586 b,
                        .es-text-7586 strong,
                        .es-text-7586 em,
                        .es-text-7586 i {
                            font-size: 18px !important;
                        }
                        }
                        </style>
                        <!--[if (mso 16)]>
                            <style type="text/css">
                                a {text-decoration: none;}
                            </style>
                            <![endif]-->
                        <!--[if gte mso 9]>
                            <style>sup { font-size: 100% !important; }</style>
                            <![endif]-->
                        <!--[if gte mso 9]>
                            <xml>
                                <o:OfficeDocumentSettings>
                                    <o:AllowPNG></o:AllowPNG>
                                    <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                            </xml>
                            <![endif]-->
                        
                        <!--[if mso]>
                        <style type="text/css">
                            ul {
                        margin: 0 !important;
                        }
                        ol {
                        margin: 0 !important;
                        }
                        li {
                        margin-left: 47px !important;
                        }

                        </style><![endif]
                        --></head>

                        <body class="body">
                        <span class="esd-hidden-preheader" style="display:none!important;font-size:0px;line-height:0;color:#ffffff;visibility:hidden;opacity:0;height:0;width:0;mso-hide:all;">Ensuring you never get stuck in DevOps again</span>
                        <div dir="ltr" class="es-wrapper-color">
                            <!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile"  color="#666666" origin="0.5, 0" position="0.5, 0"></v:fill>
                        </v:background>
                        <![endif]-->
                            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                <td class="esd-email-paddings" valign="top">


                                    <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                        <td class="esd-stripe" align="center" bgcolor="#efefef" style="background-color:#efefef">
                                            <table class="es-footer-body" width="665" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center" style="background-color:transparent">
                                            <tbody>
                                                <tr>
                                                <td class="esd-structure es-p20t es-p20r es-p10b es-p20l" align="left">
                                                    <table cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr>

                                                        <td width="625" class="esd-container-frame" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                <td align="center" class="esd-block-image" style="font-size: 0">
                                                                    <a target="_blank" href="https://www.helpopshub.com/">
                                                                    <img src="https://ehnrnnn.stripocdn.email/content/guids/CABINET_cfd4cffb74a4582e044fa6c86dedb84b4fb21e4a1102912cafff00916c629f49/images/hub.png" alt="HelpOps-Hub" width="625" class="adapt-img" title="HelpOps-Hub">
                                                                    </a>
                                                                </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>


                                                        </tr>

                                                    </tbody>
                                                    </table>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td class="esd-structure es-p20t es-p20r es-p10b es-p20l" align="left">
                                                    <table cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr>

                                                        <td width="625" class="esd-container-frame" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                <td align="left" class="esd-block-text es-text-7586">
                                                                    <h4 style="color:#333333" align="center">Welcome to Help​Ops-Hub Community!
                                                                    </h4>
                                                                </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>


                                                        </tr>

                                                    </tbody>
                                                    </table>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td class="esd-structure es-p20t es-p20r es-p30l" align="left">
                                                    <table cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr>

                                                        <td width="615" class="esd-container-frame" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                <td align="left" class="esd-block-text es-p10l">
                                                                    <p style="color:#333333" align="left">Hi Subscriber,</p><p style="color:#333333" align="left">​</p>
                                                                    
                                                                    <p style="color:#333333" align="left">Thank you for subscribing to the HelpOps-Hub
                                                                    Newsletter!🎉 &nbsp;We’re thrilled to have you join our community of
                                                                    DevOps professionals and enthusiasts.</p>
                                                                    
                                                                    <p style="color:#333333" align="left">As a subscriber, you'll receive:</p><p style="color:#333333" align="left">​</p>
                                                                    
                                                                    <p style="color:#333333" align="left">𝐄𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐞 𝐔𝐩𝐝𝐚𝐭𝐞𝐬: Stay informed
                                                                    about the latest trends, tools, and best practices in the DevOps world.</p><p style="color:#333333" align="left">​</p><p style="color:#333333" align="left">
                                                                    </p>
                                                                    
                                                                    <p style="color:#333333" align="left">𝐈𝐧-𝐃𝐞𝐩𝐭𝐡 𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥𝐬 𝐚𝐧𝐝
                                                                    𝐆𝐮𝐢𝐝𝐞𝐬: Get access to detailed tutorials and guides to help you
                                                                    master various DevOps tools and technologies.</p><p style="color:#333333" align="left">​</p>
                                                                    
                                                                    <p style="color:#333333" align="left">𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐇𝐢𝐠𝐡𝐥𝐢𝐠𝐡𝐭𝐬: Learn from
                                                                    real-world case studies and success stories shared by industry experts.</p><p style="color:#333333" align="left">​</p><p style="color:#333333" align="left">
                                                                    </p>
                                                                    
                                                                    <p style="color:#333333" align="left">We’re committed to providing you with valuable
                                                                    content that helps you navigate and excel in your DevOps journey.&nbsp;</p><p style="color:#333333" align="left">​</p><p style="color:#333333" align="left">
                                                                    </p>
                                                                    <p style="color:#333333" align="left">If you have any questions or topics you'd like us
                                                                    to cover, feel free to reach out. We value your input and look forward to
                                                                    growing together!</p>
                                                                    
                                                                    <p style="color:#333333" align="left">Stay tuned for our next update!</p><p style="color:#333333" align="left">​</p>
                                                                    
                                                                    <p style="color:#333333" align="left">Best regards,
                                                                    &nbsp;</p>
                                                                    <p style="color:#333333" align="left">The HelpOps-Hub Team 🚀&nbsp;</p>
                                                                </td>
                                                                </tr><tr>
                                                                <td align="center" class="esd-block-social" style="font-size:0">
                                                                    <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                    <tbody>
                                                                        <tr>
                                                                        <td align="center" valign="top" class="es-p10r">
                                                                            <a target="_blank" href="https://github.com/mdazfar2/HelpOps-Hub"><img title="GitHub" src="https://ehnrnnn.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png" alt="GitHub" width="32" height="32"></a>
                                                                        </td>
                                                                        <td align="center" valign="top" class="es-p10r">
                                                                            <a target="_blank" href="https://linkedin.com/company/HelpOps-Hub/"><img title="Linkedin" src="https://ehnrnnn.stripocdn.email/content/assets/img/social-icons/logo-colored/linkedin-logo-colored.png" alt="In" width="32" height="32"></a>
                                                                        </td>
                                                                        <td align="center" valign="top">
                                                                            <a target="_blank" href="https://discord.gg/UWTrRhqywt"><img title="Discord" src="https://ehnrnnn.stripocdn.email/content/assets/img/messenger-icons/logo-colored/discort-logo-colored.png" alt="Discord" width="32" height="32"></a>
                                                                        </td>
                                                                        </tr>
                                                                    </tbody>
                                                                    </table>
                                                                </td>
                                                                </tr><tr>
                                    <td align="left" class="esd-block-text">
                                        <p align="center">© HelpOps-Hub</p>
                                    </td>
                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>


                                                        </tr>

                                                    </tbody>
                                                    </table>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td class="esd-structure es-p20t es-p20r es-p10b es-p20l" align="left">
                                                    <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                    <tbody>
                                                        <tr>
                                                        <td class="esd-container-frame" width="625" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr><td align="center" class="esd-empty-container" style="display: none"></td></tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                    </table>



                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                        </body></html>`,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log("Email sent!!");

      // Return success response with saved subscription details
      return NextResponse.json({ result, success: true });
    }
  } catch (error) {
    console.error("Error occurred : " + error);
    return NextResponse.json({
      success: false,
      message: "An error occurred",
    });
  } finally {
    mongoose.connection.close();
  }
}
