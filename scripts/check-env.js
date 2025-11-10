#!/usr/bin/env node

/**
 * Build-time environment variable validation script
 *
 * This script checks for required environment variables during the build process
 * and provides clear guidance if any are missing.
 */

console.log('\n🔍 Checking environment configuration...\n');

let hasErrors = false;
let hasWarnings = false;

// Check for NEXT_PUBLIC_CONTACT_WEBHOOK_URL
if (!process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL) {
  console.log('⚠️  WARNING: NEXT_PUBLIC_CONTACT_WEBHOOK_URL is not configured');
  console.log('   The contact form will not work without this variable.');
  console.log('   ');
  console.log('   For local development:');
  console.log('   1. Copy .env.example to .env.local');
  console.log('   2. Set NEXT_PUBLIC_CONTACT_WEBHOOK_URL to your n8n webhook URL');
  console.log('   3. Restart the dev server');
  console.log('   ');
  console.log('   For production (GitHub Actions):');
  console.log('   1. Go to GitHub repository Settings → Secrets and variables → Actions');
  console.log('   2. Add a secret named NEXT_PUBLIC_CONTACT_WEBHOOK_URL');
  console.log('   3. Push a commit to trigger a new build');
  console.log('   ');
  console.log('   See CONTACT_FORM_SETUP.md and ENVIRONMENT_SETUP.md for details.');
  console.log();
  hasWarnings = true;
} else {
  console.log('✓ NEXT_PUBLIC_CONTACT_WEBHOOK_URL is configured');
}

// Check other optional variables (informational only)
const optionalVars = [
  'COMPANY_NAME',
  'TAGLINE',
  'CONTACT_EMAIL',
  'FOOTER_TEXT'
];

optionalVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✓ ${varName} is configured`);
  } else {
    console.log(`ℹ ${varName} not configured (using default)`);
  }
});

console.log();

if (hasErrors) {
  console.log('❌ Build cannot continue due to missing required environment variables.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Build will continue, but some features may not work correctly.\n');
  // Don't exit with error - just warn
} else {
  console.log('✅ All environment variables are properly configured!\n');
}
