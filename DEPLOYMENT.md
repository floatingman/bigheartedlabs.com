# Deployment Guide - BigHearted Labs Website

This guide will help you deploy the BigHearted Labs consultancy website to your Ubuntu server using static site hosting with Nginx.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Server Setup](#server-setup)
- [Manual Deployment](#manual-deployment)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Updating the Website](#updating-the-website)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### On Your Local Machine
- Node.js 18+ installed
- Git installed
- SSH access to your Ubuntu server

### On Your Ubuntu Server
- Ubuntu 20.04 or later
- Root or sudo access
- Domain name pointing to your server's IP address

## Server Setup

### Step 1: Connect to Your Server

```bash
ssh your-username@your-server-ip
```

### Step 2: Download and Run Setup Script

```bash
# Clone the repository
git clone https://github.com/floatingman/bigheartedlabs.com.git
cd bigheartedlabs.com

# Make scripts executable
chmod +x scripts/*.sh

# Run the server setup script
bash scripts/server-setup.sh
```

The script will prompt you for:
- Your domain name (e.g., bigheartedlabs.com)
- WWW domain (e.g., www.bigheartedlabs.com) - optional
- Email for SSL certificates

The script will automatically:
- ✅ Update system packages
- ✅ Install and configure Nginx
- ✅ Configure firewall (UFW)
- ✅ Create web directory
- ✅ Setup SSL certificate with Let's Encrypt
- ✅ Configure automatic SSL renewal

### Step 3: Verify Setup

Visit your domain in a browser. You should see a "Coming Soon" placeholder page with HTTPS enabled.

## Manual Deployment

### Option 1: Deploy from Local Machine

1. **Build the site locally:**

```bash
# In your project directory
npm install
npm run export
```

2. **Configure deployment settings:**

Edit deployment variables (or set as environment variables):

```bash
export DEPLOY_USER="ubuntu"
export DEPLOY_HOST="your-domain.com"
export DEPLOY_PATH="/var/www/bigheartedlabs"
export SSH_KEY_PATH="$HOME/.ssh/id_rsa"
```

3. **Deploy:**

```bash
# Make scripts executable (first time only)
chmod +x scripts/*.sh

# Deploy
bash scripts/deploy.sh
```

### Option 2: One-Command Build and Deploy

```bash
# Build and deploy in one command
bash scripts/build-and-deploy.sh
```

## CI/CD with GitHub Actions

Automate deployments on every push to main/master branch.

### Step 1: Generate SSH Key for Deployment

On your local machine:

```bash
# Generate a new SSH key (without passphrase for automation)
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_deploy -N ""

# Copy public key to your server
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub your-username@your-server

# Display private key (you'll need this for GitHub)
cat ~/.ssh/github_actions_deploy
```

### Step 2: Add GitHub Secrets

Go to your GitHub repository:
1. Navigate to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

| Secret Name | Value | Example |
|------------|-------|---------|
| `SSH_PRIVATE_KEY` | Private key from previous step | Contents of `~/.ssh/github_actions_deploy` |
| `DEPLOY_HOST` | Your server domain/IP | `bigheartedlabs.com` |
| `DEPLOY_USER` | SSH username on server | `ubuntu` |
| `DEPLOY_PATH` | Web root directory | `/var/www/bigheartedlabs` |

### Step 3: Enable GitHub Actions

The workflow is already configured in `.github/workflows/deploy.yml`.

**Automatic Deployment Triggers:**
- Push to `main` or `master` branch
- Manual trigger via "Actions" tab

**Workflow Steps:**
1. ✅ Checkout code
2. ✅ Setup Node.js
3. ✅ Install dependencies
4. ✅ Run linter
5. ✅ Build and export static site
6. ✅ Deploy to server via SSH
7. ✅ Set permissions
8. ✅ Reload Nginx

### Step 4: Test Deployment

Push a change to trigger deployment:

```bash
git add .
git commit -m "Test automatic deployment"
git push origin main
```

Monitor deployment in the **Actions** tab on GitHub.

## Updating the Website

### Update Content

1. Edit pages in the `pages/` directory
2. Modify components in the `components/` directory
3. Update global settings in `utils/global-data.js`

### Deploy Changes

**With GitHub Actions (Automatic):**
```bash
git add .
git commit -m "Update content"
git push origin main
```

**Manual Deployment:**
```bash
bash scripts/build-and-deploy.sh
```

## Environment Variables

You can customize the site using environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `COMPANY_NAME` | Company name | `BigHearted Labs` |
| `TAGLINE` | Company tagline | `Expert Test Automation & CI/CD Solutions` |
| `CONTACT_EMAIL` | Contact email | `contact@bigheartedlabs.com` |
| `FOOTER_TEXT` | Footer copyright text | `All rights reserved.` |

**Set in GitHub Actions:**
Edit `.github/workflows/deploy.yml` and update the `env` section in the build step.

**Set for local builds:**
```bash
export COMPANY_NAME="Your Company Name"
export CONTACT_EMAIL="your@email.com"
npm run export
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run export
```

### SSH Connection Issues

```bash
# Test SSH connection
ssh -i ~/.ssh/your_key your-username@your-server

# Check SSH key permissions
chmod 600 ~/.ssh/your_key
```

### Nginx Issues

```bash
# On server: Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/bigheartedlabs_error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Renew certificate manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates
```

### Permission Issues

```bash
# On server: Fix file permissions
sudo chown -R www-data:www-data /var/www/bigheartedlabs
sudo find /var/www/bigheartedlabs -type d -exec chmod 755 {} \;
sudo find /var/www/bigheartedlabs -type f -exec chmod 644 {} \;
```

### Deployment Script Fails

```bash
# Check if 'out' directory exists
ls -la out/

# Verify SSH key is loaded
ssh-add -l

# Run with verbose output
bash -x scripts/deploy.sh
```

## File Structure

```
bigheartedlabs.com/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── components/                  # React components
├── config/
│   └── nginx/
│       └── bigheartedlabs.conf # Nginx configuration template
├── pages/                       # Next.js pages
├── scripts/
│   ├── server-setup.sh         # Server setup script
│   ├── deploy.sh               # Deployment script
│   └── build-and-deploy.sh     # Build + deploy script
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review Nginx logs: `/var/log/nginx/bigheartedlabs_error.log`
- Check GitHub Actions logs in the Actions tab

## Security Notes

- SSH keys should never be committed to the repository
- Always use HTTPS (SSL) in production
- Keep your server updated: `sudo apt update && sudo apt upgrade`
- Review firewall rules: `sudo ufw status`
- Regularly backup your website: `/var/www/bigheartedlabs`

## Performance Optimization

The site is configured for optimal performance:
- ✅ Static site generation (fast loading)
- ✅ Gzip compression enabled
- ✅ Browser caching configured
- ✅ Optimized asset delivery
- ✅ CDN-ready (static files can be moved to CDN)

## Backup

Create regular backups:

```bash
# On server: Create backup
sudo tar -czf ~/bigheartedlabs-backup-$(date +%Y%m%d).tar.gz /var/www/bigheartedlabs

# Download backup to local machine
scp your-username@your-server:~/bigheartedlabs-backup-*.tar.gz ./backups/
```

Backups are automatically created before each deployment in `/var/www/bigheartedlabs.backup/`.
