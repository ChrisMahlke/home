# Personal Homepage

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.9.1-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

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

- **Performance Monitoring** - Real-time page load time tracking with detailed metrics
- **Network Status Monitoring** - Connection quality and type detection
- **Enhanced Service Worker** - Advanced caching strategies with offline support
- **PWA Ready** - Installable as a native app with manifest
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
- **SEO Optimized** - Open Graph and Twitter Card meta tags
- **Performance Insights** - Detailed metrics logging in development mode

### 🌐 **SEO & Social**

- **Open Graph Tags** - Optimized Facebook and LinkedIn sharing
- **Twitter Cards** - Enhanced Twitter sharing experience
- **Meta Tags** - Comprehensive SEO optimization
- **Social Media Ready** - Professional sharing previews

## 🆕 Recent Enhancements

### Zero-UI Improvements

- **Enhanced SEO** - Added Open Graph and Twitter Card meta tags for better social sharing
- **Improved Service Worker** - Advanced caching strategies with separate static and dynamic caches
- **Performance Monitoring** - Detailed metrics logging with network status tracking
- **Developer Insights** - Enhanced console logging with performance and network information

All enhancements are **invisible to users** but provide significant technical improvements for performance, SEO, and developer experience.

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

### String Management

All text strings in the application are centralized in `src/strings.json` for easy maintenance and internationalization. The strings are organized into logical categories:

- **App**: Application name, title, and basic info
- **UI**: User interface text and labels
- **Social**: Social media links and descriptions
- **Error**: Error messages and fallback text
- **Console**: Developer console messages
- **Analytics**: Event tracking names
- **Performance**: Performance monitoring labels
- **HTML/Meta**: SEO and meta tag content

### Updating Strings

To modify any text in the application:

1. **Edit `src/strings.json`** - Update the relevant string value
2. **Run generation scripts** - The build process automatically regenerates HTML and manifest files
3. **TypeScript safety** - All strings are type-checked via `src/types/strings.ts`

### Personal Information

Update the following in `src/strings.json`:

- **App section**: Name, title, and description
- **Social section**: GitHub, LinkedIn, and other social media URLs
- **Meta section**: Open Graph and Twitter Card content
- **Manifest section**: PWA manifest information

### Adding Social Links

To add more social links:

1. **Add to `src/strings.json`** in the `social` section:

```json
{
  "social": {
    "yourplatform": {
      "name": "Your Platform",
      "url": "https://your-url.com",
      "color": "hover:text-your-color",
      "ariaLabel": "Visit Your Platform (opens in new window)"
    }
  }
}
```

2. **Update `src/App.tsx`** to include the new link in the `socialLinks` array
3. **Update `src/types/strings.ts`** to include the new social platform type

### Generation Scripts

The project includes automated scripts to generate files from strings:

- `npm run generate-html` - Regenerates `index.html` from strings
- `npm run generate-manifest` - Regenerates `manifest.json` from strings
- `npm run build` - Runs both scripts before building

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

- **Enhanced Service Worker** - Advanced caching strategies with static and dynamic caches
- **Web App Manifest** - Native app installation with proper metadata
- **Apple Meta Tags** - iOS app-like experience
- **Theme Colors** - Consistent branding
- **Background Sync** - Future-ready offline capabilities

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
- **Enhanced Service Workers** - Advanced offline capabilities with intelligent caching
- **Performance APIs** - Real-time metrics with detailed monitoring
- **Network APIs** - Connection quality and type detection
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
- **Advanced Web APIs** - Service Workers, Performance API, Network API, Intersection Observer
- **Production Readiness** - Error handling, analytics, monitoring, security, SEO
- **Developer Experience** - Hot reloading, TypeScript, linting, console features, performance insights
- **Performance Optimization** - Code splitting, lazy loading, intelligent caching, offline support
- **Security Best Practices** - Comprehensive headers, CSP, error boundaries, secure defaults
- **SEO & Social** - Open Graph tags, Twitter Cards, meta optimization
- **Accessibility** - ARIA labels, keyboard navigation, focus management

Perfect for showcasing advanced web development skills, security awareness, modern best practices, and production-ready features!
