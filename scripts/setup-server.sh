#!/bin/bash
# setup-vps.sh - VPS setup script for Docker deployment

set -e

APP_NAME := lsd3-website

echo "🚀 Setting up VPS for Docker deployment..."

# Check if we have sudo access
if ! sudo -n true 2>/dev/null; then
    echo "⚠️  This script requires sudo privileges."
    echo "💡 You may be prompted for your password multiple times."
    echo ""
fi

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
sudo apt install -y curl wget git htop

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "✅ Docker already installed"
fi

# Create swap file for small VPS
if [ ! -f /swapfile ]; then
    echo "💾 Creating swap file (1GB)..."
    sudo fallocate -l 1G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
else
    echo "✅ Swap file already exists"
fi

# Configure Docker daemon for resource limits
echo "⚙️ Configuring Docker daemon..."
sudo mkdir -p /etc/docker
cat << EOF | sudo tee /etc/docker/daemon.json
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    },
    "storage-driver": "overlay2"
}
EOF

# Enable Docker service
sudo systemctl enable docker
sudo systemctl restart docker

# Create application directory
mkdir -p ~/"$APP_NAME"
cd ~/"$APP_NAME"

echo "✅ VPS setup completed!"
echo "📝 Next steps:"
echo "  1. Copy your application files to ~/${APP_NAME}/"
echo "  2. Set environment variables: SERVER_USER and SERVER_HOST"
echo "  3. Run: make deploy-remote"
echo ""
echo "💡 Useful commands:"
echo "  - docker stats          # Monitor resource usage"
echo "  - docker system df      # Check disk usage"
echo "  - sudo swapon --show    # Check swap usage"