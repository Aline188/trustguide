export default function AccessibilityPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Accessibility Statement</h1>
        <p className="text-muted-foreground mb-8">Last updated: August 3, 2026</p>
        <div className="prose-custom space-y-6">
          <section>
            <h2>Our Commitment</h2>
            <p>TrustGuide is committed to ensuring digital accessibility for people with disabilities. We continuously improve the user experience for everyone.</p>
          </section>
          <section>
            <h2>Accessibility Standards</h2>
            <p>We aim to conform to WCAG 2.1 Level AA guidelines. Our platform is designed with:</p>
            <ul>
              <li>Sufficient color contrast ratios</li>
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Clear and consistent layout</li>
              <li>Alternative text for images</li>
              <li>Resizable text without loss of functionality</li>
            </ul>
          </section>
          <section>
            <h2>Measures We Take</h2>
            <ul>
              <li>Regular accessibility audits</li>
              <li>Testing with assistive technologies</li>
              <li>Training our team on accessibility best practices</li>
              <li>Including accessibility in our design process</li>
            </ul>
          </section>
          <section>
            <h2>Feedback</h2>
            <p>We welcome your feedback on accessibility. Contact us at accessibility@trustguide.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
