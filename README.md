# Personal Portfolio Website

A modern, responsive portfolio website built with SvelteKit and Tailwind CSS, featuring a stunning dark/light mode toggle and QR code sharing functionality.

## ✨ Features

- **🎨 Modern Design**: Beautiful, professional design with smooth animations and transitions
- **🌓 Dark/Light Mode**: Toggle between light and dark themes with persistent preference
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop
- **🔗 QR Code Sharing**: Generate and share QR code for easy portfolio access
- **⚡ Fast Performance**: Built with SvelteKit for optimal performance
- **🎯 Sections**:
  - Hero section with introduction
  - About section with personal information
  - Experience timeline with job history
  - Projects showcase with featured projects
  - Education history with achievements
  - Technical skills with proficiency levels
  - Contact form with social media links

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```sh
git clone https://github.com/AjinkyaTaranekar/Personal-website.git
cd Personal-website
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The site will be available at `http://localhost:5173`

## 🛠️ Built With

- [SvelteKit](https://kit.svelte.dev/) - Web framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [QRCode](https://www.npmjs.com/package/qrcode) - QR code generation

## 📦 Building for Production

To create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## 🚢 Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

### Manual Setup:

1. Make sure your GitHub repository is named `username.github.io` or configure GitHub Pages to use the `main` branch and `/root` folder in repository settings.

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "GitHub Actions" as the source
   
3. Push changes to the main branch to trigger deployment:
   ```sh
   git push origin main
   ```

The GitHub Action will automatically:
- Install dependencies
- Build the site using the static adapter
- Deploy the built site to GitHub Pages

Your site will be available at `https://username.github.io/` or `https://username.github.io/repository-name/` depending on your repository name.

## 🎨 Customization

To customize the portfolio with your own information:

1. Update personal information in the component files:
   - `src/lib/components/Hero.svelte` - Name and tagline
   - `src/lib/components/About.svelte` - About description
   - `src/lib/components/Experience.svelte` - Work experience
   - `src/lib/components/Projects.svelte` - Project details
   - `src/lib/components/Education.svelte` - Education history
   - `src/lib/components/Skills.svelte` - Technical skills
   - `src/lib/components/Contact.svelte` - Contact information

2. Update social media links in `src/lib/components/Contact.svelte`

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies
