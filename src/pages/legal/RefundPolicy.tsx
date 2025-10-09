import React from 'react';
import { LegalLayout } from '../../components/legal/LegalLayout';
import { LEGAL_INFO } from '../../types/legal';

interface RefundPolicyProps {
  onBack: () => void;
}

export function RefundPolicy({ onBack }: RefundPolicyProps) {
  return (
    <LegalLayout title="Refund Policy" onBack={onBack}>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
        <p className="text-gray-700 mb-4">
          At {LEGAL_INFO.companyName}, we strive to provide exceptional value through our startup idea
          validation service. This Refund Policy outlines our approach to subscription cancellations
          and refunds.
        </p>
        <p className="text-gray-700">
          We want you to be satisfied with our service. If you have any concerns, please contact us
          at {LEGAL_INFO.contactEmail} before requesting a refund, as we may be able to resolve
          your issue.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Subscription Overview</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.1 Free Tier</h3>
        <p className="text-gray-700 mb-4">
          Our free tier includes 1 idea validation per month at no cost. There are no charges and
          therefore no refunds applicable to the free tier.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1.2 Paid Subscription</h3>
        <p className="text-gray-700 mb-4">
          Our paid subscription is billed monthly at $5.00 per month and includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Unlimited idea validations</li>
          <li>Deep competitor analysis</li>
          <li>Priority support</li>
          <li>Advanced insights and recommendations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cancellation Policy</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 How to Cancel</h3>
        <p className="text-gray-700 mb-4">
          You can cancel your subscription at any time through:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Your account dashboard under "Subscription" settings</li>
          <li>The Stripe customer portal accessible from your account</li>
          <li>Contacting our support team at {LEGAL_INFO.contactEmail}</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 What Happens After Cancellation</h3>
        <p className="text-gray-700 mb-4">
          When you cancel your subscription:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>You will retain access to paid features until the end of your current billing period</li>
          <li>You will not be charged for subsequent billing periods</li>
          <li>Your account will automatically revert to the free tier at the end of the billing period</li>
          <li>All your analysis history and saved reports will remain accessible</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Policy</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 General Policy</h3>
        <p className="text-gray-700 mb-4">
          Due to the nature of our digital service, we generally do not offer refunds for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Partial billing periods</li>
          <li>Services already rendered</li>
          <li>Subscriptions that have been used during the billing period</li>
          <li>Change of mind after subscription activation</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Exceptions</h3>
        <p className="text-gray-700 mb-4">
          We may provide refunds in the following exceptional circumstances:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>
            <strong>Technical Issues:</strong> If you experience significant technical problems that
            prevent you from using our service, and we are unable to resolve them within a reasonable
            timeframe
          </li>
          <li>
            <strong>Billing Errors:</strong> If you were charged incorrectly due to a system error
            or duplicate charge
          </li>
          <li>
            <strong>Unauthorized Charges:</strong> If your payment method was used without your
            authorization (subject to verification)
          </li>
          <li>
            <strong>Service Unavailability:</strong> If our service was unavailable for an extended
            period due to technical issues on our end
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 First-Time Subscribers</h3>
        <p className="text-gray-700 mb-4">
          For first-time paid subscribers, we offer a satisfaction guarantee:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>If you are not satisfied with our service, contact us within 7 days of your first charge</li>
          <li>We will review your case and may offer a full refund at our discretion</li>
          <li>This guarantee applies only to your first subscription payment</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to Request a Refund</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.1 Refund Request Process</h3>
        <p className="text-gray-700 mb-4">
          To request a refund, please follow these steps:
        </p>
        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
          <li>Contact us at {LEGAL_INFO.contactEmail}</li>
          <li>Include your account email address</li>
          <li>Provide the reason for your refund request</li>
          <li>Include any relevant transaction IDs or dates</li>
          <li>Describe any issues you experienced (if applicable)</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Review Timeline</h3>
        <p className="text-gray-700 mb-4">
          We will review all refund requests:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Initial response within 2 business days</li>
          <li>Full review and decision within 5-7 business days</li>
          <li>You will be notified of our decision via email</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Approved Refunds</h3>
        <p className="text-gray-700 mb-4">
          If your refund is approved:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Refunds will be processed to your original payment method</li>
          <li>Processing typically takes 5-10 business days</li>
          <li>The exact timing depends on your bank or card issuer</li>
          <li>You will receive a confirmation email once the refund is processed</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prorated Refunds</h2>
        <p className="text-gray-700 mb-4">
          We generally do not offer prorated refunds for partial billing periods. However, in
          exceptional circumstances where:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Our service experienced significant downtime</li>
          <li>You were unable to access features you paid for due to our technical issues</li>
          <li>There were billing errors on our part</li>
        </ul>
        <p className="text-gray-700">
          We may, at our sole discretion, offer a prorated refund based on the unused portion of
          your subscription.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Chargebacks and Disputes</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.1 Before Filing a Chargeback</h3>
        <p className="text-gray-700 mb-4">
          If you have an issue with a charge, please contact us first at {LEGAL_INFO.contactEmail}
          before initiating a chargeback with your bank or card issuer. We are committed to resolving
          billing issues quickly and fairly.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 Chargeback Consequences</h3>
        <p className="text-gray-700 mb-4">
          Filing a chargeback without first contacting us may result in:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Immediate suspension of your account</li>
          <li>Loss of access to all features and data</li>
          <li>Potential legal action to recover losses</li>
          <li>Inability to use our service in the future</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.3 Fraudulent Chargebacks</h3>
        <p className="text-gray-700 mb-4">
          Fraudulent chargebacks (claiming services weren't received when they were) may result in:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Permanent account termination</li>
          <li>Reporting to payment processors and fraud prevention services</li>
          <li>Legal action to recover damages</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Auto-Renewal and Billing</h2>
        <p className="text-gray-700 mb-4">
          Your subscription automatically renews each month unless cancelled:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>You will be charged on the same day each month</li>
          <li>You can cancel at any time before the next billing date</li>
          <li>Cancellations take effect at the end of the current billing period</li>
          <li>We do not offer refunds for forgotten cancellations</li>
        </ul>
        <p className="text-gray-700">
          It is your responsibility to cancel your subscription if you no longer wish to be charged.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Special Circumstances</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">8.1 Account Termination</h3>
        <p className="text-gray-700 mb-4">
          If we terminate your account due to violation of our Terms of Service or Acceptable Use
          Policy, you will not be entitled to a refund for the current billing period or any previous
          periods.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">8.2 Service Discontinuation</h3>
        <p className="text-gray-700 mb-4">
          If we decide to discontinue the {LEGAL_INFO.companyName} service:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>We will provide at least 30 days' advance notice</li>
          <li>All active subscriptions will be cancelled</li>
          <li>Prorated refunds will be provided for any unused portion of your subscription</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Payment Processor Policies</h2>
        <p className="text-gray-700 mb-4">
          All payments are processed through Stripe. In addition to this Refund Policy, you are also
          subject to Stripe's terms and policies. If there is a conflict between our policy and
          Stripe's policy, Stripe's policy will govern with respect to payment processing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
        <p className="text-gray-700 mb-4">
          For questions about refunds, cancellations, or billing issues, please contact us:
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 font-semibold">{LEGAL_INFO.companyName}</p>
          <p className="text-gray-700">{LEGAL_INFO.companyLocation}</p>
          <p className="text-indigo-600 font-semibold mt-2">{LEGAL_INFO.contactEmail}</p>
        </div>
        <p className="text-gray-700 mt-4">
          We are committed to providing excellent customer service and will work with you to resolve
          any concerns about your subscription or charges.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to modify this Refund Policy at any time. Changes will be effective
          immediately upon posting to our website with an updated "Last Updated" date. Your continued
          use of our service after changes are posted constitutes acceptance of the modified policy.
        </p>
        <p className="text-gray-700">
          Significant changes to this policy will be communicated via email to active subscribers.
        </p>
      </section>
    </LegalLayout>
  );
}
