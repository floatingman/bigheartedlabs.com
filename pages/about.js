import Layout from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Button from '../components/Button';

export default function About({ globalData }) {
  return (
    <Layout globalData={globalData}>
      <SEO
        title={`About - ${globalData.companyName}`}
        description="Learn about our mission to transform software development through expert test automation and CI/CD staff augmentation."
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Transforming software delivery through expert quality engineering
          </p>
        </section>

        {/* Mission Statement */}
        <section className="mb-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            At {globalData.companyName}, we&apos;re on a mission to help organizations achieve continuous
            delivery excellence. We believe that quality should never be a bottleneck to innovation,
            and that the right automation strategies can accelerate both development velocity and
            software reliability.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Through strategic staff augmentation, we empower teams to adopt modern testing practices
            and robust CI/CD pipelines without the overhead of lengthy recruitment processes or
            extensive training programs.
          </p>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            What Sets Us Apart
          </h2>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    Specialized Focus
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We don&apos;t try to be everything to everyone. Our laser focus on test automation
                    and CI/CD means we&apos;ve seen every challenge, debugged every edge case, and
                    refined our approaches across dozens of implementations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🚀</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    Immediate Impact
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our consultants are battle-tested professionals who have implemented automation
                    frameworks and pipelines at scale. They join your team ready to contribute from
                    day one, not after months of ramp-up.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤝</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    True Partnership
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We&apos;re not just staff augmentation—we&apos;re strategic partners in your quality
                    journey. We invest in understanding your business context, challenges, and goals
                    to deliver solutions that truly move the needle.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📚</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    Knowledge Transfer
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Every engagement includes knowledge sharing. We document decisions, mentor your
                    team members, and ensure that when our engagement ends, your team is empowered
                    to maintain and evolve the solutions we&apos;ve built together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            Our Approach
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Technology Agnostic
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in choosing the right tool for your context, not forcing our
                  preferences onto your stack. Whether you&apos;re in Java, .NET, Python, JavaScript,
                  or Go—we&apos;ve got you covered.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Pragmatic, Not Dogmatic
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Perfect is the enemy of good. We focus on delivering practical solutions that
                  provide immediate value while establishing a foundation for future improvements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Quality Without Compromise
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Speed matters, but not at the expense of reliability. We help you find the
                  optimal balance between velocity and confidence through intelligent automation
                  and efficient pipeline design.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                  Continuous Improvement
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We treat automation and pipeline code with the same rigor as production code.
                  This means proper architecture, maintainability, and continuous refinement based
                  on feedback and metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            Industries We Serve
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'FinTech',
              'Healthcare',
              'E-commerce',
              'SaaS',
              'Telecommunications',
              'Education',
              'Enterprise Software',
              'Media & Entertainment',
              'IoT'
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700 dark:text-gray-300 font-medium">{industry}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4">
            Ready to accelerate your quality engineering and delivery processes?
          </p>
          <Button href="/contact" variant="primary" className="text-lg px-12 py-4">
            Get in Touch
          </Button>
        </section>
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();
  return { props: { globalData } };
}
