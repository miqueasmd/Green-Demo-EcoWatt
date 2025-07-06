const fs = require('fs');
const path = require('path');

// Read the config file
const configPath = path.join(__dirname, '../src/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Generate CNAME content based on configuration
let cnameContent = '';

if (config.domain.type === 'subdomain') {
  // For subdomain setup: client.mmdlab.tech
  cnameContent = `${config.domain.subdomain}`;
} else if (config.domain.type === 'custom' && config.domain.customDomain) {
  // For custom domain setup
  cnameContent = config.domain.customDomain;
} else {
  // Fallback to subdomain
  cnameContent = `${config.domain.subdomain}`;
}

// Write CNAME file
const cnamePath = path.join(__dirname, '../CNAME');
fs.writeFileSync(cnamePath, cnameContent);

console.log(`CNAME file generated with content: ${cnameContent}`); 