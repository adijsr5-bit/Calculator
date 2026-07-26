const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'service-account.json');

if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
  console.error("❌ Error: 'service-account.json' file not found in project root folder!");
  console.error("👉 Please place your downloaded Google Cloud service-account.json in the project root folder.\n");
  process.exit(1);
}

const key = require(SERVICE_ACCOUNT_FILE);

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

const baseUrl = 'https://valuepilot.vercel.app';

// All valid site URLs
const urlsToSubmit = [
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

  // Blog articles
  `${baseUrl}/blog/how-mortgage-interest-works`,
  `${baseUrl}/blog/how-to-improve-credit-score`,
  `${baseUrl}/blog/how-to-save-money-fast`,
  `${baseUrl}/blog/what-is-a-good-debt-to-income-ratio`,
  `${baseUrl}/blog/understanding-401k-matching`,
  `${baseUrl}/blog/roth-ira-vs-traditional-ira`,
  `${baseUrl}/blog/50-30-20-budgeting-rule-explained`,
  `${baseUrl}/blog/how-to-pay-off-credit-card-debt-fast`,
  `${baseUrl}/blog/how-car-loan-interest-is-calculated`,
  `${baseUrl}/blog/when-should-you-refinance-your-mortgage`,
];

async function sendIndexingRequest(url) {
  try {
    const response = await google.indexing({ version: 'v3', auth: jwtClient }).urlNotifications.publish({
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
    await jwtClient.authorize();
    console.log(`🔑 Authenticated as: ${key.client_email}\n`);
    console.log(`Submitting ${urlsToSubmit.length} URLs to Google Indexing API...\n`);

    for (let i = 0; i < urlsToSubmit.length; i++) {
      await sendIndexingRequest(urlsToSubmit[i]);
      // Small 100ms pause to avoid rate limiting
      await new Promise(res => setTimeout(res, 100));
    }

    console.log('\n🎉 All URLs successfully submitted to Google Indexing API!');
  } catch (err) {
    console.error('❌ Authorization Failed:', err.message);
  }
}

runBulkIndexing();
