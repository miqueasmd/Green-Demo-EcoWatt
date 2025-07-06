const { generateConfig, saveConfig, generateCNAME } = require('./configure-landing');

// Example 1: Single language (English) with subdomain
console.log('=== Example 1: Single language (English) with subdomain ===');
const config1 = generateConfig({
  brandName: "TechStart",
  tagline: "Accelerate your startup's growth",
  subtitle: "AI-powered solutions for modern startups",
  cta: "Start free trial",
  contactEmail: "hello@techstart.com",
  language: "en",
  multilingual: false,
  domainType: "subdomain",
  subdomain: "techstart.mmdlab.tech"
});

saveConfig(config1);
generateCNAME(config1);
console.log('');

// Example 2: Single language (Spanish) with custom domain
console.log('=== Example 2: Single language (Spanish) with custom domain ===');
const config2 = generateConfig({
  brandName: "Soluciones Digitales",
  tagline: "Transformamos tu negocio digital",
  subtitle: "Soluciones tecnológicas a medida para empresas",
  cta: "Solicitar consulta",
  contactEmail: "info@solucionesdigitales.es",
  language: "es",
  multilingual: false,
  domainType: "custom",
  customDomain: "solucionesdigitales.es"
});

saveConfig(config2, '../src/config-es.json');
generateCNAME(config2);
console.log('');

// Example 3: Multilingual with subdomain
console.log('=== Example 3: Multilingual with subdomain ===');
const config3 = generateConfig({
  brandName: "Global Solutions",
  tagline: "Worldwide business solutions",
  subtitle: "International consulting and technology services",
  cta: "Contact us",
  contactEmail: "info@globalsolutions.com",
  language: "en",
  multilingual: true,
  domainType: "subdomain",
  subdomain: "global.mmdlab.tech"
});

saveConfig(config3, '../src/config-multilingual.json');
generateCNAME(config3);
console.log('');

console.log('All example configurations generated successfully!');
console.log('You can now test different setups by copying the desired config to src/config.json'); 