# Portfolio Customization Guide

This guide will help you customize the portfolio website with your own information.

## 📝 Quick Start

The portfolio is built with modern technologies and is easy to customize. All the content is stored in component files under `src/lib/components/`.

## 🎨 Sections to Customize

### 1. Hero Section (`src/lib/components/Hero.svelte`)

Update your name and tagline:

```svelte
<h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
    Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Your Name</span>
</h1>
<p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
    Your Title | Your Specialization | Your Passion
</p>
```

### 2. About Section (`src/lib/components/About.svelte`)

Update your description and stats:
- Personal introduction paragraphs
- Stats cards (projects, technologies, etc.)

### 3. Experience Section (`src/lib/components/Experience.svelte`)

Update the `experiences` array with your work history:

```typescript
const experiences = [
    {
        title: 'Your Job Title',
        company: 'Company Name',
        period: 'Start - End',
        description: 'What you did...',
        technologies: ['Tech1', 'Tech2', 'Tech3'],
        type: 'work' // or 'internship'
    }
];
```

### 4. Projects Section (`src/lib/components/Projects.svelte`)

Update the `projects` array with your projects:

```typescript
const projects = [
    {
        title: 'Project Name',
        description: 'Project description...',
        image: 'https://example.com/image.jpg',
        technologies: ['Tech1', 'Tech2'],
        github: 'https://github.com/username/repo',
        demo: 'https://demo-url.com',
        featured: true // or false
    }
];
```

### 5. Education Section (`src/lib/components/Education.svelte`)

Update the `education` array with your academic history:

```typescript
const education = [
    {
        degree: 'Your Degree',
        institution: 'Your University',
        period: 'Start - End',
        grade: 'Your Grade',
        description: 'What you studied...',
        achievements: ['Achievement 1', 'Achievement 2']
    }
];
```

### 6. Skills Section (`src/lib/components/Skills.svelte`)

Update the `skillCategories` array with your skills:

```typescript
const skillCategories = [
    {
        name: 'Category Name',
        icon: '🎨', // Any emoji
        skills: [
            { name: 'Skill Name', level: 90 } // level 0-100
        ]
    }
];
```

Also update the technology badges array for additional skills.

### 7. Contact Section (`src/lib/components/Contact.svelte`)

Update:
- Email address
- Location
- Social media links (GitHub, LinkedIn, Twitter)
- Contact form action (if needed)

```typescript
const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/yourusername',
        // ... icon and color
    }
];
```

## 🎨 Styling Customization

### Colors

The website uses Tailwind CSS. You can customize colors in `src/app.css`:

```css
:root {
    --color-primary: 59 130 246;  /* Blue */
    --color-secondary: 139 92 246; /* Purple */
}
```

### Fonts

Update fonts in `src/app.html` by adding Google Fonts or other font services.

## 🖼️ Images

Replace placeholder images in the Projects section with your own:
- Use direct URLs from image hosting services
- Or add images to `static/` folder and reference them as `/image.jpg`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify
1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.svelte-kit/output/client`

### GitHub Pages
1. Install static adapter: `npm i -D @sveltejs/adapter-static`
2. Update `svelte.config.js` to use static adapter
3. Build and deploy to GitHub Pages

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

1. Optimize images (use WebP format, compress sizes)
2. Remove unused technologies from skills section
3. Limit number of featured projects to 2-3
4. Keep project images under 200KB each

## 🎯 SEO Optimization

Update metadata in `src/app.html`:

```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your description">
<meta property="og:title" content="Your Name - Portfolio">
```

## 📞 Support

If you need help customizing the portfolio:
1. Check the component files for comments
2. Refer to [SvelteKit docs](https://kit.svelte.dev)
3. Refer to [Tailwind CSS docs](https://tailwindcss.com)

## 🎉 Final Tips

- Keep descriptions concise and impactful
- Use high-quality project screenshots
- Update social links to your actual profiles
- Test on multiple devices and browsers
- Enable analytics (Google Analytics, Plausible, etc.)

Good luck with your portfolio! 🚀
