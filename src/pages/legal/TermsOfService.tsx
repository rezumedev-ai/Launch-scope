import React from 'react';
import { LegalLayout } from '../../components/legal/LegalLayout';
import { LEGAL_INFO } from '../../types/legal';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <LegalLayout title="Terms of Service" onBack={onBack}>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
        <p className="text-gray-700 mb-4">
          Welcome to {LEGAL_INFO.companyName}. These Terms of Service constitute a legally binding
          agreement between you and {LEGAL_INFO.companyName} ("we," "us," or "our") regarding your
          use of our startup idea validation service and platform.
        </p>
        <p className="text-gray-700">
          By accessing or using our service, you agree to be bound by these Terms. If you do not agree
          to these Terms, you must not access or use our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Service Description</h2>
        <p className="text-gray-700 mb-4">
          {LEGAL_INFO.companyName} provides an AI-powered platform for validating startup ideas and
          business concepts. Our service includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Market analysis and validation of startup ideas</li>
          <li>Competitive landscape assessment</li>
          <li>Risk identification and opportunity analysis</li>
          <li>Actionable recommendations and improvement plans</li>
          <li>Analysis history and report management</li>
        </ul>
        <p className="text-gray-700">
          We offer both free and paid subscription tiers with varying feature access and usage limits.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Registration</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Eligibility</h3>
        <p className="text-gray-700 mb-4">
          You must be at least 18 years old to use our service. By creating an account, you represent
          and warrant that you meet this age requirement.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Account Security</h3>
        <p className="text-gray-700 mb-4">
          You are responsible for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Maintaining the confidentiality of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of any unauthorized access</li>
          <li>Providing accurate and complete information during registration</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Account Termination</h3>
        <p className="text-gray-700 mb-4">
          We reserve the right to suspend or terminate your account at any time if you violate these
          Terms or engage in conduct that we deem harmful to our service or other users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Subscription Plans and Billing</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Free Tier</h3>
        <p className="text-gray-700 mb-4">
          Our free tier includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>1 idea validation per month</li>
          <li>Basic market analysis</li>
          <li>Risk assessment</li>
          <li>Access to analysis history</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Paid Subscription</h3>
        <p className="text-gray-700 mb-4">
          Our paid subscription includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Unlimited idea validations</li>
          <li>Deep competitor analysis</li>
          <li>Priority support</li>
          <li>Advanced insights and recommendations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 Payment Terms</h3>
        <p className="text-gray-700 mb-4">
          Subscription fees are billed in advance on a monthly or annual basis, depending on your
          selected plan. All payments are processed securely through Stripe. You authorize us to
          charge your payment method for all subscription fees.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.4 Auto-Renewal</h3>
        <p className="text-gray-700 mb-4">
          Your subscription will automatically renew at the end of each billing period unless you
          cancel before the renewal date. You can manage your subscription settings in your account
          dashboard.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.5 Price Changes</h3>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify our pricing. We will provide at least 30 days' notice of
          any price changes. If you do not agree to the new pricing, you may cancel your subscription
          before the change takes effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancellation and Refunds</h2>
        <p className="text-gray-700 mb-4">
          You may cancel your subscription at any time through your account settings or by contacting
          us. Upon cancellation:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>You will retain access until the end of your current billing period</li>
          <li>No refunds will be provided for partial months</li>
          <li>Your account will automatically revert to the free tier</li>
        </ul>
        <p className="text-gray-700">
          For detailed refund information, please refer to our Refund Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.1 Your Content</h3>
        <p className="text-gray-700 mb-4">
          You retain all intellectual property rights to the startup ideas and business concepts you
          submit to our service. By submitting content, you grant us a limited, non-exclusive,
          worldwide license to use, process, and analyze your content solely for the purpose of
          providing our service to you.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Our Content</h3>
        <p className="text-gray-700 mb-4">
          {LEGAL_INFO.companyName} and its licensors own all rights to the service, including the
          platform, analysis algorithms, reports, and all associated intellectual property. You may
          not copy, modify, distribute, or reverse engineer any part of our service without explicit
          written permission.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.3 Generated Reports</h3>
        <p className="text-gray-700 mb-4">
          The analysis reports generated for your ideas are provided for your personal use. You may
          download and use these reports for your business purposes but may not resell or redistribute
          them without our permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use Policy</h2>
        <p className="text-gray-700 mb-4">
          You agree not to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Use the service for any illegal purpose or in violation of any laws</li>
          <li>Submit content that infringes on others' intellectual property rights</li>
          <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
          <li>Use automated systems to access the service without our permission</li>
          <li>Interfere with or disrupt the service or servers</li>
          <li>Engage in any activity that could harm our reputation or other users</li>
          <li>Reverse engineer or attempt to extract source code from our service</li>
          <li>Resell or redistribute our service without authorization</li>
        </ul>
        <p className="text-gray-700">
          For more details, please refer to our Acceptable Use Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. AI-Generated Content and Disclaimers</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.1 Nature of Service</h3>
        <p className="text-gray-700 mb-4">
          Our analysis and recommendations are generated using artificial intelligence and should be
          considered as informational guidance only, not professional business or legal advice.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.2 No Guarantee of Success</h3>
        <p className="text-gray-700 mb-4">
          While we strive to provide accurate and valuable insights, we make no guarantees about:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>The accuracy or completeness of our analysis</li>
          <li>The success or viability of any startup idea</li>
          <li>Market conditions or competitive dynamics</li>
          <li>Future performance or outcomes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.3 Independent Verification</h3>
        <p className="text-gray-700 mb-4">
          You are solely responsible for verifying all information and conducting your own due
          diligence before making any business decisions based on our analysis.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>
            {LEGAL_INFO.companyName} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES
          </li>
          <li>
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING
            THE CLAIM
          </li>
          <li>
            WE ARE NOT RESPONSIBLE FOR ANY BUSINESS LOSSES, LOST PROFITS, OR DAMAGES RESULTING FROM
            YOUR USE OF OUR SERVICE
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
        <p className="text-gray-700 mb-4">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
          <li>Warranties that the service will be uninterrupted, error-free, or secure</li>
          <li>Warranties regarding the accuracy or reliability of any information obtained through
            the service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
        <p className="text-gray-700 mb-4">
          You agree to indemnify, defend, and hold harmless {LEGAL_INFO.companyName}, its officers,
          directors, employees, and agents from any claims, damages, losses, liabilities, and expenses
          (including legal fees) arising from:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Your use of the service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
          <li>Your content or startup ideas submitted to the service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Service Availability</h2>
        <p className="text-gray-700 mb-4">
          We strive to maintain high availability but do not guarantee uninterrupted access to our
          service. We may:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Perform scheduled maintenance with advance notice</li>
          <li>Make emergency updates or repairs without notice</li>
          <li>Modify or discontinue features with reasonable notice</li>
          <li>Suspend service for violations of these Terms</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Privacy and Data Protection</h2>
        <p className="text-gray-700 mb-4">
          Your use of our service is also governed by our Privacy Policy, which is incorporated into
          these Terms by reference. Please review our Privacy Policy to understand how we collect,
          use, and protect your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Dispute Resolution</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">13.1 Governing Law</h3>
        <p className="text-gray-700 mb-4">
          These Terms shall be governed by and construed in accordance with the laws of Ontario,
          Canada, without regard to its conflict of law provisions.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">13.2 Informal Resolution</h3>
        <p className="text-gray-700 mb-4">
          Before filing a formal claim, you agree to contact us at {LEGAL_INFO.contactEmail} to
          attempt to resolve the dispute informally for at least 30 days.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">13.3 Jurisdiction</h3>
        <p className="text-gray-700 mb-4">
          Any legal action or proceeding arising out of these Terms shall be brought exclusively in
          the courts located in Ontario, Canada.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify these Terms at any time. We will notify you of material
          changes by:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Posting the updated Terms with a new "Last Updated" date</li>
          <li>Sending email notification for significant changes</li>
          <li>Displaying a prominent notice in the service</li>
        </ul>
        <p className="text-gray-700">
          Your continued use of the service after changes take effect constitutes acceptance of the
          updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
        <p className="text-gray-700 mb-4">
          If any provision of these Terms is found to be unenforceable or invalid, that provision
          shall be limited or eliminated to the minimum extent necessary, and the remaining provisions
          shall remain in full force and effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Entire Agreement</h2>
        <p className="text-gray-700 mb-4">
          These Terms, together with our Privacy Policy and other referenced policies, constitute the
          entire agreement between you and {LEGAL_INFO.companyName} regarding the use of our service
          and supersede any prior agreements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
        <p className="text-gray-700 mb-4">
          For questions about these Terms, please contact us at:
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
