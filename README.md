# 🏠 Airbnb Clone - Next.js Full-Stack Application

A modern, full-stack Airbnb clone built with Next.js 16, featuring user authentication, property listings, reservations, and favorites functionality.

## 🌐 Live Demo

Check out the live application: [https://airbnb-gz1c.vercel.app/](https://airbnb-gz1c.vercel.app/)

## ✨ Features

- 🔐 **User Authentication** - Secure authentication powered by Kinde Auth
- 🏡 **Property Listings** - Browse and search properties with advanced filtering
- 📍 **Interactive Maps** - Visual location selection with map integration
- ❤️ **Favorites System** - Save and manage your favorite properties
- 📅 **Reservations** - Book properties and manage your reservations
- 🔍 **Advanced Search** - Filter by country, guests, bedrooms, and bathrooms
- 🎨 **Modern UI** - Beautiful, responsive design with shadcn/ui components
- ⚡ **Optimized Performance** - Built with Next.js 16 and Turbopack

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe ORM for database operations
- **Supabase (PostgreSQL)** - Scalable database solution
- **Kinde Auth** - Authentication and user management

### Additional Tools
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **date-fns** - Date manipulation

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account
- A Kinde Auth account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/okoye-peter/airbnb.git
cd airbnb-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your-supabase-connection-string"

# Kinde Auth
KINDE_CLIENT_ID="your-kinde-client-id"
KINDE_CLIENT_SECRET="your-kinde-client-secret"
KINDE_ISSUER_URL="https://yourdomain.kinde.com"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000"

# Supabase (for file uploads)
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
airbnb-clone/
├── app/
│   ├── actions/          # Server actions
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── favorites/        # Favorites page
│   ├── home/             # Property details page
│   ├── lib/              # Utility functions
│   ├── my-homes/         # User's properties
│   ├── reservations/     # Reservations page
│   └── create/           # Create property flow
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── components/
    └── ui/               # shadcn/ui components
```

## 🗄️ Database Schema

The application uses the following main models:

- **User** - User account information
- **Home** - Property listings
- **Favorite** - User's favorite properties
- **Reservation** - Booking records

## 🔑 Key Features Implementation

### Authentication
- Seamless sign-in/sign-up with Kinde Auth
- Protected routes and API endpoints
- User session management

### Property Management
- Multi-step property creation form
- Image upload to Supabase Storage
- Category-based organization
- Location selection with maps

### Search & Filtering
- Real-time search with URL parameters
- Filter by location, guests, rooms, and bathrooms
- Persistent search state

### Reservations
- Date range selection
- Availability checking
- Booking confirmation
- Reservation management

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible components:
- Dialog modals
- Select dropdowns
- Cards
- Buttons
- Form inputs
- And more...

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables
4. Deploy!

```bash
# Or use Vercel CLI
vercel --prod
```

### Database Setup on Supabase

1. Create a new Supabase project
2. Copy the connection string
3. Run migrations: `npx prisma migrate deploy`

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate   # Create/run migrations
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [Kinde Auth](https://kinde.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

Your Name - [@okoyepeter98](https://twitter.com/yourtwitter)

Project Link: [https://github.com/okoye-peter/airbnb-clone](https://github.com/okoye-peter/airbnb-clone)

---

Made with ❤️ using Next.js and modern web technologies