# Integrating BigHearted Labs with Your Existing Traefik Setup

This guide shows you how to add the BigHearted Labs website to your existing Traefik docker-compose.yml.

## Quick Integration

You have two options for deploying with your existing Traefik:

### Option 1: Add to Existing docker-compose.yml (Recommended)

Simply add the `bigheartedlabs` service to your existing docker-compose.yml file:

```yaml
version: "3.7"

services:
  traefik:
    # ... your existing Traefik configuration ...

  n8n:
    # ... your existing n8n configuration ...

  bigheartedlabs:
    build:
      context: ./bigheartedlabs.com  # Path to this repository
      dockerfile: Dockerfile
    container_name: bigheartedlabs-web
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bigheartedlabs.rule=Host(`${DOMAIN}`)"
      - "traefik.http.routers.bigheartedlabs.entrypoints=web,websecure"
      - "traefik.http.routers.bigheartedlabs.tls=true"
      - "traefik.http.routers.bigheartedlabs.tls.certresolver=mytlschallenge"
      - "traefik.http.services.bigheartedlabs.loadbalancer.server.port=80"
      # Security headers
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.framedeny=true"
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.browserxssfilter=true"
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.contenttypenosniff=true"
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.sslredirect=true"
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.stsSeconds=315360000"
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.stsIncludeSubdomains=true"
      - "traefik.http.middlewares.bigheartedlabs-headers.headers.stsPreload=true"
      - "traefik.http.routers.bigheartedlabs.middlewares=bigheartedlabs-headers@docker"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s

volumes:
  traefik_data:
    external: true
  n8n_data:
    external: true
```

Then add `DOMAIN=bigheartedlabs.com` to your `.env` file and run:

```bash
docker-compose up -d bigheartedlabs
```

### Option 2: Separate docker-compose.yml File

If you prefer to keep the BigHearted Labs deployment separate:

1. Clone this repository to your server:
```bash
cd ~/git
git clone https://github.com/floatingman/bigheartedlabs.com.git
cd bigheartedlabs.com
```

2. Create a `.env` file:
```bash
cp .env.example .env
nano .env
```

3. Set the domain in `.env`:
```bash
DOMAIN=bigheartedlabs.com
CERT_RESOLVER=mytlschallenge
```

4. Ensure the network configuration is set (by default, both will be on the same Docker bridge network):
```bash
docker-compose up -d
```

**Important**: When using separate docker-compose files, they must be able to reach each other. Since you didn't define custom networks in your existing setup, both compose stacks will use the default Docker bridge network and can communicate.

If you want to use a custom network, you can:

1. Create a shared network:
```bash
docker network create traefik
```

2. Update your main docker-compose.yml to use it:
```yaml
services:
  traefik:
    networks:
      - traefik
  n8n:
    networks:
      - traefik

networks:
  traefik:
    external: true
```

3. Uncomment the networks section in the BigHearted Labs docker-compose.yml

## Environment Variables

Add these to your `.env` file:

```bash
# BigHearted Labs Configuration
DOMAIN=bigheartedlabs.com
CERT_RESOLVER=mytlschallenge
```

If you want to support both apex and www domains:
```bash
DOMAIN=bigheartedlabs.com
WWW_DOMAIN=true
```

This will make the site accessible at both `bigheartedlabs.com` and `www.bigheartedlabs.com`.

## Testing

After deployment, verify:

```bash
# Check container is running
docker ps | grep bigheartedlabs

# Check logs
docker logs bigheartedlabs-web

# Test the site
curl -I https://bigheartedlabs.com
```

## Updating

To update the website content:

```bash
cd ~/git/bigheartedlabs.com
git pull
docker-compose up -d --build
```

Or if integrated into your main docker-compose.yml:

```bash
cd ~/your-main-compose-directory
docker-compose up -d --build bigheartedlabs
```

## Troubleshooting

### Container won't start
```bash
docker logs bigheartedlabs-web
```

### Traefik not routing
```bash
# Check Traefik can see the container
docker logs traefik | grep bigheartedlabs

# Verify labels are correct
docker inspect bigheartedlabs-web | grep traefik
```

### Certificate not generating
Make sure:
- Port 443 is open on your firewall
- DNS points to your server
- Certificate resolver name matches: `mytlschallenge`

```bash
# Check Traefik cert storage
docker exec traefik cat /letsencrypt/acme.json | jq
```
