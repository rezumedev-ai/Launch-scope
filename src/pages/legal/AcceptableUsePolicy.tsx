import React from 'react';
import { LegalLayout } from '../../components/legal/LegalLayout';
import { LEGAL_INFO } from '../../types/legal';

interface AcceptableUsePolicyProps {
  onBack: () => void;
}

export function AcceptableUsePolicy({ onBack }: AcceptableUsePolicyProps) {
  return (
    <LegalLayout title="Acceptable Use Policy" onBack={onBack}>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          This Acceptable Use Policy outlines the rules and guidelines for using {LEGAL_INFO.companyName}.
          By accessing or using our service, you agree to comply with this policy. Violation of this
          policy may result in suspension or termination of your account.
        </p>
        <p className="text-gray-700">
          We reserve the right to update this policy at any time to ensure a safe, secure, and
          positive experience for all users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Principles</h2>
        <p className="text-gray-700 mb-4">
          When using {LEGAL_INFO.companyName}, you must:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Comply with all applicable local, state, national, and international laws</li>
          <li>Respect the rights and dignity of other users</li>
          <li>Use the service only for its intended purpose</li>
          <li>Maintain the security and confidentiality of your account</li>
          <li>Provide accurate and truthful information</li>
          <li>Act in good faith and with integrity</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Prohibited Activities</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Illegal Activities</h3>
        <p className="text-gray-700 mb-4">
          You may not use our service to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Engage in any illegal activities or promote illegal conduct</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Submit content related to illegal products, services, or activities</li>
          <li>Launder money or engage in financial fraud</li>
          <li>Engage in terrorism, human trafficking, or other serious crimes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Intellectual Property Violations</h3>
        <p className="text-gray-700 mb-4">
          You may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Submit content that infringes on others' copyrights, trademarks, or patents</li>
          <li>Use our service to develop copycat products without proper authorization</li>
          <li>Submit proprietary or confidential information belonging to others without permission</li>
          <li>Reverse engineer, decompile, or attempt to extract source code from our service</li>
          <li>Copy or reproduce our analysis algorithms or methodologies</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Harmful or Offensive Content</h3>
        <p className="text-gray-700 mb-4">
          You may not submit startup ideas or content that:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Is hateful, discriminatory, or promotes violence against individuals or groups</li>
          <li>Contains explicit sexual content or child exploitation material</li>
          <li>Promotes self-harm, suicide, or eating disorders</li>
          <li>Harasses, threatens, or intimidates others</li>
          <li>Contains malware, viruses, or other malicious code</li>
          <li>Is defamatory, libelous, or fraudulent</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.4 Abuse of Service</h3>
        <p className="text-gray-700 mb-4">
          You may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Submit an excessive number of requests to overwhelm our systems</li>
          <li>Use automated tools, bots, or scripts without authorization</li>
          <li>Attempt to bypass usage limits or subscription restrictions</li>
          <li>Share your account credentials with others</li>
          <li>Create multiple accounts to circumvent free tier limitations</li>
          <li>Resell or redistribute our service or analysis reports without permission</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.5 Security Violations</h3>
        <p className="text-gray-700 mb-4">
          You may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Attempt to gain unauthorized access to our systems, servers, or databases</li>
          <li>Probe, scan, or test the vulnerability of our systems</li>
          <li>Breach or circumvent our security or authentication measures</li>
          <li>Access another user's account without permission</li>
          <li>Interfere with or disrupt the service or servers</li>
          <li>Introduce viruses, malware, or other harmful code</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.6 Fraudulent Activities</h3>
        <p className="text-gray-700 mb-4">
          You may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Provide false or misleading information during registration</li>
          <li>Use stolen credit cards or payment methods</li>
          <li>File fraudulent chargebacks or payment disputes</li>
          <li>Impersonate another person or entity</li>
          <li>Engage in phishing or social engineering attacks</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Appropriate Use Guidelines</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Service Purpose</h3>
        <p className="text-gray-700 mb-4">
          {LEGAL_INFO.companyName} is designed for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Validating legitimate startup ideas and business concepts</li>
          <li>Analyzing market opportunities for legal products and services</li>
          <li>Receiving guidance on product development and go-to-market strategies</li>
          <li>Understanding competitive landscapes and customer needs</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Professional Conduct</h3>
        <p className="text-gray-700 mb-4">
          We expect all users to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Interact professionally with our support team</li>
          <li>Provide constructive feedback about our service</li>
          <li>Report bugs or issues responsibly</li>
          <li>Respect our intellectual property and brand</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content Standards</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.1 Your Submissions</h3>
        <p className="text-gray-700 mb-4">
          When submitting startup ideas for analysis, ensure that:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>The content is your own or you have permission to submit it</li>
          <li>The idea is for a legitimate, legal product or service</li>
          <li>You are not submitting confidential information belonging to others</li>
          <li>The content does not contain personal information about third parties</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Quality Expectations</h3>
        <p className="text-gray-700 mb-4">
          To receive the best analysis results:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Provide clear and detailed descriptions of your idea</li>
          <li>Submit genuine startup concepts (not test or spam content)</li>
          <li>Use the service for its intended purpose, not to test our systems</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account Responsibilities</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.1 Account Security</h3>
        <p className="text-gray-700 mb-4">
          You are responsible for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Maintaining the confidentiality of your password</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of unauthorized access</li>
          <li>Using a strong, unique password</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Account Sharing</h3>
        <p className="text-gray-700 mb-4">
          Each account is for individual use only. You may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Share your account credentials with others</li>
          <li>Allow multiple people to use a single account</li>
          <li>Transfer your account to another person without our permission</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Reporting Violations</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.1 How to Report</h3>
        <p className="text-gray-700 mb-4">
          If you become aware of any violations of this Acceptable Use Policy, please report them
          to us immediately at {LEGAL_INFO.contactEmail}. Include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>A detailed description of the violation</li>
          <li>Any relevant evidence or documentation</li>
          <li>Your contact information for follow-up</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 Our Response</h3>
        <p className="text-gray-700 mb-4">
          When we receive a report, we will:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Investigate the matter promptly and thoroughly</li>
          <li>Take appropriate action based on our findings</li>
          <li>Notify you of the outcome if you were directly affected</li>
          <li>Maintain confidentiality of reporter information when possible</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Enforcement and Consequences</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.1 Investigation</h3>
        <p className="text-gray-700 mb-4">
          We reserve the right to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Investigate suspected violations of this policy</li>
          <li>Monitor usage patterns for signs of abuse</li>
          <li>Review submitted content for compliance</li>
          <li>Cooperate with law enforcement when required</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.2 Enforcement Actions</h3>
        <p className="text-gray-700 mb-4">
          Depending on the severity of the violation, we may:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Issue a warning</li>
          <li>Temporarily suspend your account</li>
          <li>Permanently terminate your account</li>
          <li>Remove violating content</li>
          <li>Report illegal activity to law enforcement</li>
          <li>Pursue legal action to recover damages</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.3 No Refunds</h3>
        <p className="text-gray-700 mb-4">
          If your account is suspended or terminated due to violations of this policy, you will not
          be entitled to a refund for any subscription fees paid.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Appeal Process</h2>
        <p className="text-gray-700 mb-4">
          If you believe your account was suspended or terminated in error:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Contact us at {LEGAL_INFO.contactEmail} within 30 days</li>
          <li>Provide a detailed explanation of why you believe the action was incorrect</li>
          <li>Include any relevant evidence or context</li>
          <li>We will review your appeal and respond within 10 business days</li>
        </ul>
        <p className="text-gray-700">
          Our decision on appeals is final and binding.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          If you integrate third-party services with {LEGAL_INFO.companyName} or access our service
          through third-party applications, you must:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Comply with the third party's terms of service</li>
          <li>Ensure the third party complies with our policies</li>
          <li>Take responsibility for any violations caused by the third-party service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cooperation with Law Enforcement</h2>
        <p className="text-gray-700 mb-4">
          We will cooperate with law enforcement agencies in investigating:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Criminal activities conducted through our service</li>
          <li>Violations of applicable laws and regulations</li>
          <li>Threats to public safety or national security</li>
          <li>Protection of our rights and the rights of others</li>
        </ul>
        <p className="text-gray-700">
          We may disclose user information when required by law or in response to valid legal process.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Acceptable Use Policy at any time. Changes will be effective immediately
          upon posting with an updated "Last Updated" date. Material changes will be communicated via:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Email notification to registered users</li>
          <li>Prominent notice on our website</li>
          <li>In-app notification</li>
        </ul>
        <p className="text-gray-700">
          Your continued use of the service after changes are posted constitutes acceptance of the
          modified policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
        <p className="text-gray-700 mb-4">
          For questions about this Acceptable Use Policy or to report violations, please contact us:
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 font-semibold">{LEGAL_INFO.companyName}</p>
          <p className="text-gray-700">{LEGAL_INFO.companyLocation}</p>
          <p className="text-indigo-600 font-semibold mt-2">{LEGAL_INFO.contactEmail}</p>
        </div>
      </section>
    </LegalLayout>
  );
}
