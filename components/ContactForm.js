import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Get webhook URL from environment variable
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Contact webhook URL not configured');
      console.error('Please set NEXT_PUBLIC_CONTACT_WEBHOOK_URL in GitHub Secrets');
      console.error('See CONTACT_FORM_SETUP.md and ENVIRONMENT_SETUP.md for details');
      setStatus('config_error');
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        console.error('Form submission failed:', response.statusText);
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="your.email@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
          placeholder="Tell us about your project and how we can help..."
        />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
          Thank you for your message! We&apos;ll get back to you soon.
        </div>
      )}

      {status === 'config_error' && (
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-lg">
          Contact form is not configured yet. Please email us directly at the address below.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          Sorry, there was an error sending your message. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
