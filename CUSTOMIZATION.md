# Portfolio Customization Guide

This guide will help you customize the portfolio website with your own information.

## 📝 Quick Start

The portfolio is built with modern technologies and uses a **JSON-based configuration system** for easy customization. All portfolio data is stored in a single JSON file with TypeScript type definitions for type safety.

## 🎯 Data Structure

All portfolio content is defined in **`src/lib/data/portfolio.json`**. The data structure is strictly typed using TypeScript interfaces defined in **`src/lib/types/portfolio.ts`**.

## 🎨 How to Customize Your Portfolio

### 1. Edit the JSON File

Open `src/lib/data/portfolio.json` and update the following sections:

#### Personal Information
```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your Tagline (appears in typewriter effect)",
    "bio": [
      "First paragraph about you",
      "Second paragraph",
      "Third paragraph"
    ],
    "location": "Your Location",
    "email": "your.email@example.com",
    "availability": "Your availability status"
  }
}
```

#### Social Links
```json
{
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

#### Stats (displayed in About section)
```json
{
  "stats": {
    "projects": "10+",
    "technologies": "15+",
    "dedication": "100%",
    "learning": "∞"
  }
}
```

#### Experience
```json
{
  "experiences": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "Start - End",
      "description": "What you did...",
      "technologies": ["Tech1", "Tech2"],
      "type": "work" // or "internship"
    }
  ]
}
```

#### Projects
```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "image": "https://image-url.com/image.jpg",
      "technologies": ["Tech1", "Tech2"],
      "github": "https://github.com/username/repo",
      "demo": "https://demo-url.com",
      "featured": true // or false
    }
  ]
}
```

#### Education
```json
{
  "education": [
    {
      "degree": "Your Degree",
      "institution": "Your University",
      "period": "Start - End",
      "grade": "Your Grade",
      "description": "What you studied",
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

#### Skills
```json
{
  "skillCategories": [
    {
      "name": "Category Name",
      "icon": "🎨",
      "skills": [
        { "name": "Skill Name", "level": 90 }
      ]
    }
  ],
  "additionalSkills": [
    "Skill1",
    "Skill2"
  ]
}
```

## 🎬 Typewriter Effect

The hero section includes a typewriter animation that displays your tagline. To customize:
- Edit the `tagline` field in the `personal` section of `portfolio.json`
- The animation speed can be adjusted in `src/lib/components/TypewriterEffect.svelte`

## 🎨 Styling Customization

### Colors

Update colors in `src/app.css`:

```css
:root {
    --color-primary: 59 130 246;  /* Blue */
    --color-secondary: 139 92 246; /* Purple */
}
```

### Component Styling

All components use Tailwind CSS utility classes. Components are located in:
- `src/lib/components/Hero.svelte`
- `src/lib/components/About.svelte`
- `src/lib/components/Experience.svelte`
- `src/lib/components/Projects.svelte`
- `src/lib/components/Education.svelte`
- `src/lib/components/Skills.svelte`
- `src/lib/components/Contact.svelte`

## 📱 Mobile Responsiveness

The portfolio is fully mobile-responsive with:
- Responsive text sizes using Tailwind's responsive prefixes (sm:, md:, lg:)
- Mobile-optimized navigation with hamburger menu
- Touch-friendly buttons and links
- Optimized layouts for all screen sizes

All components automatically adapt to different screen sizes without any additional configuration needed.

## 🔧 TypeScript Types

Type definitions are in `src/lib/types/portfolio.ts`. These ensure type safety when editing the JSON:

```typescript
interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  availability: string;
}
```

Your IDE will provide autocompletion and type checking based on these definitions.

## 🗂️ Data Management

The portfolio uses a Svelte store (`src/lib/stores/portfolio.ts`) for state management:
- Imports data from the JSON file
- Provides reactive updates across components
- Passes data via props to components

## 🖼️ Images

For project images:
- Use direct URLs from image hosting services (as shown in the JSON)
- Or add images to `static/` folder and reference as `/image.jpg`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify
1. Push code to GitHub
2. Import on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.svelte-kit/output/client`

## 📱 Testing

Test your changes locally:

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

## ⚡ Performance Tips

1. Optimize images (WebP format, compress sizes)
2. Keep project images under 200KB each
3. Limit featured projects to 2-3 for better performance
4. Remove unused skills from `additionalSkills` array

## 🎯 SEO Optimization

Update metadata in `src/app.html`:

```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your description">
```

## 📞 Support

If you need help:
1. Check the JSON schema in `src/lib/types/portfolio.ts`
2. Refer to [SvelteKit docs](https://kit.svelte.dev)
3. Refer to [Tailwind CSS docs](https://tailwindcss.com)

## 🎉 Key Features

- ✅ **JSON-based configuration** - All data in one place
- ✅ **TypeScript type safety** - Catch errors before runtime
- ✅ **Svelte store** - Centralized state management
- ✅ **Props-based components** - Clean, reusable architecture
- ✅ **Typewriter effect** - Dynamic hero animation
- ✅ **Mobile-responsive** - Perfect on all devices
- ✅ **Dark/Light mode** - Persistent theme preferences
- ✅ **QR code sharing** - Easy portfolio sharing

Good luck with your portfolio! 🚀

