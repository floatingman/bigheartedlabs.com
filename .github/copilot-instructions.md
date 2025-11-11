# GitHub Copilot Instructions for Big Hearted Labs Website

## Project Overview

This is a Next.js-based company website for Big Hearted Labs, built using:
- **Next.js v12** - Static site generation framework
- **Tailwind CSS v3.0** - Utility-first CSS framework
- **MDX v1** - Markdown with React components support
- **Docker** - Containerized deployment with nginx
- **GitHub Actions** - Automated CI/CD pipeline

The site is a static export deployed via Docker, featuring services pages, contact form, and company information.

## Repository Structure

```
.
├── .github/              # GitHub Actions workflows and configurations
├── components/           # React components
├── pages/               # Next.js pages (routes)
│   ├── index.js         # Homepage
│   ├── about.js         # About page
│   ├── contact.js       # Contact page
│   └── services.js      # Services page
├── styles/              # Global styles and CSS modules
├── utils/               # Utility functions and configurations
│   ├── global-data.js   # Global configuration and environment variables
│   └── tailwind-preset.js # Tailwind configuration preset
├── scripts/             # Deployment and build scripts
├── config/              # Application configuration
└── public/              # Static assets

Note: This repository does NOT have a /posts directory (blog functionality has been removed)
```

## Technology Stack & Dependencies

### Core Dependencies
- `next@latest` - React framework for production
- `react@^17.0.2` & `react-dom@^17.0.2` - React library
- `@tailwindcss/typography@^0.5.0` - Typography plugin for Tailwind
- `tailwindcss@^3.0.0` - CSS framework
- `next-mdx-remote@^3.0.1` - MDX support for Next.js
- `gray-matter@^4.0.2` - Front matter parsing
- `classnames@^2.3.1` - CSS class utility

### Dev Dependencies
- `eslint@<8.0.0` - Linter
- `eslint-config-next@12.0.10` - Next.js ESLint config
- `eslint-config-prettier@^8.3.0` - Prettier integration
- `postcss@^8.4.4` & `autoprefixer@^10.4.0` - CSS processing

## Code Style & Standards

### JavaScript/JSX
- **Style**: Follow existing patterns in the codebase
- **Quotes**: Single quotes for strings (enforced by Prettier)
- **Semicolons**: Always use semicolons (Prettier config)
- **Indentation**: 2 spaces (enforced by Prettier)
- **Line Width**: 80 characters max (Prettier config)
- **Naming**: 
  - Components: PascalCase (e.g., `ContactForm.js`)
  - Utilities: camelCase (e.g., `getGlobalData()`)
  - Files: Match component/utility name

### ESLint Configuration
- Extends `next/core-web-vitals` and `prettier`
- Run: `npm run lint` to check for issues

### Prettier Configuration
```javascript
{
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false
}
```

### Component Patterns
- Use functional components with hooks
- Keep components focused and single-responsibility
- Place reusable components in `/components`
- Use CSS modules for component-specific styles (e.g., `Layout.module.css`)

### File Organization
- One component per file
- Group related utilities in `/utils`
- Keep pages lean, move logic to components or utilities

## Environment Variables

The project uses environment variables for configuration. All variables are optional with sensible defaults in `utils/global-data.js`:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` | n8n webhook URL for contact form | Yes (for contact form) |
| `COMPANY_NAME` | Company name (default: "Big Hearted Labs") | No |
| `TAGLINE` | Company tagline | No |
| `CONTACT_EMAIL` | Contact email address | No |
| `FOOTER_TEXT` | Footer text | No |
| `BLOG_THEME` | Theme for Tailwind | No |
| `BLOG_FONT_HEADINGS` | Font family for headings | No |
| `BLOG_FONT_PARAGRAPHS` | Font family for paragraphs | No |

## Build & Development

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run dev:watch    # Dev server with file watching
```

### Production Build
```bash
npm run build        # Build Next.js application
npm run export       # Export static site to /out directory
npm start            # Start production server
```

### Linting
```bash
npm run lint         # Run ESLint
```

### Pre-build Checks
- `scripts/check-env.js` runs before build and export to validate environment variables
- Ensures required environment variables are set

## Docker Deployment

### Build & Run
```bash
docker build -t bigheartedlabs:latest .
docker run -p 8080:80 bigheartedlabs:latest
```

### Docker Compose
```bash
docker-compose up -d  # Start services
docker-compose down   # Stop services
```

The Docker setup uses:
- Multi-stage build (Node.js build, nginx serve)
- Nginx to serve static files
- Traefik integration for reverse proxy and SSL
- Health checks for container monitoring

### Environment Variables in Docker
Set in `docker-compose.yml` or pass during build:
```bash
docker build --build-arg NEXT_PUBLIC_CONTACT_WEBHOOK_URL=https://... .
```

## CI/CD Pipeline

### GitHub Actions Workflow
Location: `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` or `master` branch
- Manual workflow dispatch

**Process:**
1. Checkout code
2. Set up Node.js
3. Install dependencies
4. Build Next.js app
5. Build Docker image
6. Push to GitHub Container Registry (ghcr.io)
7. Deploy to server via SSH

**Required GitHub Secrets:**
- `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` - Contact form webhook URL
- `DEPLOY_HOST` - Deployment server hostname/IP
- `DEPLOY_USER` - SSH user for deployment
- `DEPLOY_PATH` - Path to docker-compose.yml on server
- `SSH_PRIVATE_KEY` - SSH private key for authentication
- Optional: `COMPANY_NAME`, `TAGLINE`, `CONTACT_EMAIL`, `FOOTER_TEXT`

## Key Components

### Pages
- **index.js** - Homepage with services overview
- **about.js** - About the company
- **contact.js** - Contact form page
- **services.js** - Detailed services information

### Components
- **Layout.js** - Main layout wrapper with header and footer
- **Header.js** - Navigation header
- **Footer.js** - Site footer
- **ContactForm.js** - Contact form with webhook integration
- **ServiceCard.js** - Service display card
- **SEO.js** - SEO metadata component
- **Button.js** - Reusable button component
- **CustomLink.js** - Custom link component
- **ArrowIcon.js** - Arrow icon component

### Utilities
- **global-data.js** - Global configuration and environment variable processing
- **tailwind-preset.js** - Tailwind CSS preset configuration

## Common Development Tasks

### Adding a New Page
1. Create new file in `/pages` (e.g., `new-page.js`)
2. Use Layout component for consistency
3. Add navigation link in `Header.js` if needed
4. Test locally with `npm run dev`

### Adding a New Component
1. Create component file in `/components` (PascalCase)
2. Follow existing component patterns
3. Add CSS module if needed (`.module.css`)
4. Import and use in pages/components

### Updating Styles
1. Use Tailwind utility classes where possible
2. Create CSS modules for component-specific styles
3. Global styles go in `/styles/globals.css`
4. Tailwind config is in `tailwind.config.js`

### Modifying Configuration
- **Global settings**: Edit `utils/global-data.js`
- **Tailwind theme**: Edit `utils/tailwind-preset.js`
- **Next.js config**: Edit `next.config.js`
- **Environment variables**: Add to `.env.local` or deployment secrets

## Contact Form Integration

The contact form requires an n8n webhook setup. See `CONTACT_FORM_SETUP.md` for detailed instructions.

**Quick reference:**
1. Set up n8n webhook workflow
2. Configure `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` environment variable
3. Rebuild the application
4. The form in `components/ContactForm.js` handles submission

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Run `npm run lint` to identify code issues
- Ensure all dependencies are installed: `npm install`

### Contact Form Not Working
- Verify `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` is set
- Check webhook endpoint is accessible
- Review browser console for errors
- See `WEBHOOK_QUICKFIX.md` for troubleshooting

### Docker Issues
- Ensure build args are passed correctly
- Check nginx configuration in Dockerfile
- Verify port mappings (default: 80)
- Review container logs: `docker logs <container-id>`

### Deployment Issues
- Verify GitHub secrets are configured correctly
- Check SSH connectivity to deployment server
- Review GitHub Actions logs
- Ensure server has Docker and docker-compose installed

## Testing

Currently, the project does not have automated tests. When adding tests:
- Follow Next.js testing best practices
- Use Jest and React Testing Library
- Place tests alongside components: `Component.test.js`
- Run tests before committing changes

## Security Considerations

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Keep dependencies updated (Renovate is configured)
- Use HTTPS in production (handled by Traefik/nginx)
- Validate all user inputs (especially in contact form)

## Documentation

Key documentation files:
- **README.md** - Main documentation and overview
- **QUICKSTART.md** - Fast setup guide (15 minutes)
- **DEPLOYMENT.md** - Comprehensive deployment guide
- **CONTACT_FORM_SETUP.md** - Contact form webhook setup
- **ENVIRONMENT_SETUP.md** - Environment variable details
- **TRAEFIK_INTEGRATION.md** - Traefik reverse proxy setup
- **WEBHOOK_QUICKFIX.md** - Quick webhook troubleshooting

## Best Practices

1. **Before making changes:**
   - Read relevant documentation
   - Understand existing patterns
   - Check for similar implementations

2. **When writing code:**
   - Follow existing code style
   - Keep changes minimal and focused
   - Test locally before committing
   - Run linter to catch issues

3. **Component development:**
   - Keep components small and reusable
   - Use props for configuration
   - Document complex logic with comments
   - Consider accessibility (a11y)

4. **Styling:**
   - Prefer Tailwind utilities over custom CSS
   - Use semantic class names
   - Ensure responsive design (mobile-first)
   - Test dark mode if theme supports it

5. **Commits:**
   - Write clear, descriptive commit messages
   - Reference issues if applicable
   - Keep commits focused and atomic
   - Test builds before pushing

## Common Pitfalls to Avoid

- ❌ Don't add blog-related functionality (no /posts directory exists)
- ❌ Don't modify environment variable handling without updating docs
- ❌ Don't skip the pre-build checks (check-env.js)
- ❌ Don't use inline styles (use Tailwind or CSS modules)
- ❌ Don't commit `.env.local` or other environment files
- ❌ Don't break the Docker build by changing file structure without updating Dockerfile
- ❌ Don't modify global styles without considering all pages
- ❌ Don't add heavy dependencies without justification

## Additional Resources

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- MDX Documentation: https://mdxjs.com/
- Docker Documentation: https://docs.docker.com/
- GitHub Actions Documentation: https://docs.github.com/en/actions

## Getting Help

If you need assistance:
1. Check the documentation files listed above
2. Review similar implementations in the codebase
3. Search closed issues and PRs in the repository
4. Consult the official documentation for the relevant technology
