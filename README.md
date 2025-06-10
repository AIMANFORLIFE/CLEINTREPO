# Augmentum Marketing

A premium digital marketing agency website with a sophisticated admin dashboard for managing client inquiries.

## ✨ Features

### 🎨 **Frontend**
- **Glassmorphic Design** - Modern, elegant UI with backdrop blur effects
- **Animated Background** - Dynamic gradient animations
- **Custom Cursor Tracker** - MacBook-style cursor experience
- **Responsive Design** - Optimized for all devices
- **DM Sans Typography** - Clean, professional font
- **Smooth Animations** - Micro-interactions and transitions

### 🔧 **Admin Dashboard**
- **Real-time Updates** - Live message notifications
- **Advanced Filtering** - Search, sort, and filter messages
- **Status Management** - Track message states (new, read, replied)
- **Data Export** - CSV export functionality
- **Analytics Overview** - Comprehensive statistics
- **Secure Authentication** - Supabase Auth integration

### 🗄️ **Database**
- **Supabase Integration** - PostgreSQL with real-time subscriptions
- **Row Level Security** - Secure data access
- **Message Management** - Complete CRUD operations
- **Status Tracking** - Automated timestamps

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd augmentum-marketing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/`
   - Create an admin user in Supabase Auth

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AdminStats.tsx   # Dashboard statistics
│   ├── AnimatedBackground.tsx
│   ├── Contact.tsx      # Contact form
│   ├── CursorTracker.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── MessageDetail.tsx
│   ├── MessageList.tsx
│   └── Process.tsx
├── pages/              # Page components
│   ├── AdminDashboard.tsx
│   ├── AdminLogin.tsx
│   └── MainSite.tsx
├── lib/                # Utilities
│   └── supabase.ts     # Supabase client
└── styles/
    └── index.css       # Global styles
```

## 🎯 Key Features

### **Glassmorphic Design System**
- Backdrop blur effects
- Transparent overlays
- Smooth hover animations
- Rounded corners and borders

### **Admin Dashboard**
- **Live Statistics** - Real-time message counts and analytics
- **Message Management** - View, update, and delete messages
- **Advanced Search** - Filter by name, email, company, or content
- **Status Tracking** - New, Read, Replied states
- **Export Functionality** - Download messages as CSV
- **Responsive Layout** - Works on all screen sizes

### **Contact Form**
- **Real-time Validation** - Instant feedback
- **Supabase Integration** - Direct database storage
- **Success Animations** - Smooth confirmation states
- **Error Handling** - User-friendly error messages

## 🔐 Admin Access

1. Navigate to `/admin`
2. Sign in with your Supabase Auth credentials
3. Access the dashboard at `/dashboard`

The admin button is discretely placed in the footer as "A."

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your Git repository
- **Supabase Hosting** - Deploy directly from Supabase

## 🛠️ Technologies

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend as a Service
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Enhanced layouts for tablets
- **Desktop Experience** - Full-featured desktop interface
- **Touch Friendly** - Optimized for touch interactions

## 🔒 Security

- **Row Level Security** - Database-level security
- **Environment Variables** - Secure API key management
- **Input Validation** - Client and server-side validation
- **HTTPS Only** - Secure data transmission

## 📊 Analytics

The dashboard provides comprehensive analytics:
- Total messages received
- Response rates
- Daily/weekly activity
- Company engagement
- Status distribution

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```js
colors: {
  primary: {...},
  secondary: {...}
}
```

### Animations
Modify animations in `src/index.css`:
```css
@keyframes custom-animation {
  /* Your animation */
}
```

## 📄 License

This project is proprietary software for Augmentum Marketing.

## 🤝 Support

For support and questions, contact the development team.

---

Built with ❤️ for Augmentum Marketing