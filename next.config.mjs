/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/mortgage-calculator', destination: '/calculators/mortgage' },
      { source: '/mortgage-payment-calculator', destination: '/calculators/mortgage' },
      { source: '/house-payment-calculator', destination: '/calculators/mortgage' },
      { source: '/debt-payoff-calculator', destination: '/calculators/debt-payoff' },
      { source: '/credit-card-payoff-calculator', destination: '/calculators/debt-payoff' },
      { source: '/budget-planner', destination: '/calculators/budget' },
      { source: '/retirement-calculator', destination: '/calculators/retirement' },
      { source: '/401k-calculator', destination: '/calculators/401k' },
      { source: '/ira-calculator', destination: '/calculators/ira' },
      { source: '/tax-refund-calculator', destination: '/calculators/tax-refund' },
      { source: '/net-worth-calculator', destination: '/calculators/net-worth' },
      { source: '/car-loan-calculator', destination: '/calculators/car-loan' },
      { source: '/refinance-calculator', destination: '/calculators/refinance' },
      { source: '/credit-score-guide', destination: '/guides/credit-score' },
    ];
  },
};

export default nextConfig;
