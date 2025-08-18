# Smart Screenshot Organizer

Mobile-first screenshot organization app built with Expo React Native + Node.js/Express/Prisma backend.

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp mobile/.env.example mobile/.env
   ```

3. **Initialize database:**
   ```bash
   cd backend
   pnpm prisma:gen
   pnpm prisma:dev
   ```

4. **Run development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && pnpm dev
   
   # Terminal 2 - Mobile
   cd mobile && pnpm start
   ```

## Project Structure

- **`mobile/`** - Expo React Native app
- **`backend/`** - Node.js + Express + Prisma API
- **`shared/`** - TypeScript utilities and types
- **`infra/`** - Environment examples, scripts, and documentation

## Development

- `pnpm lint` - Lint all packages
- `pnpm typecheck` - Type check all packages
- `pnpm test` - Run tests across all packages

## Tech Stack

- **Frontend**: Expo React Native, TypeScript
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Package Manager**: pnpm workspaces
- **CI/CD**: GitHub Actions
