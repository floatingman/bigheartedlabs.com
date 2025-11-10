# Quick Fix: Contact Webhook Not Configured

## Problem

You're seeing this error in the browser console:
```
Contact webhook URL not configured
```

The contact form is not working because the `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` environment variable is not set.

## Solution

### For Production (Recommended)

Since this project uses GitHub Actions for continuous deployment, you need to set the webhook URL as a **GitHub Secret**:

1. **Set up your n8n webhook** (if you haven't already)
   - Follow the complete guide in `CONTACT_FORM_SETUP.md`
   - You'll get a webhook URL like: `https://n8n.yourdomain.com/webhook/contact-form`

2. **Add the GitHub Secret**
   - Go to your GitHub repository
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NEXT_PUBLIC_CONTACT_WEBHOOK_URL`
   - Value: Your n8n webhook URL (e.g., `https://n8n.yourdomain.com/webhook/contact-form`)
   - Click **Add secret**

3. **Trigger a new build**
   - Push any commit to the `main` branch, OR
   - Go to **Actions** tab → **Build and Deploy** → **Run workflow**

4. **Wait for deployment**
   - GitHub Actions will build a new Docker image with the webhook URL
   - The new image will be automatically deployed to your server
   - The contact form will now work!

### For Local Development

If you want to test the contact form locally:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your webhook URL:
   ```bash
   NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/contact-form
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

## Why This Happens

This is a **static site** built with Next.js, which means:
- Environment variables are baked into the code at **build time**
- The Docker image is built by **GitHub Actions**, not on your server
- You can't change these values by editing `.env` on your server

The solution is to set the value in GitHub Secrets, which GitHub Actions uses during the build.

## Verification

After setting the secret and deploying:

1. Open your website in a browser
2. Go to the Contact page
3. Open the browser console (F12)
4. Submit the contact form
5. You should see the form submit successfully without the error

## Related Documentation

- **Complete webhook setup**: See `CONTACT_FORM_SETUP.md`
- **Environment variables explained**: See `ENVIRONMENT_SETUP.md`
- **Deployment process**: See `DEPLOYMENT.md`

## Still Having Issues?

If the form still doesn't work after following these steps:

1. Check that the webhook URL is correct and the n8n workflow is active
2. Test the webhook with curl:
   ```bash
   curl -X POST https://n8n.yourdomain.com/webhook/contact-form \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test"}'
   ```
3. Check GitHub Actions logs to ensure the build succeeded
4. Verify the new Docker image was pulled on your server:
   ```bash
   docker images | grep bigheartedlabs
   ```
5. Check the running container was restarted with the new image:
   ```bash
   docker compose ps
   docker logs bigheartedlabs-web
   ```
