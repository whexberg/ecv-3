#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="lordsholtodouglas.com"
EMAIL="william@thenerdbiker.com"
STAGING=0

# Usage function
usage() {
    echo "Usage: $(basename "$0") [options]"
    echo
    echo "Options:"
    echo "  -d, --domain DOMAIN Override default domain name (e.g., example.com)"
    echo "  -e, --email EMAIL   Override default email address for Let's Encrypt"
    echo "  -s, --staging       Use staging environment (for testing)"
    echo "  -h, --help          Show this help message"
    exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--domain)
            DOMAIN="$2"
            shift 2
            ;;
        -e|--email)
            EMAIL="$2"
            shift 2
            ;;
        -s|--staging)
            STAGING=1
            shift
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            usage
            ;;
    esac
done

# Validate required arguments
if [ -z "${DOMAIN}" ] || [ -z "${EMAIL}" ]; then
    echo -e "${RED}❌ Domain and email are required${NC}"
    usage
fi

echo -e "${BLUE}🔒 Setting up SSL for $DOMAIN${NC}"

# Check for required template files
if [ ! -f nginx/site.conf ]; then
    echo -e "${RED}❌ nginx/site.conf template not found. Please create it first.${NC}"
    exit 1
fi

# Ensure nginx config directory exists
mkdir -p nginx/conf.d

# Make sure we have the HTTP-only config for certificate challenge
echo -e "${BLUE}📝 Ensuring HTTP configuration for certificate challenge...${NC}"
cat > nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name $DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://nextjs:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Restart nginx to ensure it has the latest config
# Check if nginx is running
if ! docker compose ps nginx | grep -q "running"; then
    echo -e "${YELLOW}⚠️ Starting nginx...${NC}"
    docker compose up -d nginx
else
    echo -e "${BLUE}🔄 Restarting nginx...${NC}"
    docker compose restart nginx
fi

# Wait for nginx to be ready
echo -e "${BLUE}⏳ Waiting for nginx to be ready...${NC}"
sleep 10

# Request SSL certificate
echo -e "${BLUE}📜 Requesting SSL certificate...${NC}"

if [ $STAGING -eq 1 ]; then
    echo -e "${YELLOW}⚠️ Using Let's Encrypt staging environment${NC}"
    CERTBOT_ARGS="--staging"
else
    CERTBOT_ARGS=""
fi

docker compose run --rm certbot-run certonly \
    -v \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "${EMAIL}" \
    --agree-tos \
    --no-eff-email \
    "${CERTBOT_ARGS}" \
    -d "${DOMAIN}"

# Update nginx config to use SSL
echo -e "${BLUE}🔧 Updating nginx configuration for SSL...${NC}"
sed "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" nginx/site.conf > nginx/conf.d/default.conf

# Restart nginx with SSL configuration
echo -e "${BLUE}🔄 Restarting nginx with SSL...${NC}"
docker compose restart nginx

# Start certbot for auto-renewal
echo -e "${BLUE}🔄 Starting certbot for auto-renewal...${NC}"
docker compose up -d certbot

# Test SSL certificate
echo -e "${BLUE}🧪 Testing SSL certificate...${NC}"
sleep 5

if curl -f -s -I "https://${DOMAIN}" > /dev/null; then
    echo -e "${GREEN}✅ SSL certificate is working!${NC}"
    echo -e "${GREEN}🌐 Your site is now available at: https://${DOMAIN}${NC}"
else
    echo -e "${YELLOW}⚠️ SSL test failed, but certificate may still be valid${NC}"
    echo -e "${YELLOW}Please check https://${DOMAIN} manually${NC}"
fi

echo -e "${GREEN}✅ SSL setup completed!${NC}"