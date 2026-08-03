const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'service-account.json');

if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
  console.error("❌ Error: 'service-account.json' file not found in project root folder!");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const baseUrl = 'https://valuepilot.vercel.app';

// 1. Core pages
const primaryRoutes = [
  `${baseUrl}`,
  `${baseUrl}/calculators/mortgage`,
  `${baseUrl}/calculators/debt-payoff`,
  `${baseUrl}/calculators/car-loan`,
  `${baseUrl}/calculators/budget`,
  `${baseUrl}/calculators/refinance`,
  `${baseUrl}/calculators/retirement`,
  `${baseUrl}/calculators/401k`,
  `${baseUrl}/calculators/ira`,
  `${baseUrl}/calculators/tax-refund`,
  `${baseUrl}/calculators/net-worth`,
  `${baseUrl}/guides/credit-score`,
  `${baseUrl}/blog`,
  `${baseUrl}/glossary`,
  `${baseUrl}/about`,
  `${baseUrl}/contact`,
  `${baseUrl}/privacy`,
  `${baseUrl}/terms`,
  `${baseUrl}/disclaimer`,
];

// 2. Automatically parse all blog post slugs from blogData.ts
const blogDataPath = path.join(__dirname, '..', 'src', 'lib', 'blogData.ts');
const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

const slugRegex = /slug:\s*["']([^"']+)["']/g;
const blogUrls = [];
let match;

while ((match = slugRegex.exec(blogDataContent)) !== null) {
  blogUrls.push(`${baseUrl}/blog/${match[1]}`);
}

const urlsToSubmit = Array.from(new Set([...primaryRoutes, ...blogUrls]));

async function sendIndexingRequest(indexingApi, url) {
  try {
    await indexingApi.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log(`✅ Indexed: ${url}`);
  } catch (error) {
    console.error(`❌ Failed: ${url} | ${error.message}`);
  }
}

async function runBulkIndexing() {
  console.log("🚀 Initializing Google Indexing API Authentication...");
  try {
    const authClient = await auth.getClient();
    const keyData = require(SERVICE_ACCOUNT_FILE);
    const indexingApi = google.indexing({ version: 'v3', auth: authClient });

    console.log(`🔑 Authenticated as: ${keyData.client_email}\n`);
    console.log(`Submitting ALL ${urlsToSubmit.length} URLs to Google Indexing API...\n`);

    for (let i = 0; i < urlsToSubmit.length; i++) {
      await sendIndexingRequest(indexingApi, urlsToSubmit[i]);
      // 120ms pause between requests to strictly follow Google rate limits
      await new Promise(res => setTimeout(res, 120));
    }

    console.log(`\n🎉 All ${urlsToSubmit.length} URLs successfully submitted to Google Indexing API!`);
  } catch (err) {
    console.error('❌ Authorization Failed:', err.message);
  }
}

runBulkIndexing();
