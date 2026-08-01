export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose-custom space-y-6">
          <section>
            <h2>1. Introduction</h2>
            <p>TrustGuide ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.</p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, and profile information when you create an account.</li>
              <li><strong>Authentication Data:</strong> If you use Google login, we receive your Google profile information.</li>
              <li><strong>Communications:</strong> Information you provide when contacting us or participating in community discussions.</li>
            </ul>
            <h3>Non-Personal Information</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, search queries, time spent on site, and interaction patterns.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device type.</li>
              <li><strong>Cookies:</strong> We use cookies to improve your experience and analyze site traffic.</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>Provide and maintain our platform</li>
              <li>Improve and personalize user experience</li>
              <li>Communicate with you about updates, security alerts, and support</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
              <li>Analyze usage patterns to improve our content and services</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third parties who help us operate our platform (hosting, analytics, email delivery).</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
              <li><strong>Consent:</strong> With your explicit consent for specific purposes.</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Correction:</strong> Update inaccurate information.</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data.</li>
              <li><strong>Objection:</strong> Opt-out of certain data processing activities.</li>
              <li><strong>Portability:</strong> Receive your data in a structured format.</li>
            </ul>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>We use essential cookies for platform functionality and analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2>8. Third-Party Services</h2>
            <p>Our platform may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2>9. Children's Privacy</h2>
            <p>TrustGuide is not intended for children under 13. We do not knowingly collect information from children under 13.</p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of material changes via email or prominent notice on our platform.</p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>For privacy-related inquiries, contact us at privacy@trustguide.com or through our Contact page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
