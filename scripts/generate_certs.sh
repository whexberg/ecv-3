#!/bin/bash

# Set domain and paths
DOMAIN="lordsholtodouglas.com"
API_SUBDOMAIN="api.lordsholtodouglas.com"
CERT_DIR="./conf/letsencrypt/live/$DOMAIN"
DHPARAM_FILE="./conf/nginx/dhparam.pem"

# Ensure mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "Error: mkcert is not installed. Install it with 'brew install mkcert' or follow the setup instructions."
    exit 1
fi

# Create necessary directories
mkdir -p "$CERT_DIR"

# Generate SSL certificates for both domain and subdomain
echo "Generating SSL certificates for $DOMAIN and $API_SUBDOMAIN..."
mkcert -cert-file "$CERT_DIR/fullchain.pem" \
       -key-file "$CERT_DIR/privkey.pem" \
       "$DOMAIN" "$API_SUBDOMAIN"

# Generate chain.pem (Let's Encrypt structure)
echo "Generating chain.pem..."
mkcert -CAROOT > /tmp/mkcert_caroot.txt
CAROOT_PATH=$(cat /tmp/mkcert_caroot.txt | head -n 1)
cp "$CAROOT_PATH/rootCA.pem" "$CERT_DIR/chain.pem"
rm /tmp/mkcert_caroot.txt

# Generate Diffie-Hellman parameters if not exists
if [ ! -f "$DHPARAM_FILE" ]; then
    echo "Generating Diffie-Hellman parameters (this may take a while)..."
    openssl dhparam -out "$DHPARAM_FILE" 2048
else
    echo "Skipping DH param generation (already exists)."
fi

echo "SSL certificates and keys have been placed in $CERT_DIR"
