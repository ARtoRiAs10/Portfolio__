const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/**
 * Public origin used for canonical URLs, Open Graph tags, robots.txt, and sitemap.xml.
 *
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL are injected automatically.
 * For a custom domain, set NEXT_PUBLIC_SITE_URL in the Vercel project settings.
 */
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const vercelDeploymentUrl = process.env.VERCEL_URL?.trim();

export const siteUrl =
  configuredSiteUrl ||
  (vercelProductionUrl
    ? `https://${vercelProductionUrl}`
    : vercelDeploymentUrl
      ? `https://${vercelDeploymentUrl}`
      : "http://localhost:3000");

export const siteConfig = {
  name: "Gaurav Kumar",
  email: "gauravkum2002@gmail.com",
  github: "https://github.com/ARtoRiAs10",
  title: "Gaurav Kumar — Terminal Portfolio",
  description:
    "Gaurav Kumar is a freelance full-stack and AI engineer building SaaS platforms, real-time collaboration tools, and developer infrastructure. Explore selected projects in a terminal-style portfolio.",
} as const;