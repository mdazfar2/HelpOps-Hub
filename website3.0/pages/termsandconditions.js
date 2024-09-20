import React from "react";
import "../stylesheets/TermsAndConditions.css"; // CSS file for custom styling

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="title">Terms and Conditions</h1>
      <p className="text">
        These terms and conditions (“Agreement”) set forth the general terms and
        conditions of your use of the
        <a href="https://www.helpopshub.com" className="link">
           helpopshub.com
        </a>{" "}
        website (“Website” or “Service”) and any of its related products and
        services (collectively, “Services”). This Agreement is legally binding
        between you (“User”, “you” or “your”) and this Website operator
        (“Operator”, “we”, “us” or “our”). By accessing and using the Website
        and Services, you acknowledge that you have read, understood, and agree
        to be bound by the terms of this Agreement.
      </p>

      <div className="toc">
        <h3 className="subtitle">Table of Contents</h3>
        <ol>
          <li>
            <a href="#accounts-and-membership" className="link">
              Accounts and Membership
            </a>
          </li>
          <li>
            <a href="#user-content" className="link">
              User Content
            </a>
          </li>
          <li>
            <a href="#backups" className="link">
              Backups
            </a>
          </li>
          <li>
            <a href="#links-to-other-resources" className="link">
              Links to Other Resources
            </a>
          </li>
          <li>
            <a href="#prohibited-uses" className="link">
              Prohibited Uses
            </a>
          </li>
          <li>
            <a href="#intellectual-property-rights" className="link">
              Intellectual Property Rights
            </a>
          </li>
          <li>
            <a href="#indemnification" className="link">
              Indemnification
            </a>
          </li>
          <li>
            <a href="#severability" className="link">
              Severability
            </a>
          </li>
          <li>
            <a href="#dispute-resolution" className="link">
              Dispute Resolution
            </a>
          </li>
          <li>
            <a href="#changes-and-amendments" className="link">
              Changes and Amendments
            </a>
          </li>
          <li>
            <a href="#acceptance-of-these-terms" className="link">
              Acceptance of These Terms
            </a>
          </li>
          <li>
            <a href="#contacting-us" className="link">
              Contacting Us
            </a>
          </li>
        </ol>
      </div>

      <h2 id="accounts-and-membership" className="section-title">
        Accounts and Membership
      </h2>
      <p className="text">
        If you create an account on the Website, you are responsible for
        maintaining the security of your account. We may monitor new accounts
        before use. Providing false contact information may result in
        termination. We may suspend or delete your account for any violation of
        these terms.
      </p>

      <h2 id="user-content" className="section-title">
        User Content
      </h2>
      <p className="text">
        You retain ownership of any data you submit on the Website. You are
        responsible for its accuracy and legality. We may review and moderate
        content but do not claim ownership of your data.
      </p>

      <h2 id="backups" className="section-title">
        Backups
      </h2>
      <p className="text">
        We are not responsible for Content on the Website. It is your
        responsibility to back up your data.
      </p>

      <h2 id="links-to-other-resources" className="section-title">
        Links to Other Resources
      </h2>
      <p className="text">
        The Website may link to third-party websites. We are not responsible for
        the content of those websites.
      </p>

      <h2 id="prohibited-uses" className="section-title">
        Prohibited Uses
      </h2>
      <p className="text">
        You are prohibited from using the Website for illegal purposes,
        harassment, uploading viruses, and other harmful activities.
      </p>

      <h2 id="intellectual-property-rights" className="section-title">
        Intellectual Property Rights
      </h2>
      <p className="text">
        The intellectual property on the Website is owned by the Operator. Your
        use of the Website does not grant any right to use the Operator's
        trademarks or copyrights.
      </p>

      <h2 id="indemnification" className="section-title">
        Indemnification
      </h2>
      <p className="text">
        You agree to indemnify the Operator from any claims or damages resulting
        from your use of the Website.
      </p>

      <h2 id="severability" className="section-title">
        Severability
      </h2>
      <p className="text">
        If any part of these terms is found to be invalid, the remaining
        provisions will continue in effect.
      </p>

      <h2 id="dispute-resolution" className="section-title">
        Dispute Resolution
      </h2>
      <p className="text">
        Any disputes arising from these terms will be governed by the laws of
        the jurisdiction where the Operator is based.
      </p>

      <h2 id="changes-and-amendments" className="section-title">
        Changes and Amendments
      </h2>
      <p className="text">
        We may modify these terms at any time by updating this page. Continued
        use of the Website constitutes acceptance of these changes.
      </p>

      <h2 id="acceptance-of-these-terms" className="section-title">
        Acceptance of These Terms
      </h2>
      <p className="text">
        By using the Website, you agree to these terms. If you do not agree,
        please discontinue use of the Website.
      </p>

      <h2 id="contacting-us" className="section-title">
        Contacting Us
      </h2>
      <p className="text">
        If you have any questions, please contact us at:
        <strong> azfaralam.ops@gmail.com</strong>
      </p>
    </div>
  );
};

export default TermsAndConditions;
