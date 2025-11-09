import Layout from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Button from '../components/Button';

export default function Services({ globalData }) {
  const services = [
    {
      icon: '🧪',
      title: 'Test Automation Engineering',
      description: 'Comprehensive test automation solutions that ensure quality at speed.',
      details: [
        {
          subtitle: 'Framework Design & Architecture',
          points: [
            'Design scalable test automation frameworks from scratch',
            'Select optimal tools and technologies for your stack',
            'Establish best practices and coding standards',
            'Create reusable component libraries'
          ]
        },
        {
          subtitle: 'Test Development & Maintenance',
          points: [
            'Develop automated test suites (UI, API, integration, E2E)',
            'Implement data-driven and keyword-driven testing',
            'Create test reporting and analytics dashboards',
            'Maintain and refactor existing test suites'
          ]
        },
        {
          subtitle: 'Tools & Technologies',
          points: [
            'Selenium, Cypress, Playwright, Puppeteer',
            'Appium for mobile automation',
            'REST Assured, Postman for API testing',
            'JUnit, TestNG, pytest, Jest',
            'BDD frameworks: Cucumber, SpecFlow'
          ]
        }
      ]
    },
    {
      icon: '🚀',
      title: 'CI/CD Implementation',
      description: 'Build robust pipelines that accelerate your delivery process.',
      details: [
        {
          subtitle: 'Pipeline Architecture',
          points: [
            'Design end-to-end CI/CD pipelines',
            'Multi-environment deployment strategies',
            'Blue-green and canary deployment patterns',
            'Rollback and disaster recovery procedures'
          ]
        },
        {
          subtitle: 'Infrastructure as Code',
          points: [
            'Terraform, CloudFormation, Pulumi implementations',
            'Docker containerization strategies',
            'Kubernetes orchestration setup',
            'Configuration management with Ansible, Chef'
          ]
        },
        {
          subtitle: 'Platform Expertise',
          points: [
            'Jenkins, GitLab CI/CD, GitHub Actions',
            'Azure DevOps, CircleCI, Travis CI',
            'AWS CodePipeline, Google Cloud Build',
            'ArgoCD for GitOps workflows',
            'Monitoring with Prometheus, Grafana, Datadog'
          ]
        }
      ]
    },
    {
      icon: '📊',
      title: 'Quality Engineering',
      description: 'Holistic quality assurance strategies beyond automation.',
      details: [
        {
          subtitle: 'Quality Strategy',
          points: [
            'Develop comprehensive test strategies',
            'Establish quality gates and metrics',
            'Performance and load testing implementation',
            'Security testing integration'
          ]
        },
        {
          subtitle: 'Process Improvement',
          points: [
            'Shift-left testing initiatives',
            'Test coverage analysis and improvement',
            'Defect management optimization',
            'Team training and mentorship'
          ]
        },
        {
          subtitle: 'Specialized Testing',
          points: [
            'Performance testing with JMeter, Gatling, k6',
            'Security scanning with OWASP ZAP, Burp Suite',
            'Accessibility testing (WCAG compliance)',
            'Visual regression testing'
          ]
        }
      ]
    },
    {
      icon: '👥',
      title: 'Staff Augmentation',
      description: 'Flexible engagement models to scale your team quickly.',
      details: [
        {
          subtitle: 'Engagement Models',
          points: [
            'Short-term project-based engagements',
            'Long-term embedded team members',
            'Part-time fractional support',
            'Knowledge transfer and training programs'
          ]
        },
        {
          subtitle: 'Our Professionals',
          points: [
            'Senior test automation engineers',
            'DevOps and CI/CD specialists',
            'Quality engineering leads',
            'Agile QA consultants'
          ]
        },
        {
          subtitle: 'Benefits',
          points: [
            'Rapid onboarding (1-2 weeks)',
            'No long-term hiring commitments',
            'Scale up or down as needed',
            'Access to latest tools and practices'
          ]
        }
      ]
    }
  ];

  return (
    <Layout globalData={globalData}>
      <SEO
        title={`Services - ${globalData.companyName}`}
        description="Comprehensive test automation and CI/CD services. Staff augmentation for quality engineering teams."
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions to accelerate your software delivery with quality and confidence
          </p>
        </section>

        {/* Services Details */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <section
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="text-6xl">{service.icon}</div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                      {detail.subtitle}
                    </h3>
                    <ul className="space-y-3">
                      {detail.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex items-start text-gray-700 dark:text-gray-300"
                        >
                          <svg
                            className="w-5 h-5 mr-2 mt-0.5 text-purple-600 dark:text-purple-400 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Process Section */}
        <section className="mt-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Engagement Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Discovery</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We learn about your needs, tech stack, and goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Proposal</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Tailored solution with timeline and resource allocation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Onboarding</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Quick integration with your team and processes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Delivery</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Continuous value delivery with regular checkpoints
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss which services align best with your needs
          </p>
          <Button href="/contact" variant="primary" className="text-lg px-12 py-4">
            Contact Us Today
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
