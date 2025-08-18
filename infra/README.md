# Infrastructure & Documentation

This directory contains infrastructure setup, environment examples, scripts, and documentation fragments for the Smart Screenshot Organizer project.

## Directory Structure

```
infra/
├── README.md                 # This file
├── env-examples/            # Environment file templates
├── scripts/                 # Infrastructure scripts
├── docs/                    # Documentation fragments
└── docker/                  # Docker configurations (future)
```

## Environment Setup

### Root Environment
Copy `env-examples/root.env.example` to `.env` in the project root and configure:
- Database connection string
- API configuration
- Development settings

### Backend Environment
Copy `env-examples/backend.env.example` to `backend/.env` and configure:
- Database URL
- JWT secrets
- CORS settings
- File upload limits

### Mobile Environment
Copy `env-examples/mobile.env.example` to `mobile/.env` and configure:
- API base URL
- App configuration
- Debug settings

## Database Setup

1. **Install PostgreSQL** (version 14+ recommended)
2. **Create database**: `createdb screenshot_organizer`
3. **Configure connection** in your environment files
4. **Run migrations**: `cd backend && pnpm prisma:dev`

## Development Workflow

1. **Start backend**: `cd backend && pnpm dev`
2. **Start mobile**: `cd mobile && pnpm start`
3. **Run tests**: `pnpm test` (from root)
4. **Type check**: `pnpm typecheck` (from root)
5. **Lint code**: `pnpm lint` (from root)

## Deployment

### Backend
- Use Node.js 20+
- Set production environment variables
- Run `pnpm build` before deployment
- Use PM2 or similar process manager

### Mobile
- Build with EAS Build or Expo CLI
- Configure production API endpoints
- Test on physical devices before release

## Monitoring & Logging

- Backend logs to console (configure for production)
- Mobile logs to Expo/React Native debugger
- Consider adding structured logging (Winston, Pino)

## Security Notes

- Never commit `.env` files
- Use strong JWT secrets in production
- Implement rate limiting for API endpoints
- Validate all user inputs
- Use HTTPS in production

## Future Enhancements

- Docker containerization
- Kubernetes deployment
- CI/CD pipeline improvements
- Automated testing
- Performance monitoring
- Backup strategies
