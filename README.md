# TrustGuide — Verified Answers Platform

> Find truth. Avoid scams. Make informed decisions.

TrustGuide is a full-stack web application that helps people find trustworthy, fact-based answers to common online questions while avoiding scams, misinformation, and fake opportunities.

## 🚀 Features

- **Smart Search** — Search across verified guides and community Q&A
- **Verified Guides** — Fact-checked, expert-reviewed articles with trust scores
- **Scam Checker** — Real-time analysis of websites, emails, phones, and businesses
- **AI Assistant** — Intelligent chatbot powered by verified knowledge base
- **Community** — Ask questions, share answers, vote, and discuss
- **User Dashboard** — Bookmarks, history, notifications, achievements
- **Admin CMS** — Full content management, user moderation, analytics
- **Multi-Language** — English, French, Kinyarwanda (more coming)
- **Dark Mode** — Light/dark theme support
- **PWA Ready** — Progressive Web App with offline support
- **Responsive** — Mobile-first design, works on all devices

## 🏗️ Tech Stack

### Frontend
- **React 19** + **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + **Shadcn UI** components
- **Framer Motion** — animations
- **next-themes** — dark mode
- **react-hot-toast** — notifications
- **lucide-react** — icons

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **Prisma ORM** — database management
- **PostgreSQL** (Neon)
- **JWT** + **Google OAuth** — authentication
- **Zod** — validation
- **Helmet** + **Rate Limiting** — security
- **Nodemailer** — email services

### Deployment
- **Frontend:** Vercel
- **Backend:** Railway / Render
- **Database:** Neon PostgreSQL
- **File Storage:** Local / Cloudinary

## 📁 Project Structure

```
trustguide/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, app config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/       # Auth, validation, errors
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Helpers, email, auth
│   │   ├── validators/      # Zod schemas
│   │   └── app.ts           # Express app
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Sample data
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # UI, layout, shared, cards
│   │   ├── lib/             # API client, utils, constants
│   │   ├── types/           # TypeScript interfaces
│   │   └── styles/          # Global CSS
│   ├── public/              # Static assets
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.ts
├── docs/                    # Documentation
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database URL and credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/trustguide"

# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed sample data
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your API URL

# Start development server
npm run dev
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health: http://localhost:5000/api/health

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_REFRESH_SECRET` | Refresh token secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `OPENAI_API_KEY` | OpenAI API key (optional) |
| `SMTP_HOST` | Email server host |
| `SMTP_USER` | Email username |
| `SMTP_PASS` | Email password |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend (.env.local)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/google` | Google OAuth |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Get current user |
| PATCH | `/api/auth/me` | Update profile |

### Articles
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/articles` | List articles |
| GET | `/api/articles/featured` | Featured guides |
| GET | `/api/articles/trending` | Trending guides |
| GET | `/api/articles/:slug` | Get article by slug |
| GET | `/api/articles/:id/related` | Related articles |
| POST | `/api/articles` | Create article (admin) |
| PUT | `/api/articles/:id` | Update article (admin) |
| DELETE | `/api/articles/:id` | Delete article (admin) |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | List categories |
| GET | `/api/categories/:slug` | Get category with articles |

### Search
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/search?q=query` | Search articles & questions |
| GET | `/api/search/suggestions` | Search suggestions |

### Scam Checker
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/scam/check` | Check entity trustworthiness |
| GET | `/api/scam/recent` | Recent scam reports |

### Community
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/community/questions` | List questions |
| POST | `/api/community/questions` | Ask a question |
| POST | `/api/community/questions/:id/answers` | Answer a question |

### AI Assistant
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/chat` | Chat with AI assistant |
| POST | `/api/ai/suggest` | Get guide suggestions |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/dashboard` | Admin stats |
| GET | `/api/admin/users` | Manage users |
| GET | `/api/admin/articles` | Manage articles |
| GET | `/api/admin/reports` | View reports |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Support

- Email: hello@trustguide.com
- Twitter: [@trustguide](https://twitter.com/trustguide)
- GitHub Issues: [Report a bug](https://github.com/trustguide/trustguide/issues)

---

Built with ❤️ for a safer internet.
