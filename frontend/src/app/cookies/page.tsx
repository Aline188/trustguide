export default function CookiesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose-custom space-y-6">
          <section>
            <h2>1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>
          </section>
          <section>
            <h2>2. How We Use Cookies</h2>
            <ul>
              <li><strong>Essential:</strong> Required for platform functionality (authentication, security)</li>
              <li><strong>Analytics:</strong> Help us understand how users interact with our platform</li>
              <li><strong>Preferences:</strong> Remember your settings and preferences</li>
            </ul>
          </section>
          <section>
            <h2>3. Types of Cookies We Use</h2>
            <ul>
              <li><strong>Session Cookies:</strong> Temporary, deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
              <li><strong>Third-Party Cookies:</strong> From analytics providers and advertisers</li>
            </ul>
          </section>
          <section>
            <h2>4. Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Disabling cookies may affect platform functionality.</p>
          </section>
          <section>
            <h2>5. Contact</h2>
            <p>For questions about our cookie policy, contact privacy@trustguide.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
