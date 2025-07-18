# Personal Homepage

A modern, responsive personal homepage built with React, TypeScript, and Tailwind CSS. Features advanced React patterns, performance monitoring, PWA capabilities, production-ready error handling, and comprehensive security headers.

## ✨ Features

### 🎨 **User Experience**
- **Dark/Light Mode Toggle** - Switch between themes with smooth transitions
- **Keyboard Shortcuts** - Press `⌘+D` to toggle dark mode
- **Responsive Design** - Looks great on all devices
- **Smooth Animations** - Fade-in animations with staggered timing
- **System Theme Detection** - Automatically matches user's OS preference
- **Persistent Preferences** - Remembers your theme choice
- **Clean Minimal Design** - Focused, distraction-free interface

### ⚡ **Performance & Technical**
- **Performance Monitoring** - Real-time page load time tracking
- **Intersection Observer** - Optimized scroll-triggered animations
- **Service Worker** - Offline capabilities and intelligent caching
- **PWA Ready** - Installable as a native app
- **Error Boundaries** - Graceful error handling with fallback UI
- **Custom Hooks** - Reusable performance and navigation hooks
- **TypeScript Safety** - Full type coverage with proper interfaces

### 🛡️ **Security & Reliability**
- **Comprehensive Error Handling** - Production-ready error boundaries with graceful recovery
- **Security Headers** - XSS protection, clickjacking prevention, and content security policy
- **Developer Console** - Professional welcome message with feature showcase
- **Error Logging** - Structured error reporting for production environments
- **Graceful Degradation** - Fallback UI for error states with retry functionality

### 🔧 **Developer Experience**
- **Hot Module Replacement** - Instant updates during development
- **ESLint Configuration** - Clean code with strict linting
- **Error Tracking Ready** - Prepared for production error monitoring
- **Analytics Integration** - Event tracking for user interactions
- **Network Monitoring** - Connection quality and status tracking

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd home
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production with optimization
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with strict rules

## 🎨 Customization

### Personal Information
Update the following in `src/App.tsx`:
- Name and title in the hero section
- Bio description
- Social media links and URLs in the `socialLinks` array
- Email address

### Adding Social Links
To add more social links, add them to the `socialLinks` array in `src/App.tsx`:

```typescript
{
  name: 'Your Platform',
  url: 'https://your-url.com',
  icon: YourIcon,
  color: 'hover:text-your-color'
}
```

### Styling
The app uses Tailwind CSS for styling. You can:
- Modify colors in the dark/light mode classes
- Adjust spacing and typography
- Add custom animations in `src/index.css`

## 🔧 Advanced Features

### Performance Monitoring
The app includes real-time performance tracking:
- Page load time measurement
- Performance API integration
- Console logging for development insights

### PWA Capabilities
- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - Native app installation
- **Apple Meta Tags** - iOS app-like experience
- **Theme Colors** - Consistent branding

### Error Handling & Security
- **Error Boundaries** - Catches and displays errors gracefully with professional fallback UI
- **Security Headers** - Comprehensive protection against XSS, clickjacking, and injection attacks
- **Error Logging** - Structured error reporting with context for production debugging
- **Graceful Recovery** - "Try Again" functionality without full page reload
- **Developer Console** - Professional welcome message with feature showcase

### Keyboard Navigation
- **⌘+D** - Toggle dark/light mode
- **Tab Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus indicators

## 📦 Tech Stack

### Core Technologies
- **React 18** - UI framework with latest features
- **TypeScript** - Full type safety and IntelliSense
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling framework

### Advanced Features
- **Lucide React** - Beautiful, customizable icons
- **ESLint** - Code quality and consistency
- **Service Workers** - Offline capabilities
- **Performance APIs** - Real-time metrics
- **Intersection Observer** - Scroll-based animations

### Security & Reliability
- **Error Boundaries** - Production-ready error handling
- **Security Headers** - Comprehensive web security
- **Content Security Policy** - XSS and injection protection
- **Strict Transport Security** - HTTPS enforcement

### Development Tools
- **Hot Module Replacement** - Instant development updates
- **TypeScript Compiler** - Strict type checking
- **PostCSS** - Advanced CSS processing
- **Autoprefixer** - Cross-browser compatibility

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build creates optimized files in the `dist/` directory ready for deployment.

### Security Headers
The project includes comprehensive security headers in `public/_headers`:
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **Content-Security-Policy** - XSS and injection protection
- **Strict-Transport-Security** - Enforces HTTPS
- **Permissions-Policy** - Restricts browser features

### Deploy Options
- **Vercel** - Zero-config deployment with automatic security headers
- **Netlify** - Drag and drop deployment with `_headers` support
- **GitHub Pages** - Free hosting for public repos
- **Docker** - Containerized deployment (Dockerfile included)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow TypeScript best practices
- Maintain ESLint compliance
- Add proper error handling
- Test on multiple devices
- Ensure accessibility compliance

## 🔍 Technical Highlights

This project demonstrates:
- **Modern React Patterns** - Custom hooks, error boundaries, performance optimization
- **Advanced Web APIs** - Service Workers, Performance API, Intersection Observer
- **Production Readiness** - Error handling, analytics, monitoring, security
- **Developer Experience** - Hot reloading, TypeScript, linting, console features
- **Performance Optimization** - Code splitting, lazy loading, caching
- **Security Best Practices** - Comprehensive headers, CSP, error boundaries
- **Accessibility** - ARIA labels, keyboard navigation, focus management

Perfect for showcasing advanced web development skills, security awareness, and modern best practices!