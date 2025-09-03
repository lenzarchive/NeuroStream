# NeuroStream - Full Stack Next.js

A sophisticated full-stack web application built with Next.js 14, featuring user authentication, real-time posts, and modern development practices.

## Features

- **Authentication System**: Secure user registration and login with JWT tokens
- **Real-time Posts**: Create and view posts instantly
- **Modern UI**: Responsive design with Tailwind CSS and gradient backgrounds
- **Database Integration**: SQLite database with Prisma ORM
- **Security**: Password hashing with bcrypt, secure token validation
- **TypeScript**: Full type safety throughout the application
- **CI/CD Pipeline**: Automated testing, security scanning, and deployment
- **Docker Support**: Containerized application with multi-platform builds

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - User interface library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Modern database toolkit and ORM
- **SQLite** - Embedded database (development)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization
- **Vercel** - Deployment platform
- **CodeQL** - Security analysis
- **Dependabot** - Automated dependency updates

## Quick Start

### Prerequisites
- Node.js 18.x or 20.x
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lenzarchive/neurostream.git
   cd neurostream
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-super-secret-jwt-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Initialize Tailwind CSS**
   ```bash
   npx tailwindcss init -p
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── .github/
│   ├── workflows/          # GitHub Actions CI/CD
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── pull_request_template.md
├── lib/
│   ├── auth.ts            # Authentication utilities
│   └── db.ts              # Database connection
├── pages/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── posts/         # Posts API endpoints
│   └── index.tsx          # Main application page
├── prisma/
│   └── schema.prisma      # Database schema
├── styles/
│   └── globals.css        # Global styles
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Local development with Docker
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Retrieve all published posts
- `POST /api/posts` - Create new post (authenticated)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database in browser
npx prisma studio

# Reset database
npx prisma db push --force-reset
```

### Docker Development

```bash
# Build Docker image
docker build -t neurostream .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables**
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `DATABASE_URL` (for production database)

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Docker Deployment

```bash
# Build production image
docker build -t neurostream:latest .

# Run production container
docker run -p 3000:3000 \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="https://yourdomain.com" \
  -e DATABASE_URL="your-production-db-url" \
  neurostream:latest
```

## Security

- Passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens expire after 1 day
- SQL injection prevention through Prisma ORM
- Input validation on all API endpoints
- HTTPS enforcement in production
- Security headers configured
- Automated vulnerability scanning with CodeQL

## Contributing

1. Fork the repository
2. Clone to your local machine (`git clone https://github.com/yourname/neurostream.git`)
3. Make your changes directly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to main branch (`git push origin main`)
6. Create a Pull Request from your fork

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Monitoring

- GitHub Actions for CI/CD monitoring
- Vercel Analytics for performance metrics
- Error tracking with built-in Next.js error boundaries
- Security monitoring with Dependabot and CodeQL

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first approach
- Vercel for seamless deployment experience

## Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/lenzarchive/neurostream/issues) page
2. Create a new issue using the provided templates
3. Join our community discussions

---

**Built with ❤️ by AlwizBA using modern web technologies**
