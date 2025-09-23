# CLAUDE.MD

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product Overview - Althea

**Althea** is an AI-powered health interpreter designed to **transform user anxiety into empowerment**. The core mission is helping users understand their medical reports instantly through:

- **Plain-English summaries** of complex medical results
- **Personalized questions** to ask their doctor 
- **Health tracking dashboard** to monitor metrics over time
- **Instant analysis** of uploaded PDFs or images (bloodwork, PET scans, etc.)

### Target User Experience
- **Emotionally grounded**: Acknowledges user anxiety around health information
- **Crystal-clear utility**: Immediate value through simplified medical interpretation  
- **High-converting & trustworthy**: Professional, secure handling of sensitive data
- **Consistent identity**: Cohesive visual and tonal experience throughout

## Architecture

This is a full-stack web application with a Django backend and React frontend:

### Backend - Django 5.2.6
- **Location**: `backend/` directory
- **Main project**: `backend/althea/` (settings, URLs, WSGI/ASGI)
- **App**: `backend/altheaapp/` (models, views, admin)
- **Database**: SQLite (`backend/db.sqlite3`)
- **Management**: `backend/manage.py`

### Frontend - React + Vite
- **Location**: `frontend/` directory
- **Framework**: React 19.1.1 and Vite 7.1.7
- **Styling**: **Tailwind CSS 4.1.13** (primary styling framework)
- **Linting**: ESLint 9.36.0

### Root
- **Entry point**: Simple Python entry point at `main.py`

## Project Structure

```
.
├── backend
│   ├── althea
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   ├── settings.cpython-312.pyc
│   │   │   ├── urls.cpython-312.pyc
│   │   │   └── wsgi.cpython-312.pyc
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── altheaapp
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   │   └── __init__.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   └── views.py
│   ├── db.sqlite3
│   └── manage.py
├── CLAUDE.md
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── layout
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navigation.jsx
│   │   │   ├── sections
│   │   │   │   ├── Benefits.jsx
│   │   │   │   ├── CTA.jsx
│   │   │   │   ├── FAQ.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   └── Testimonials.jsx
│   │   │   └── ui
│   │   │       ├── Badge.jsx
│   │   │       ├── Button.jsx
│   │   │       └── Card.jsx
│   │   ├── data
│   │   │   └── content.js
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
├── main.py
├── project-structure.txt
├── pyproject.toml
├── README.md
└── uv.lock

```

### Key Directories
- **`backend/altheaapp/`**: All Althea-specific Django functionality (models, views, etc.)
- **`frontend/src/`**: All React components and application logic
- **`frontend/src/assets/`**: Static assets like images and icons
- **`backend/altheaapp/migrations/`**: Database schema changes

## Development Commands

### Backend (Django)
```bash
cd backend
python manage.py runserver          # Start development server
python manage.py migrate            # Apply database migrations
python manage.py makemigrations     # Create new migrations
python manage.py test               # Run Django tests
python manage.py collectstatic      # Collect static files
```

### Frontend (React)
```bash
cd frontend
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Package Management
- **Backend**: Uses `uv` (Python package manager) - see `pyproject.toml`
- **Frontend**: Uses `npm` - see `frontend/package.json`

## Coding Principles

### Simplicity & Modularity
- **Keep it simple**: Favor readable, straightforward solutions over clever complexity
- **Modular design**: Break features into small, reusable components and functions
- **Single responsibility**: Each function/component should do one thing well
- **Clear naming**: Use descriptive variable and function names that explain intent
- **Minimal dependencies**: Only add libraries when they solve real problems

### Backend Guidelines (Django)
- Use Django's built-in features before custom solutions
- Keep models simple with clear relationships
- Create focused views that handle single responsibilities  
- Use Django's form validation for user input
- Implement proper error handling for file uploads and AI processing
- Follow Django's security best practices for handling medical data

### Frontend Guidelines (React)
- Create small, focused components
- Use custom hooks for shared logic
- Implement proper loading states for AI processing
- Handle errors gracefully with user-friendly messages
- Optimize for performance with proper state management
- **Component composition**: Always separate content data from UI components (use `/data/content.js`)
- **Icon mapping**: Create icon maps for dynamic rendering (`const iconMap = { iconName: Component }`)
- **State management**: Use single state variables for UI interactions (accordion, switchers)

## Design Principles

### Tailwind CSS Framework
- **Primary styling**: Use **Tailwind CSS** for all styling needs
- **Utility-first approach**: Leverage Tailwind's utility classes for rapid development
- **Custom components**: Create reusable Tailwind-based components for consistency
- **Design tokens**: Use Tailwind's built-in spacing, colors, and typography scales
- **Responsive utilities**: Utilize Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

### Mobile-First Responsive Design
- **Always mobile responsive**: Every component must work perfectly on mobile
- **Tailwind breakpoints**: Use `sm:`, `md:`, `lg:`, `xl:` prefixes strategically
- **Touch-friendly**: Adequate touch targets (`min-h-[44px]`, proper padding)
- **Progressive enhancement**: Core functionality works on all devices

### Visual Design Philosophy
- **Minimal but suave**: Clean, modern aesthetics using Tailwind's design system
- **Subtle animations**: Enhance UX without being distracting
  - Use Tailwind's `transition-*` and `duration-*` utilities
  - `hover:` and `focus:` states for interactive elements
  - `animate-spin`, `animate-pulse` for loading states
- **Trust-building elements**: Professional appearance for medical context
- **Accessibility first**: High contrast, readable fonts, keyboard navigation

### Animation Guidelines with Tailwind
- **Transitions**: Use `transition-all duration-300 ease-in-out` for smooth state changes
- **Loading states**: Implement `animate-pulse` or `animate-spin` during AI analysis
- **Hover effects**: Subtle `hover:scale-105` or `hover:shadow-lg` interactions
- **Focus states**: Clear `focus:ring-2 focus:ring-blue-500` for keyboard navigation
- **Custom animations**: Create keyframe animations for floating elements, combine with Tailwind transitions
- **Glassmorphism effects**: Use `backdrop-blur-sm` with `bg-opacity-10` for modern depth
- **Respect accessibility**: Use `motion-reduce:transition-none` for users who prefer reduced motion

## Key Features to Implement

### Core Functionality
1. **File Upload System**
   - Drag-and-drop interface using Tailwind styling
   - Progress indicators with `animate-pulse` during upload
   - File validation with clear error states

2. **AI Report Analysis**
   - Integration with AI service for medical report interpretation
   - Loading states using Tailwind animations (`animate-spin`)
   - Error handling with user-friendly Tailwind-styled components

3. **Results Dashboard**
   - Plain-English summaries display with clean Tailwind layouts
   - Generated doctor questions in card-based components
   - Historical tracking using Tailwind's grid and flex utilities
   - Exportable reports with print-friendly Tailwind classes

4. **User Authentication**
   - Secure login/registration forms styled with Tailwind
   - Protected routes for sensitive data
   - Session management with proper loading states

5. **Advanced UI Patterns**
   - Smooth accordion animations with max-height transitions and opacity changes
   - Dynamic headline switchers with auto-rotation functionality
   - Glassmorphism cards using backdrop-blur and transparency layers
   - Icon mapping systems for scalable component architecture

### Security Considerations
- **HIPAA awareness**: Handle medical data with appropriate security measures
- **File upload security**: Validate file types, scan for malicious content
- **Data encryption**: Encrypt sensitive medical information
- **User privacy**: Clear data retention and deletion policies

## Project Structure
- **Django**: Standard project structure with separate app (`altheaapp`)
- **React**: Vite template structure with components in `frontend/src/`
- **Styling**: All components use Tailwind CSS utility classes
- **Testing**: Django's built-in testing and ESLint (no additional frameworks)
- **CI/CD**: No additional hooks configured

## Development Workflow
1. **Design first**: Start with mobile-first Tailwind component designs
2. **Backend API**: Implement Django endpoints with proper error handling
3. **React components**: Build with Tailwind styling and proper loading/error states
4. **Responsive testing**: Test across breakpoints using Tailwind's responsive utilities
5. **Accessibility**: Ensure compliance using Tailwind's accessibility features
6. **Performance**: Optimize for medical document processing

## Notes for Claude Code
- **Tailwind-first approach**: Always use Tailwind CSS for styling instead of custom CSS
- **User empathy**: Consider the emotional state of users dealing with health anxiety
- **Error messaging**: Implement non-alarming error messages using Tailwind's color palette
- **Trust building**: Use professional Tailwind components for medical data handling
- **Mobile priority**: Design mobile-first using Tailwind's responsive utilities
- **Vulnerability awareness**: Remember users are in potentially vulnerable health situations