# Landing Page Template - MMD Lab

A modern, responsive, and customizable landing page template built with React, Tailwind CSS, and Framer Motion. Perfect for creating professional landing pages quickly with support for multiple languages and domain configurations.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach, works on all devices
- **Multilingual**: Support for English and Spanish (configurable)
- **Customizable**: Easy configuration via JSON file
- **Fast**: Optimized for performance and SEO
- **Contact Forms**: Integrated with FormSubmit, Formspree, or custom webhooks

## 📋 Quick Start

### 1. Basic Configuration

Edit `src/config.json` to customize your landing page:

```json
{
  "brand": {
    "name": "Your Brand Name",
    "logo": "/logo.png",
    "favicon": "/favicon.png",
    "primaryColor": "#8b5cf6",
    "secondaryColor": "#6366f1"
  },
  "content": {
    "tagline": "Your main headline",
    "subtitle": "Your subtitle text",
    "cta": "Call to action button",
    "learnMore": "Learn more"
  },
  "languages": {
    "default": "en",
    "available": ["en", "es"],
    "multilingual": true
  },
  "domain": {
    "type": "subdomain",
    "subdomain": "client.mmdlab.tech",
    "customDomain": null
  },
  "contact": {
    "email": "hello@yourbrand.com",
    "formAction": "https://formsubmit.co/hello@yourbrand.com"
  }
}
```

### 2. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌍 Language Configuration

### Single Language (English)
```javascript
const config = generateConfig({
  brandName: "TechStart",
  tagline: "Accelerate your startup's growth",
  language: "en",
  multilingual: false
});
```

### Single Language (Spanish)
```javascript
const config = generateConfig({
  brandName: "Soluciones Digitales",
  tagline: "Transformamos tu negocio digital",
  language: "es",
  multilingual: false
});
```

### Multilingual (English + Spanish)
```javascript
const config = generateConfig({
  brandName: "Global Solutions",
  tagline: "Worldwide business solutions",
  language: "en",
  multilingual: true
});
```

## 🌐 Domain Configuration

### Subdomain Setup (client.mmdlab.tech)
```javascript
const config = generateConfig({
  domainType: "subdomain",
  subdomain: "client.mmdlab.tech"
});
```

### Custom Domain Setup
```javascript
const config = generateConfig({
  domainType: "custom",
  customDomain: "clientdomain.com"
});
```

## 🔧 Automation Scripts

### Generate Configuration
```bash
node scripts/configure-landing.js
```

### Run Examples
```bash
node scripts/example-setup.js
```

## 🚀 Deployment

### GitHub Pages
1. Push your configured template to GitHub
2. Enable GitHub Pages in repository settings
3. The CNAME file will automatically configure the domain

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add custom domain in Netlify settings

## 📧 Contact Form Integration

The template supports multiple contact form providers:

### FormSubmit (Free)
```json
{
  "contact": {
    "email": "hello@yourbrand.com",
    "formAction": "https://formsubmit.co/hello@yourbrand.com"
  }
}
```

### Formspree (Free tier)
```json
{
  "contact": {
    "email": "hello@yourbrand.com",
    "formAction": "https://formspree.io/f/YOUR_FORM_ID"
  }
}
```

### Custom n8n Webhook
```json
{
  "contact": {
    "email": "hello@yourbrand.com",
    "formAction": "https://your-n8n-instance.com/webhook/contact"
  }
}
```

## 🔄 Landing Express Service

This template is designed for the "Landing Express" service, which allows you to:

1. **Client fills form** (Google Forms/Airtable)
2. **n8n processes data** and generates config
3. **GitHub API creates repo** from template
4. **Configuration files updated** automatically
5. **CNAME generated** for domain setup
6. **GitHub Pages deploys** the landing page
7. **Client receives** live URL and editing instructions

### n8n Integration Example
```javascript
// In n8n Function node
const { generateConfig, saveConfig, generateCNAME } = require('./configure-landing');

const clientConfig = generateConfig({
  brandName: $input.first().json.brandName,
  tagline: $input.first().json.tagline,
  contactEmail: $input.first().json.email,
  language: $input.first().json.language,
  multilingual: $input.first().json.multilingual,
  domainType: $input.first().json.domainType,
  subdomain: $input.first().json.subdomain
});

// Save config and generate CNAME
saveConfig(clientConfig);
generateCNAME(clientConfig);
```

## 📁 Project Structure

```
landing-template/
├── src/
│   ├── config.json          # Main configuration file
│   ├── components/
│   │   └── LandingPage.jsx  # Main component (reads config)
│   └── i18n/
│       ├── en.json          # English translations
│       └── es.json          # Spanish translations
├── scripts/
│   ├── configure-landing.js # Main configuration script
│   ├── generate-cname.js    # CNAME generation script
│   └── example-setup.js     # Example configurations
├── CNAME                    # Generated domain configuration
└── README.md               # This file
```

## 🎨 Customization Options

### Colors
```json
{
  "brand": {
    "primaryColor": "#8b5cf6",
    "secondaryColor": "#6366f1"
  }
}
```

### Content
```json
{
  "content": {
    "tagline": "Your main headline",
    "subtitle": "Your subtitle text",
    "cta": "Get started",
    "learnMore": "Learn more"
  }
}
```

### SEO
```json
{
  "seo": {
    "title": "Your Brand - Your Tagline",
    "description": "Your meta description",
    "keywords": "your, keywords, here"
  }
}
```

## 💡 Tips for Landing Express Service

### 1. Pre-configured Templates
Create different base configurations for common use cases:
- SaaS landing page
- Consulting services
- E-commerce
- Portfolio

### 2. Color Palettes
Offer 6 predefined color palettes:
- Purple/Indigo (default)
- Blue/Cyan
- Green/Emerald
- Red/Rose
- Orange/Amber
- Gray/Slate

### 3. Quick Customization
The client can easily edit:
- Brand name
- Tagline and subtitle
- Contact email
- Colors
- Logo and favicon

### 4. Multilingual Support
- Single language: Faster loading, simpler maintenance
- Multilingual: Better for international clients
- Default language selection based on target market

## 📞 About MMD Lab

MMD Lab specializes in digital transformation for businesses and professionals. We help organizations save time, reduce costs, and boost productivity through:
- Automation of repetitive tasks and workflows
- Integration of cloud tools and platforms
- Development and deployment of AI agents
- Technical training and mentoring for teams

Our solutions are modern, scalable, and tailored to each client's needs, with a strong focus on usability and measurable results.

## 👨‍💻 About the Creator

Miqueas Molina Delgado (MMD) is a technology consultant and trainer with extensive experience in Automation, Cloud Integrations, and AI-driven solutions. Passionate about helping businesses grow, Miqueas combines technical expertise with a practical, results-oriented approach.

## 📞 Get in Touch

Ready to accelerate your business with smart automation and digital solutions? [Contact MMD Lab](mailto:info@mmdlab.tech) to discuss your project or request a personalized proposal.

Created by Miqueas Molina Delgado (MMD).

## 🏷️ Customizing Meta Tags (Title, Description, Canonical)

To ensure your landing page is 100% white-label and SEO-friendly for each client/demo, meta tags are injected automatically from your configuration.

### How it works
- The file `src/config.json` contains a `meta` section for each language, e.g.:
  ```json
  "meta": {
    "en": {
      "title": "EcoWatt - Clean energy for a brighter future",
      "description": "Renewable energy solutions for homes and businesses.",
      "canonical": "https://ecowatt.demo.com"
    },
    "es": {
      "title": "EcoWatt - Energía limpia para un futuro brillante",
      "description": "Soluciones de energía renovable para hogares y empresas.",
      "canonical": "https://ecowatt.demo.com/es"
    }
  }
  ```
- The file `public/index.html` uses placeholders:
  ```html
  <meta name="description" content="<!--DESCRIPTION-->" />
  <title><!--TITLE--></title>
  <link rel="canonical" href="<!--CANONICAL-->" />
  ```
- The script `scripts/replace-meta.js` reads your config and injects the correct values for the default language.

### Steps to update meta tags before deploying

1. **Edit your config:**
   - Update `src/config.json` with the correct meta info for your client or demo.
2. **Run the script:**
   - In your project root, run:
     ```bash
     node scripts/replace-meta.js
     ```
   - This will update `public/index.html` with the correct title, description, and canonical URL.
3. **Deploy as usual:**
   - Now your landing is ready to deploy, with all meta tags set for the final client.

**Tip:**
- You can add this script to your build process in `package.json`:
  ```json
  "scripts": {
    "prebuild": "node scripts/replace-meta.js",
    "build": "react-scripts build"
  }
  ```
- This way, meta tags are always up-to-date before every build.