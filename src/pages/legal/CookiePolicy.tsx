import React from 'react';
import { LegalLayout } from '../../components/legal/LegalLayout';
import { LEGAL_INFO } from '../../types/legal';

interface CookiePolicyProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function CookiePolicy({ onBack, onNavigate }: CookiePolicyProps) {
  const handlePrivacyNavigation = () => {
    if (onNavigate) {
      onNavigate('privacy');
    }
  };

  return (
    <LegalLayout title="Cookie Policy" onBack={onBack} onNavigate={onNavigate}>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          This Cookie Policy explains how {LEGAL_INFO.companyName} uses cookies and similar tracking
          technologies when you visit our website and use our service. This policy describes what
          cookies are, how we use them, and your choices regarding their use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
        <p className="text-gray-700 mb-4">
          Cookies are small text files that are stored on your device (computer, tablet, or mobile)
          when you visit a website. They help the website remember information about your visit,
          making it easier to use and more personalized to your preferences.
        </p>
        <p className="text-gray-700">
          Cookies can be "persistent" (remaining on your device until deleted or expired) or "session"
          (deleted when you close your browser).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar technologies for the following purposes:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Essential Cookies</h3>
        <p className="text-gray-700 mb-4">
          These cookies are necessary for the website to function properly and cannot be disabled.
          They include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>
            <strong>Authentication cookies:</strong> Used to verify your identity and maintain your
            login session securely
          </li>
          <li>
            <strong>Security cookies:</strong> Help protect against cross-site request forgery (CSRF)
            and other security threats
          </li>
          <li>
            <strong>Session management:</strong> Keep track of your session state as you navigate
            through our service
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Functional Cookies</h3>
        <p className="text-gray-700 mb-4">
          These cookies enable enhanced functionality and personalization:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Store your language preferences</li>
          <li>Remember your subscription status</li>
          <li>Maintain your dashboard customization</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Payment Processing Cookies</h3>
        <p className="text-gray-700 mb-4">
          When you make a payment, Stripe (our payment processor) may set cookies to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Process your payment securely</li>
          <li>Detect and prevent fraudulent transactions</li>
          <li>Remember your payment preferences</li>
        </ul>
        <p className="text-gray-700">
          These cookies are governed by Stripe's privacy policy and cookie policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-Party Cookies</h2>
        <p className="text-gray-700 mb-4">
          We use the following third-party services that may set cookies:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Supabase</h3>
        <p className="text-gray-700 mb-4">
          Our authentication and database provider may set cookies for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Managing user authentication sessions</li>
          <li>Securing data transmission</li>
          <li>Session persistence</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Stripe</h3>
        <p className="text-gray-700 mb-4">
          Our payment processor sets cookies to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Process payments securely</li>
          <li>Prevent fraud</li>
          <li>Comply with PCI-DSS requirements</li>
        </ul>
        <p className="text-gray-700">
          Learn more about Stripe's cookie usage in their{' '}
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            privacy policy
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies We Use</h2>
        <p className="text-gray-700 mb-4">
          Below is a detailed list of cookies used on our service:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">sb-access-token</h4>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Type:</strong> Essential
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Duration:</strong> Session
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Purpose:</strong> Maintains your authentication session with Supabase
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">sb-refresh-token</h4>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Type:</strong> Essential
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Duration:</strong> Persistent (up to 30 days)
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Purpose:</strong> Allows automatic session renewal without requiring re-login
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">__stripe_mid</h4>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Type:</strong> Essential (Payment)
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Duration:</strong> 1 year
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Purpose:</strong> Fraud prevention by Stripe
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">__stripe_sid</h4>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Type:</strong> Essential (Payment)
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Duration:</strong> 30 minutes
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Purpose:</strong> Fraud prevention during checkout by Stripe
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Local Storage</h2>
        <p className="text-gray-700 mb-4">
          In addition to cookies, we use browser local storage to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Store authentication tokens securely</li>
          <li>Cache user preferences for faster loading</li>
          <li>Remember your last visited pages</li>
          <li>Store temporary data during idea analysis</li>
        </ul>
        <p className="text-gray-700">
          Local storage data remains on your device until you clear it or uninstall the application.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Cookies</h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.1 Browser Settings</h3>
        <p className="text-gray-700 mb-4">
          Most web browsers allow you to control cookies through their settings. You can:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>View which cookies have been set and delete them individually</li>
          <li>Block third-party cookies</li>
          <li>Block all cookies from specific websites</li>
          <li>Block all cookies from being set</li>
          <li>Delete all cookies when you close your browser</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 Browser-Specific Instructions</h3>
        <p className="text-gray-700 mb-4">
          For information on managing cookies in specific browsers:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.3 Impact of Blocking Cookies</h3>
        <p className="text-gray-700 mb-4">
          Please note that if you disable or refuse cookies:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>You may not be able to log in or use certain features of our service</li>
          <li>Your preferences will not be saved</li>
          <li>Payment processing may not function correctly</li>
          <li>You may need to manually adjust settings on each visit</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track Signals</h2>
        <p className="text-gray-700 mb-4">
          Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do
          not want to be tracked. We respect DNT signals and do not track users who have DNT enabled
          in their browsers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Mobile Devices</h2>
        <p className="text-gray-700 mb-4">
          If you access our service through a mobile device, you can manage cookies and similar
          technologies through your device settings. The exact options available may vary depending
          on your device and operating system.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Updates to This Cookie Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Cookie Policy from time to time to reflect changes in our practices or
          for legal, operational, or regulatory reasons. We will notify you of any material changes
          by posting the updated policy with a new "Last Updated" date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. More Information</h2>
        <p className="text-gray-700 mb-4">
          For more information about how we protect your privacy, please review our{' '}
          <button
            onClick={handlePrivacyNavigation}
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Privacy Policy
          </button>
          .
        </p>
        <p className="text-gray-700">
          If you have questions about our use of cookies, please contact us at{' '}
          {LEGAL_INFO.contactEmail}.
        </p>
      </section>
    </LegalLayout>
  );
}
