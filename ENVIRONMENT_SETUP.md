# Environment Variables Setup Guide

This guide explains how to configure environment variables for BigHearted Labs website.

## Understanding Next.js Environment Variables

### Important Concepts

1. **`.env` files are NOT shell environment variables**
   - Next.js loads `.env` files during `npm run dev` or `npm run build`
   - Variables in `.env` files won't appear when running `printenv` in your shell
   - This is **expected behavior** - they're application-level variables, not system-level

2. **`NEXT_PUBLIC_*` prefix**
   - Variables with this prefix are exposed to the browser
   - They're embedded into the JavaScript bundle at **build time**
   - Available in both server-side and client-side code
   - ⚠️ **Never put secrets in `NEXT_PUBLIC_*` variables** - they're visible to users

3. **Environment-specific files** (priority order, highest to lowest):
   - `.env.local` - Local overrides (gitignored, for development)
   - `.env` - Default values (gitignored, can be used for Docker)
   - `.env.example` - Template with no actual values (committed to git)

## Local Development Setup

### Step 1: Create your local environment file

```bash
# Copy the example file to .env.local
cp .env.example .env.local
```

### Step 2: Configure your variables

Edit `.env.local` and set your actual values:

```bash
# Contact Form Configuration
NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact-form

# Company Information (optional, has defaults)
COMPANY_NAME="BigHearted Labs"
CONTACT_EMAIL="contact@bigheartedlabs.com"
```

### Step 3: Restart the development server

```bash
npm run dev
```

**Important:** Next.js loads environment variables at startup. If you change `.env.local`, you must restart the dev server for changes to take effect.

### Verifying Configuration

You can verify that environment variables are loaded by:

1. **In your Next.js code:**
   ```javascript
   console.log('Webhook URL:', process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL);
   ```

2. **During build:**
   ```bash
   npm run build
   # You'll see the variables being used during the build process
   ```

3. **NOT with `printenv`:**
   - `printenv` shows shell environment variables only
   - Next.js `.env` files are application-level and won't appear there
   - This is normal and expected behavior

## Production Deployment

### Docker Deployment

For Docker deployments, you have two options:

**Option A: Use `.env` file (recommended)**

1. Create a `.env` file in your project root on the server:
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

2. The `docker-compose.yml` will automatically load this file

**Option B: Set in docker-compose.yml**

Add environment variables directly to `docker-compose.yml`:

```yaml
services:
  web:
    environment:
      - NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/contact-form
```

### Manual Deployment

If deploying manually (not using Docker), set environment variables on your server:

```bash
# Add to your shell profile or deployment script
export NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/contact-form

# Then build and start
npm run build
npm start
```

## Required Environment Variables

### Contact Form

- **`NEXT_PUBLIC_CONTACT_WEBHOOK_URL`** (required)
  - The n8n webhook URL for contact form submissions
  - Example: `https://n8n.yourdomain.com/webhook/contact-form`
  - See `CONTACT_FORM_SETUP.md` for n8n setup instructions

### Company Information (optional)

These have defaults in the code but can be overridden:

- `COMPANY_NAME` - Company name (default: "BigHearted Labs")
- `TAGLINE` - Company tagline
- `CONTACT_EMAIL` - Contact email address
- `FOOTER_TEXT` - Footer text

### Docker/Traefik Configuration

Only needed for Docker deployments:

- `DOMAIN` - Your website domain (e.g., `bigheartedlabs.com`)
- `WWW_DOMAIN` - Set to `true` to enable www subdomain
- `CERT_RESOLVER` - Traefik certificate resolver name
- `TRAEFIK_NETWORK` (optional) - Traefik network name

## Troubleshooting

### "Environment variable is undefined"

**Symptoms:** Your code shows `undefined` for an environment variable.

**Solutions:**
1. Verify the variable is set in `.env.local` (for development)
2. Restart your dev server: `npm run dev`
3. For client-side code, ensure the variable name starts with `NEXT_PUBLIC_`
4. Check for typos in the variable name

### "Variable doesn't show in printenv"

**This is normal!** Next.js environment variables are application-level, not shell-level. They won't appear in `printenv` output. To verify they're loaded, check your application logs or use `console.log` in your code.

### "Changes to .env.local aren't working"

You must restart the Next.js development server after changing `.env.local`:
```bash
# Stop the server (Ctrl+C), then:
npm run dev
```

### "Production build has wrong values"

- Environment variables are embedded at **build time**
- If you change environment variables, you must rebuild:
  ```bash
  npm run build
  ```

## Security Best Practices

1. **Never commit `.env` or `.env.local`** files to git
   - These files are gitignored by default
   - Keep them gitignored to prevent leaking secrets

2. **Only commit `.env.example`**
   - Use placeholder values, never real secrets
   - Documents what variables are needed

3. **Be careful with `NEXT_PUBLIC_*` variables**
   - These are exposed to the browser
   - Never put API keys, passwords, or secrets in them
   - Only use for non-sensitive configuration

4. **Use secrets management in production**
   - Consider using environment variables from your hosting platform
   - Or use secrets management tools (AWS Secrets Manager, HashiCorp Vault, etc.)

## Additional Resources

- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- Contact Form Setup: See `CONTACT_FORM_SETUP.md`
