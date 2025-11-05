#!/bin/bash

# Kazakçı Frontend Deployment Script
# This script properly builds and deploys the Next.js standalone application

set -e  # Exit on any error

echo "🚀 Starting Kazakçı Frontend Deployment..."
echo "================================================"

# Navigate to project directory
cd /root/Kazakci/kazakci_front-main

# Step 1: Clean old build
echo "📦 Cleaning old build files..."
rm -rf .next

# Step 2: Set environment variables for build
echo "🔧 Setting build environment variables..."
export NODE_ENV=production
export MEDUSA_BACKEND_URL=http://127.0.0.1:9001
export NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://admin.kazakci.com
export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_9d1b98ec1a3a24a815a885d8a2b0283dae2ae99bb0f1b180cec63f7d73de1561
export NEXT_PUBLIC_BASE_URL=https://kazakci.com
export NEXT_PUBLIC_DEFAULT_REGION=tr

# Step 3: Build the application
echo "🔨 Building Next.js application..."
npm run build

# Step 4: Copy static files to standalone directory (CRITICAL!)
echo "📁 Copying static files to standalone build..."
if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/static
    echo "✓ Static files copied"
else
    echo "❌ ERROR: .next/static directory not found!"
    exit 1
fi

# Step 5: Copy public folder to standalone directory
echo "📁 Copying public files to standalone build..."
if [ -d "public" ]; then
    cp -r public .next/standalone/public
    echo "✓ Public files copied"
else
    echo "⚠️  WARNING: public directory not found (this is OK if no public assets)"
fi

# Step 6: Verify deployment structure
echo ""
echo "🔍 Verifying deployment structure..."
if [ -d ".next/standalone/.next/static" ]; then
    echo "✓ Static files present in standalone"
else
    echo "❌ ERROR: Static files missing in standalone!"
    exit 1
fi

# Step 7: Restart the service
echo ""
echo "🔄 Restarting kazakci-frontend service..."
systemctl restart kazakci-frontend

# Step 8: Wait and check service status
sleep 3
if systemctl is-active --quiet kazakci-frontend; then
    echo "✓ Service is running"
else
    echo "❌ ERROR: Service failed to start!"
    journalctl -u kazakci-frontend -n 20 --no-pager
    exit 1
fi

echo ""
echo "================================================"
echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Service Status:"
systemctl status kazakci-frontend --no-pager | head -10
echo ""
echo "🌐 Site: https://kazakci.com"
echo ""
