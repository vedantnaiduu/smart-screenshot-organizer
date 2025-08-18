#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Bootstrapping Smart Screenshot Organizer monorepo..."

# Initialize git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
else
    echo "📁 Git repository already exists"
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "chore: initial scaffold

- Bootstrap monorepo with pnpm workspaces
- Mobile: Expo React Native app
- Backend: Node.js + Express + Prisma
- Shared: TypeScript utilities and types
- CI/CD: GitHub Actions workflow
- Development tools: ESLint, Prettier, EditorConfig"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

echo ""
echo "✅ Repository initialized successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Add remote origin: git remote add origin <your-repo-url>"
echo "2. Push to remote: git push -u origin main"
echo "3. Install dependencies: pnpm install"
echo "4. Set up environment files from .env.example templates"
echo "5. Run bootstrap script: ./scripts/bootstrap.sh"
echo ""
echo "🎉 Happy coding!"
