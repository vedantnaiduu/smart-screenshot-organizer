# 🚀 Smart Screenshot Organizer - Setup Guide

## 📋 Prerequisites

- **Node.js** 20+ 
- **pnpm** 9.0.0+
- **PostgreSQL** 14+
- **Expo CLI** (for mobile development)

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
# Root dependencies
pnpm install

# Backend dependencies
cd backend && pnpm install

# Mobile dependencies  
cd ../mobile && pnpm install

# Return to root
cd ..
```

### 2. Environment Setup

```bash
# Copy environment files
cp env.example .env
cp backend/env.example backend/.env
cp mobile/env.example mobile/.env

# Edit .env files with your configuration
# - Update DATABASE_URL with your PostgreSQL credentials
# - Set JWT_SECRET for backend
# - Configure API endpoints
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb screenshot_organizer

# Generate Prisma client
cd backend && pnpm prisma:gen

# Run database migrations
pnpm prisma:dev
```

### 4. Initialize Git Repository

```bash
# Make bootstrap script executable (if not already)
chmod +x scripts/bootstrap.sh

# Run bootstrap script
./scripts/bootstrap.sh
```

## 🚀 Running the Application

### Backend Development Server

```bash
cd backend
pnpm dev
# Server will start on http://localhost:4000
# Health check: http://localhost:4000/health
```

### Mobile Development Server

```bash
cd mobile
pnpm start
# Expo DevTools will open in browser
# Scan QR code with Expo Go app on your device
```

## 🧪 Development Commands

### From Root Directory

```bash
# Type checking across all packages
pnpm typecheck

# Linting across all packages  
pnpm lint

# Run tests (when implemented)
pnpm test

# Build all packages
pnpm build
```

### Backend Commands

```bash
cd backend

# Development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Prisma commands
pnpm prisma:gen    # Generate Prisma client
pnpm prisma:dev    # Run migrations in development
pnpm prisma:studio # Open Prisma Studio (database GUI)
```

### Mobile Commands

```bash
cd mobile

# Start Expo development server
pnpm start

# Run on specific platform
pnpm android  # Android emulator/device
pnpm ios      # iOS simulator/device
pnpm web      # Web browser

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## 🔧 Configuration

### Database Connection

Update `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/screenshot_organizer"
```

### API Endpoints

Update `mobile/.env`:
```env
EXPO_PUBLIC_API_BASE=http://localhost:4000
```

### CORS Settings

Update `backend/.env`:
```env
CORS_ORIGIN="http://localhost:3000,http://localhost:8081"
```

## 📱 Mobile Development

### Expo Go App
- Install Expo Go on your mobile device
- Scan QR code from Expo DevTools
- App will reload automatically on changes

### Simulator/Emulator
- **iOS**: Install Xcode and iOS Simulator
- **Android**: Install Android Studio and Android Emulator

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change `PORT` in backend `.env`
2. **Database connection failed**: Check PostgreSQL is running and credentials
3. **Mobile build errors**: Clear Expo cache with `expo start -c`
4. **Prisma errors**: Run `pnpm prisma:gen` after schema changes

### Reset Development Environment

```bash
# Clear all node_modules
pnpm -r exec rm -rf node_modules
pnpm install

# Reset database
cd backend
pnpm prisma migrate reset
pnpm prisma:dev

# Clear Expo cache
cd ../mobile
expo start -c
```

## 📚 Next Steps

1. **Implement Authentication**: Add Firebase Auth or JWT
2. **File Upload**: Implement screenshot upload to backend
3. **OCR Integration**: Connect Google Vision API
4. **Testing**: Add Jest/Testing Library tests
5. **CI/CD**: Enhance GitHub Actions workflow
6. **Deployment**: Deploy backend to cloud platform

## 🆘 Support

- Check the [README.md](./README.md) for project overview
- Review [infra/README.md](./infra/README.md) for infrastructure details
- Open GitHub issues for bugs or feature requests

---

**Happy coding! 🎉**
