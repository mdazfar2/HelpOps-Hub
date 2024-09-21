import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-blue-100 text-gray-800 p-10 rounded-lg max-w-3xl mx-auto shadow-md">
      {/* Main Heading */}
      <h1 className="text-4xl text-blue-600 mb-8 text-center font-bold">Terms and Conditions</h1>

      {/* Introduction Paragraph */}
      <p className="text-lg leading-8 mb-5">
        These terms and conditions (“Agreement”) set forth the general terms and
        conditions of your use of the
        <a href="https://www.helpopshub.com" className="text-blue-500 font-medium hover:underline">
          helpopshub.com
        </a>{" "}
        website (“Website” or “Service”) and any of its related products and
        services (collectively, “Services”). This Agreement is legally binding
        between you (“User”, “you” or “your”) and this Website operator
        (“Operator”, “we”, “us” or “our”). By accessing and using the Website
        and Services, you acknowledge that you have read, understood, and agree
        to be bound by the terms of this Agreement.
      </p>

      {/* Table of Contents */}
      <div className="mb-10">
        <h2 className="text-2xl text-blue-600 mt-5 text-center font-semibold">Table of Contents</h2>
        <ol className="list-decimal pl-5 text-blue-500 font-medium mt-4">
          {[
            "Accounts and Membership", 
            "User Content", 
            "Backups", 
            "Links to Other Resources", 
            "Prohibited Uses", 
            "Intellectual Property Rights", 
            "Indemnification", 
            "Severability", 
            "Dispute Resolution", 
            "Changes and Amendments", 
            "Acceptance of These Terms", 
            "Contacting Us"
          ].map((item, index) => (
            <li key={index} className="mb-2">
              <a href={`#${item.replace(/\s+/g, '-').toLowerCase()}`} className="hover:underline">
                {item}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Terms Sections */}
      {[
        { title: "Accounts and Membership", content: "If you create an account on the Website, you are responsible for maintaining the security of your account. We may monitor new accounts before use. Providing false contact information may result in termination. We may suspend or delete your account for any violation of these terms." },
        { title: "User Content", content: "You retain ownership of any data you submit on the Website. You are responsible for its accuracy and legality. We may review and moderate content but do not claim ownership of your data." },
        { title: "Backups", content: "We are not responsible for Content on the Website. It is your responsibility to back up your data." },
        { title: "Links to Other Resources", content: "The Website may link to third-party websites. We are not responsible for the content of those websites." },
        { title: "Prohibited Uses", content: "You are prohibited from using the Website for illegal purposes, harassment, uploading viruses, and other harmful activities." },
        { title: "Intellectual Property Rights", content: "The intellectual property on the Website is owned by the Operator. Your use of the Website does not grant any right to use the Operator's trademarks or copyrights." },
        { title: "Indemnification", content: "You agree to indemnify the Operator from any claims or damages resulting from your use of the Website." },
        { title: "Severability", content: "If any part of these terms is found to be invalid, the remaining provisions will continue in effect." },
        { title: "Dispute Resolution", content: "Any disputes arising from these terms will be governed by the laws of the jurisdiction where the Operator is based." },
        { title: "Changes and Amendments", content: "We may modify these terms at any time by updating this page. Continued use of the Website constitutes acceptance of these changes." },
        { title: "Acceptance of These Terms", content: "By using the Website, you agree to these terms. If you do not agree, please discontinue use of the Website." },
        { title: "Contacting Us", content: "If you have any questions, please contact us at: azfaralam.ops@gmail.com" }
      ].map((section, index) => (
        <div key={index} className="mt-10">
          <h2 id={section.title.replace(/\s+/g, '-').toLowerCase()} className="text-2xl text-blue-600 border-b-2 border-gray-300 pb-2 font-semibold">
            {section.title}
          </h2>
          <p className="text-lg leading-8 mb-5">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
