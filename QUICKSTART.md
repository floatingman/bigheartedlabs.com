# Quick Start Guide

Get your Big Hearted Labs website live in 15 minutes!

## 🚀 Fast Track Deployment

### 1. Prepare Your Server (5 min)

```bash
# Connect to your Ubuntu server
ssh your-username@your-server-ip

# Clone the repository
git clone https://github.com/floatingman/bigheartedlabs.com.git
cd bigheartedlabs.com

# Run automated setup
chmod +x scripts/server-setup.sh
bash scripts/server-setup.sh
```

When prompted, enter:
- Your domain name (e.g., `bigheartedlabs.com`)
- WWW domain (optional, e.g., `www.bigheartedlabs.com`)
- Your email (for SSL certificates)

✅ **Done!** Your server is configured with Nginx and HTTPS.

### 2. Deploy Your Site (5 min)

**Option A: Manual Deployment**

```bash
# On your local machine, in the project directory
npm install
npm run export

# Configure deployment (one-time setup)
export DEPLOY_USER="ubuntu"
export DEPLOY_HOST="your-domain.com"
export DEPLOY_PATH="/var/www/bigheartedlabs"

# Deploy!
bash scripts/build-and-deploy.sh
```

**Option B: Automated with GitHub Actions** (Recommended)

```bash
# Generate SSH key for GitHub Actions
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy -N ""

# Copy public key to server
ssh-copy-id -i ~/.ssh/github_deploy.pub your-username@your-server

# Display private key (copy this)
cat ~/.ssh/github_deploy
```

Add GitHub Secrets (Settings → Secrets → Actions):
- `SSH_PRIVATE_KEY`: (paste private key from above)
- `DEPLOY_HOST`: `your-domain.com`
- `DEPLOY_USER`: `ubuntu`
- `DEPLOY_PATH`: `/var/www/bigheartedlabs`

Push to main branch to deploy:
```bash
git push origin main
```

### 3. Verify (2 min)

Visit `https://your-domain.com` - your site should be live with HTTPS! 🎉

## 📝 Common Customizations

### Configure Contact Form

The contact form requires an n8n webhook to function. See [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md) for detailed setup instructions.

**Quick setup:**
1. Create an n8n webhook workflow
2. Add webhook URL to `.env`:
   ```bash
   NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/contact-form
   ```
3. Rebuild: `docker-compose up -d --build` or `npm run export`

### Update Contact Email

Edit `utils/global-data.js`:
```javascript
const contactEmail = process.env.CONTACT_EMAIL
  ? decodeURI(process.env.CONTACT_EMAIL)
  : 'your-email@company.com';  // Change this
```

### Update Company Name

Edit `utils/global-data.js`:
```javascript
const companyName = process.env.COMPANY_NAME
  ? decodeURI(process.env.COMPANY_NAME)
  : 'Your Company Name';  // Change this
```

### Deploy Changes

```bash
git add .
git commit -m "Update contact info"
git push origin main  # Automatically deploys if using GitHub Actions
```

## 🆘 Need Help?

See the full [DEPLOYMENT.md](DEPLOYMENT.md) guide for:
- Detailed setup instructions
- Troubleshooting tips
- Advanced configuration
- Security best practices

## 💡 Quick Commands

```bash
# Build site locally
npm run export

# Deploy manually
bash scripts/deploy.sh

# Build and deploy in one command
bash scripts/build-and-deploy.sh

# Check Nginx status (on server)
sudo systemctl status nginx

# View Nginx logs (on server)
sudo tail -f /var/log/nginx/bigheartedlabs_error.log

# Renew SSL certificate (on server)
sudo certbot renew
```

## 📋 Checklist

- [ ] Server configured with `server-setup.sh`
- [ ] Domain pointing to server IP
- [ ] HTTPS working (visit your domain)
- [ ] GitHub secrets configured (if using CI/CD)
- [ ] Site deployed successfully
- [ ] Contact email updated
- [ ] Test contact form
- [ ] Mobile responsive check

You're all set! 🚀
