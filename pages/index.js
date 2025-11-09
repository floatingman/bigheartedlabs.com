import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';

export default function Index({ globalData }) {
  return (
    <Layout globalData={globalData}>
      <SEO
        title={`${globalData.companyName} - ${globalData.tagline}`}
        description="Professional staff augmentation services for test automation and CI/CD implementation. Transform your SDLC with expert consultants."
      />

      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <GradientBackground
          variant="large"
          className="absolute top-0 opacity-30 dark:opacity-40"
        />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {globalData.companyName}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            {globalData.tagline}
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Transform your software development lifecycle with expert staff augmentation
            for test automation and CI/CD processes. We provide skilled professionals
            who integrate seamlessly with your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary">
              Get Started
            </Button>
            <Button href="/services" variant="secondary">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Our Services
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Expert professionals ready to accelerate your quality assurance and deployment processes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon="🧪"
            title="Test Automation"
            description="Expert test automation engineers who design, implement, and maintain comprehensive testing frameworks."
            features={[
              'Framework architecture & setup',
              'Test script development',
              'Integration with CI/CD pipelines',
              'Parallel execution strategies'
            ]}
          />

          <ServiceCard
            icon="🚀"
            title="CI/CD Implementation"
            description="Specialists who build and optimize continuous integration and deployment pipelines for faster delivery."
            features={[
              'Pipeline design & configuration',
              'Infrastructure as Code',
              'Automated deployment strategies',
              'Monitoring & observability'
            ]}
          />

          <ServiceCard
            icon="👥"
            title="Staff Augmentation"
            description="Flexible engagement models to seamlessly integrate skilled professionals into your existing teams."
            features={[
              'Rapid team scaling',
              'Knowledge transfer',
              'Long-term partnerships',
              'Reduced hiring overhead'
            ]}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl px-8 md:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Proven Expertise</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our consultants bring years of hands-on experience in implementing test automation
              frameworks and CI/CD pipelines across diverse technology stacks and industries.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Rapid Integration</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We understand the urgency of your projects. Our professionals are ready to hit the
              ground running and start contributing from day one.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tailored Solutions</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We don&apos;t believe in one-size-fits-all. Every engagement is customized to meet
              your specific technical requirements and organizational culture.
            </p>
          </div>

          <div>
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Flexible Engagement</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Whether you need short-term support for a critical project or long-term partnership,
              we adapt to your needs with flexible engagement models.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Ready to Transform Your SDLC?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help accelerate your software delivery with
          expert test automation and CI/CD professionals.
        </p>
        <Button href="/contact" variant="primary" className="text-lg px-12 py-4">
          Schedule a Consultation
        </Button>
      </section>

      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}
