# 🚀 Mini Job Board App

A modern, responsive job board application built with Next.js, React Redux, and shadcn/ui. Find and apply to amazing job opportunities with a seamless user experience.

![Job Board App](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Usage](#-usage)
- [Contributing](#-contributing)

## ✨ Features

### 🏠 Home Page
- **Job Listings**: Display jobs fetched from API with fallback mock data
- **Search & Filter**: Advanced filtering by job title, location, type, and company
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Job Cards**: Each card displays:
  - Job title with clickable link
  - Company name
  - Location with map pin icon
  - Job type (Full-time, Part-time, Contract, Remote)
  - Apply button with modal integration

### 🔍 Job Detail Page
- **Dynamic Routing**: `/job-detail/[id]` with Next.js dynamic routes
- **Comprehensive Information**: 
  - Detailed job description
  - Requirements with skill badges
  - Salary information
  - Posted date
  - Company details
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Apply Integration**: Direct apply button with form modal

### 📝 Apply Form Modal
- **Form Validation**: React Hook Form with Zod schema validation
- **Required Fields**:
  - Full Name (minimum 2 characters)
  - Email Address (valid email format)
  - Resume Upload (PDF, DOC, DOCX files)
- **Optional Fields**:
  - Cover Letter (textarea)
- **File Upload**: Custom styled file input with preview
- **State Management**: Integrates with Redux for applied jobs tracking

### 🔧 Technical Features
- **State Management**: Redux Toolkit with async thunks
- **API Integration**: Axios with error handling and fallback data
- **Data Persistence**: localStorage integration for applied jobs
- **Type Safety**: Full TypeScript implementation
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme
- **SEO**: Next.js Head components with meta tags

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript 5.0
- **UI Library**: React 19.0.0
- **State Management**: Redux Toolkit + React Redux
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Next.js (Webpack)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Mini-Job-Board-App
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
Mini-Job-Board-App/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── JobCard.tsx    # Job card component
│   │   ├── JobFilter.tsx  # Search and filter component
│   │   └── ApplyFormModal.tsx # Application form modal
│   ├── features/          # Redux slices
│   │   └── jobsDataSlice.ts # Main Redux slice
│   ├── pages/             # Next.js pages
│   │   ├── index.tsx      # Home page
│   │   ├── _app.tsx       # App wrapper
│   │   └── job-detail/    # Job detail pages
│   ├── services/          # API services
│   │   └── api.ts         # Axios API configuration
│   ├── store/             # Redux store
│   │   ├── store.ts       # Store configuration
│   │   └── hooks.ts       # Typed Redux hooks
│   └── styles/            # Global styles
│       └── globals.css    # Tailwind CSS imports
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔌 API Integration

The app is configured to work with a mock API. You can easily switch to a real API:

### Current Configuration
- **API Base URL**: `https://6857e2b721f5d3463e5676b9.mockapi.io/api/v1`
- **Fallback Data**: Local mock data if API fails
- **Error Handling**: Graceful fallback with user feedback

### To Use Your Own API

1. Update the `API_BASE_URL` in `src/services/api.ts`
2. Ensure your API endpoints match the expected structure:
   - `GET /jobs` - Fetch all jobs
   - `GET /jobs/:id` - Fetch job by ID
   - `GET /jobs?search=query` - Search jobs
   - `GET /jobs?type=type` - Filter by job type

### API Response Structure

```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary?: string;
  requirements?: string[];
  postedDate: string;
}
```

## 🎯 Usage

### For Job Seekers

1. **Browse Jobs**: Visit the home page to see all available positions
2. **Search & Filter**: Use the filter panel to find specific jobs
3. **View Details**: Click on any job title to see full details
4. **Apply**: Click "Apply Now" to open the application form
5. **Track Applications**: Applied jobs are marked and persisted

### For Developers

1. **Customize API**: Update API endpoints in `src/services/api.ts`
2. **Add Components**: Create new UI components in `src/components/`
3. **Extend Redux**: Add new slices in `src/features/`
4. **Modify Styling**: Update Tailwind config or add custom CSS

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run devT         # Start with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🎨 Customization

### Styling
- **Colors**: Update CSS variables in `src/styles/globals.css`
- **Theme**: Modify `tailwind.config.js` for custom design tokens
- **Components**: Customize shadcn/ui components in `src/components/ui/`

### Features
- **Add Job Types**: Extend the job type options in filter components
- **Form Fields**: Add new fields to the apply form in `ApplyFormModal.tsx`
- **API Endpoints**: Add new API functions in `src/services/api.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Hook Form](https://react-hook-form.com/) for form handling

---

**Happy Job Hunting! 🎉**
