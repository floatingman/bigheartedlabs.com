export const getGlobalData = () => {
  const companyName = process.env.COMPANY_NAME
    ? decodeURI(process.env.COMPANY_NAME)
    : 'BigHearted Labs';
  const tagline = process.env.TAGLINE
    ? decodeURI(process.env.TAGLINE)
    : 'Expert Test Automation & CI/CD Solutions';
  const footerText = process.env.FOOTER_TEXT
    ? decodeURI(process.env.FOOTER_TEXT)
    : 'All rights reserved.';
  const contactEmail = process.env.CONTACT_EMAIL
    ? decodeURI(process.env.CONTACT_EMAIL)
    : 'contact@bigheartedlabs.com';

  return {
    companyName,
    tagline,
    footerText,
    contactEmail,
  };
};
