export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: August 3, 2026</p>

        <div className="prose-custom space-y-6">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using TrustGuide, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>TrustGuide provides a platform for verified information, scam detection, community discussions, and educational content. We strive for accuracy but do not guarantee that all information is complete, current, or error-free.</p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <ul>
              <li>You must be at least 13 years old to create an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree to provide accurate and complete information when creating an account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Post false, misleading, or harmful information</li>
              <li>Harass, abuse, or threaten other users</li>
              <li>Attempt to scam or defraud other users</li>
              <li>Use the platform for illegal activities</li>
              <li>Interfere with platform operations or security</li>
              <li>Violate the intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2>5. Community Guidelines</h2>
            <ul>
              <li>Be respectful and constructive in discussions</li>
              <li>Share accurate information and cite sources when possible</li>
              <li>Flag suspicious or misleading content</li>
              <li>Do not spam or self-promote excessively</li>
              <li>Help create a safe and welcoming community</li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>Content on TrustGuide, including guides, designs, and platform code, is owned by TrustGuide or our licensors. User-generated content remains owned by the user but grants us a license to display it on the platform.</p>
          </section>

          <section>
            <h2>7. Disclaimer of Warranties</h2>
            <p>TrustGuide is provided "as is" without warranties of any kind. We do not guarantee that:</p>
            <ul>
              <li>The platform will be uninterrupted or error-free</li>
              <li>All information is accurate, complete, or current</li>
              <li>Use of the platform will meet your specific needs</li>
            </ul>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>TrustGuide shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. We are not responsible for decisions you make based on information found on our platform.</p>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our platform immediately, without prior notice, for any violation of these terms.</p>
          </section>

          <section>
            <h2>10. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>These terms are governed by the laws of Rwanda. Any disputes shall be resolved in the courts of Kigali, Rwanda.</p>
          </section>

          <section>
            <h2>12. Contact</h2>
            <p>For questions about these terms, contact us at legal@trustguide.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
