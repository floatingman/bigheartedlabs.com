import Layout from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

export default function Contact({ globalData }) {
  return (
    <Layout globalData={globalData}>
      <SEO
        title={`Contact - ${globalData.companyName}`}
        description="Get in touch to discuss your test automation and CI/CD needs. We&apos;re here to help accelerate your software delivery."
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to transform your SDLC? Let&apos;s discuss how we can help you achieve your quality
            and delivery goals.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Contact Form */}
          <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <a
                      href={`mailto:${globalData.contactEmail}`}
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {globalData.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                What to Expect
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Quick Response:</strong> We&apos;ll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Discovery Call:</strong> 30-minute conversation about your needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Proposal:</strong> Customized solution within 3-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Saturday - Sunday:</span>
                  <span>Closed</span>
                </p>
                <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                  * All times in your local timezone
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                How quickly can you start?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Typically within 1-2 weeks after agreement. We maintain a network of pre-vetted
                professionals ready for immediate deployment.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                What engagement models do you offer?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We offer flexible arrangements including full-time dedicated resources, part-time
                support, and project-based engagements. All can be scaled up or down based on your
                evolving needs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Do you work with specific technologies?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We&apos;re technology agnostic and have experience across major languages, frameworks,
                and platforms. Whether you&apos;re using Java, Python, JavaScript, .NET, or others—we
                can help.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                What if we need to change scope mid-engagement?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We&apos;re built for adaptability. Regular check-ins ensure we can pivot quickly based
                on changing priorities or discoveries during the engagement.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Do you provide training for our team?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Absolutely. Knowledge transfer is built into every engagement. We document
                decisions, conduct training sessions, and ensure your team is equipped to maintain
                and evolve the solutions we build.
              </p>
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="text-center py-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Prefer a Different Method?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We&apos;re happy to connect in whatever way works best for you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${globalData.contactEmail}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us Directly
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();
  return { props: { globalData } };
}
