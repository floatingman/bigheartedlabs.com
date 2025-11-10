![Next.js Blog Theme designed by Bejamas](github-banner.svg)

A customizable blog starter using:

- [Next.js](https://github.com/vercel/next.js) v12
- [Tailwind](https://tailwindcss.com/) v3.0
- Built-in [MDX](https://mdxjs.com/) v1 support
- Includes modern design with dark & light themes

![Preview of blog theme. Author named Jay Doe and blog's name is "Next.js Blog Theme" with one blog post](nextjs-blog-theme-preview.png)

[Click here to watch the template walkthrough!](https://www.youtube.com/watch?v=63QZHs259dY)

## Getting Started

---

### Setting Up Locally

Start by cloning this repository and navigating to it in your terminal.

From there, you can install the project's dependencies by running:

```shell
yarn install
```

Finally, you can run your project locally with:

```shell
yarn run dev
```

Open your browser and visit <http://localhost:3000>, your project should be running!

## Configuring the blog

The config is based on environment variables to make it easy to integrate with any Jamstack platform.

Here are the variables you can edit:
| Variable | Description | Options
| --- | --- | --- |
| `BLOG_NAME` | the name of your blog, displayed below the avatar ||
| `BLOG_TITLE` | the main header (`h1`) on the home page ||
| `BLOG_FOOTER_TEXT`| the text in the footer ||
| `BLOG_THEME` | the theme to pass to Tailwind | default |
| `BLOG_FONT_HEADINGS` | the font-family for all HTML headings, from `h1` to `h6`| sans-serif (default), serif, monospace|
| `BLOG_FONT_PARAGRAPHS` | the font-family for all other HTML elements | sans-serif (default), serif, monospace|

All of the env variables can be configured through setting the project's environment variables in your deployment platform or locally in `.env` files.

If setting an environment variable isn't your cup of tea, the defaults can be changed in [`utils/global-data.js`](/utils/global-data.js). You can also remove the variables and hard code blog information where these variables are used in the code base.

- `BLOG_THEME, BLOG_FONT_HEADINGS, & BLOG_FONT_PARAGRAPHS` are used in [`tailwind-preset.js`](tailwind-preset.js)
- `BLOG_NAME, BLOG_TITLE, BLOG_FOOTER_TEXT` are used in [`pages/index.js`](pages/index.js) & [`pages/posts/[slug].js`](pages/posts/[slug].js) through the `globalData` object.

## Adding new posts

All posts are stored in `/posts` directory. To make a new post, create a new file with the [`.mdx` extension](https://mdxjs.com/).

Since the posts are written in `MDX` format you can pass props and components. That means you can use [React components](https://reactjs.org/docs/components-and-props.html) inside your posts to make them more interactive. Learn more about how to do so in the [MDX docs on content](https://mdxjs.com/docs/using-mdx/#components).

https://user-images.githubusercontent.com/3611928/152727802-102ec296-41c8-446d-93ed-922d11187073.mp4

[alt: video walkthrough of adding a new blog post]

## Deployment

---

### Docker Deployment

This project is configured for Docker-based deployment using a multi-stage build process. The Docker image builds the Next.js static site and serves it with nginx.

#### Building the Docker Image

To build the Docker image locally:

```shell
docker build -t bigheartedlabs:latest .
```

#### Running with Docker

To run the container locally:

```shell
docker run -p 8080:80 bigheartedlabs:latest
```

Your site will be available at <http://localhost:8080>

#### Deploying with Docker Compose

The project includes a `docker-compose.yml` file configured for production deployment with Traefik reverse proxy.

1. **Configure environment variables** (optional):
   - `DOMAIN` - Your domain name (default: bigheartedlabs.com)
   - `WWW_DOMAIN` - Set to enable www redirect
   - `CERT_RESOLVER` - Traefik cert resolver name (default: mytlschallenge)
   - `TRAEFIK_NETWORK` - Your Traefik network name (if using external network)

2. **Deploy the service**:

```shell
docker-compose up -d
```

The service will automatically:
- Pull the latest image from GitHub Container Registry
- Configure Traefik labels for routing and SSL
- Set up security headers
- Enable health checks

#### CI/CD Deployment

The project uses GitHub Actions for automated deployment. When code is pushed to the main/master branch:

1. **Build Stage**: A Docker image is built and pushed to GitHub Container Registry (ghcr.io)
2. **Deploy Stage**: The image is deployed to your server via SSH

**Required GitHub Secrets**:

Configure these secrets in your repository settings (Settings → Secrets and variables → Actions):

**Application Secrets** (used during build):
| Secret | Description | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` | n8n webhook URL for contact form (see `CONTACT_FORM_SETUP.md`) | **Yes** |
| `COMPANY_NAME` | Company name (default: "Big Hearted Labs") | No |
| `TAGLINE` | Company tagline | No |
| `CONTACT_EMAIL` | Contact email address | No |
| `FOOTER_TEXT` | Footer text | No |

**Deployment Secrets** (for automated deployment):
| Secret | Description | Required |
| --- | --- | --- |
| `DEPLOY_HOST` | The hostname or IP address of your deployment server | Yes |
| `DEPLOY_USER` | The SSH user for deployment (e.g., `deploy` or `ubuntu`) | Yes |
| `DEPLOY_PATH` | The path to your docker-compose.yml on the server (e.g., `/opt/bigheartedlabs`) | Yes |
| `SSH_PRIVATE_KEY` | The SSH private key for authentication | Yes |

> **⚠️ Important**: The contact form will not work until `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` is configured. See `WEBHOOK_QUICKFIX.md` for setup instructions.

**Deployment Process**:

The automated deployment:
1. Validates that all required secrets are configured
2. Sets up SSH authentication
3. Logs into GitHub Container Registry on the remote server
4. Pulls the latest Docker image
5. Restarts the container using docker-compose
6. Cleans up old Docker images
7. Verifies the deployment

**Manual Deployment Trigger**:

You can also manually trigger a deployment from the Actions tab by selecting "Build and Deploy" and clicking "Run workflow".

#### Server Setup Requirements

Your deployment server should have:
- Docker and docker-compose installed
- Traefik reverse proxy configured (if using Traefik labels)
- SSH access configured for the deployment user
- The `docker-compose.yml` file in the `DEPLOY_PATH` directory
