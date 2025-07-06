const fs = require('fs');
const path = require('path');

// Configuration template for different scenarios
const configTemplates = {
  // Single language (English only)
  singleEn: {
    brand: {
      name: "{{BRAND_NAME}}",
      logo: "/logo.png",
      favicon: "/favicon.png",
      primaryColor: "{{PRIMARY_COLOR}}",
      secondaryColor: "{{SECONDARY_COLOR}}"
    },
    content: {
      tagline: "{{TAGLINE}}",
      subtitle: "{{SUBTITLE}}",
      cta: "{{CTA}}",
      learnMore: "Learn more"
    },
    languages: {
      default: "en",
      available: ["en"],
      multilingual: false
    },
    domain: {
      type: "{{DOMAIN_TYPE}}",
      subdomain: "{{SUBDOMAIN}}",
      customDomain: "{{CUSTOM_DOMAIN}}"
    },
    contact: {
      email: "{{CONTACT_EMAIL}}",
      formAction: "{{FORM_ACTION}}"
    },
    seo: {
      title: "{{SEO_TITLE}}",
      description: "{{SEO_DESCRIPTION}}",
      keywords: "{{SEO_KEYWORDS}}"
    }
  },
  
  // Single language (Spanish only)
  singleEs: {
    brand: {
      name: "{{BRAND_NAME}}",
      logo: "/logo.png",
      favicon: "/favicon.png",
      primaryColor: "{{PRIMARY_COLOR}}",
      secondaryColor: "{{SECONDARY_COLOR}}"
    },
    content: {
      tagline: "{{TAGLINE}}",
      subtitle: "{{SUBTITLE}}",
      cta: "{{CTA}}",
      learnMore: "Saber más"
    },
    languages: {
      default: "es",
      available: ["es"],
      multilingual: false
    },
    domain: {
      type: "{{DOMAIN_TYPE}}",
      subdomain: "{{SUBDOMAIN}}",
      customDomain: "{{CUSTOM_DOMAIN}}"
    },
    contact: {
      email: "{{CONTACT_EMAIL}}",
      formAction: "{{FORM_ACTION}}"
    },
    seo: {
      title: "{{SEO_TITLE}}",
      description: "{{SEO_DESCRIPTION}}",
      keywords: "{{SEO_KEYWORDS}}"
    }
  },
  
  // Multilingual (English + Spanish)
  multilingual: {
    brand: {
      name: "{{BRAND_NAME}}",
      logo: "/logo.png",
      favicon: "/favicon.png",
      primaryColor: "{{PRIMARY_COLOR}}",
      secondaryColor: "{{SECONDARY_COLOR}}"
    },
    content: {
      tagline: "{{TAGLINE}}",
      subtitle: "{{SUBTITLE}}",
      cta: "{{CTA}}",
      learnMore: "Learn more"
    },
    languages: {
      default: "{{DEFAULT_LANG}}",
      available: ["en", "es"],
      multilingual: true
    },
    domain: {
      type: "{{DOMAIN_TYPE}}",
      subdomain: "{{SUBDOMAIN}}",
      customDomain: "{{CUSTOM_DOMAIN}}"
    },
    contact: {
      email: "{{CONTACT_EMAIL}}",
      formAction: "{{FORM_ACTION}}"
    },
    seo: {
      title: "{{SEO_TITLE}}",
      description: "{{SEO_DESCRIPTION}}",
      keywords: "{{SEO_KEYWORDS}}"
    }
  }
};

// Function to replace placeholders in config
function replacePlaceholders(config, variables) {
  const configStr = JSON.stringify(config, null, 2);
  let result = configStr;
  
  Object.keys(variables).forEach(key => {
    const placeholder = `{{${key.toUpperCase()}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), variables[key]);
  });
  
  return JSON.parse(result);
}

// Function to generate configuration
function generateConfig(options) {
  const {
    brandName,
    tagline,
    subtitle,
    cta,
    contactEmail,
    language = 'en',
    multilingual = false,
    domainType = 'subdomain',
    subdomain = 'mmdlab.tech',
    customDomain = null,
    primaryColor = '#8b5cf6',
    secondaryColor = '#6366f1'
  } = options;

  // Choose template based on language configuration
  let template;
  if (multilingual) {
    template = configTemplates.multilingual;
  } else if (language === 'es') {
    template = configTemplates.singleEs;
  } else {
    template = configTemplates.singleEn;
  }

  // Prepare variables
  const variables = {
    BRAND_NAME: brandName,
    TAGLINE: tagline,
    SUBTITLE: subtitle,
    CTA: cta,
    CONTACT_EMAIL: contactEmail,
    DOMAIN_TYPE: domainType,
    SUBDOMAIN: subdomain,
    CUSTOM_DOMAIN: customDomain || '',
    PRIMARY_COLOR: primaryColor,
    SECONDARY_COLOR: secondaryColor,
    DEFAULT_LANG: language,
    SEO_TITLE: `${brandName} - ${tagline}`,
    SEO_DESCRIPTION: subtitle,
    SEO_KEYWORDS: 'business, solutions, technology',
    FORM_ACTION: `https://formsubmit.co/${contactEmail}`
  };

  // Generate config
  const config = replacePlaceholders(template, variables);
  
  return config;
}

// Function to save configuration
function saveConfig(config, outputPath = '../src/config.json') {
  const configPath = path.join(__dirname, outputPath);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Configuration saved to: ${configPath}`);
}

// Function to generate CNAME
function generateCNAME(config) {
  let cnameContent = '';
  
  if (config.domain.type === 'subdomain') {
    cnameContent = config.domain.subdomain;
  } else if (config.domain.type === 'custom' && config.domain.customDomain) {
    cnameContent = config.domain.customDomain;
  } else {
    cnameContent = config.domain.subdomain;
  }
  
  const cnamePath = path.join(__dirname, '../CNAME');
  fs.writeFileSync(cnamePath, cnameContent);
  console.log(`CNAME file generated: ${cnameContent}`);
}

// Export functions for use in other scripts
module.exports = {
  generateConfig,
  saveConfig,
  generateCNAME,
  configTemplates
};

// Example usage (if run directly)
if (require.main === module) {
  const exampleConfig = generateConfig({
    brandName: "Acme Corp",
    tagline: "Innovative solutions for modern businesses",
    subtitle: "We help companies transform their digital presence",
    cta: "Get started",
    contactEmail: "hello@acme.com",
    language: "en",
    multilingual: false,
    domainType: "subdomain",
    subdomain: "acme.mmdlab.tech"
  });
  
  saveConfig(exampleConfig);
  generateCNAME(exampleConfig);
} 