#!/bin/bash

# Dockploy Setup Script
# This script helps you set up environment variables for deployment

echo "🚀 Dockploy Setup for TFC Geo Bolt V2"
echo "======================================"
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "📋 Found existing .env file"
    echo "Do you want to use it as a base? (y/n)"
    read -r use_existing
    if [ "$use_existing" = "y" ] || [ "$use_existing" = "Y" ]; then
        echo "Loading existing .env file..."
        export $(cat .env | grep -v '^#' | xargs)
    fi
fi

echo ""
echo "🔧 Setting up environment variables for Dockploy deployment..."
echo ""

# Function to prompt for environment variable
prompt_env_var() {
    local var_name=$1
    local description=$2
    local current_value=${!var_name}
    
    echo "📝 $description"
    if [ -n "$current_value" ]; then
        echo "Current value: $current_value"
        echo "Press Enter to keep current value, or type new value:"
    else
        echo "Enter value:"
    fi
    read -r new_value
    
    if [ -n "$new_value" ]; then
        export "$var_name=$new_value"
        echo "✅ Set $var_name"
    elif [ -n "$current_value" ]; then
        echo "✅ Kept existing value for $var_name"
    else
        echo "❌ $var_name is required!"
        exit 1
    fi
    echo ""
}

# Prompt for each required environment variable
prompt_env_var "NEXT_PUBLIC_SUPABASE_URL" "Supabase Project URL (e.g., https://your-project.supabase.co)"
prompt_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "Supabase Anonymous Key (public key)"
prompt_env_var "SUPABASE_SERVICE_ROLE_KEY" "Supabase Service Role Key (private key)"
prompt_env_var "NEXT_PUBLIC_APP_URL" "Your app URL (should be: https://fansdock.xenpac.org:3009)"
prompt_env_var "NEXT_PUBLIC_MANIFEST_PUBLIC_KEY" "Manifest Public Key (for payments)"
prompt_env_var "MANIFEST_API_KEY" "Manifest API Key (for payments)"
prompt_env_var "MANIFEST_WEBHOOK_SECRET" "Manifest Webhook Secret (for payments)"

echo "✅ All environment variables configured!"
echo ""

# Save to .env file
echo "💾 Saving environment variables to .env file..."
cat > .env << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY

# Application Configuration
NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Manifest Payment Configuration
NEXT_PUBLIC_MANIFEST_PUBLIC_KEY=$NEXT_PUBLIC_MANIFEST_PUBLIC_KEY
MANIFEST_API_KEY=$MANIFEST_API_KEY
MANIFEST_WEBHOOK_SECRET=$MANIFEST_WEBHOOK_SECRET

# Production Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
EOF

echo "✅ Environment variables saved to .env"
echo ""

# Make deployment script executable
chmod +x deploy-dockploy.sh

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Review your .env file to ensure all values are correct"
echo "   2. Run: ./deploy-dockploy.sh"
echo "   3. Your app will be available at: https://fansdock.xenpac.org:3009"
echo ""
echo "🔍 To check deployment status: https://fansdock.xenpac.org/dashboard" 