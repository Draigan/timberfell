import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Examples',
      links: [
        { text: 'Homes — SaaS', href: getPermalink('/homes/saas') },
        { text: 'Homes — Startup', href: getPermalink('/homes/startup') },
        { text: 'Homes — Mobile App', href: getPermalink('/homes/mobile-app') },
        { text: 'Homes — Personal', href: getPermalink('/homes/personal') },
        { text: 'Pages — Features (Anchor Link)', href: getPermalink('/#features') },
        { text: 'Pages — Services', href: getPermalink('/services') },
        { text: 'Pages — Pricing', href: getPermalink('/pricing') },
        { text: 'Pages — About us', href: getPermalink('/about') },
        { text: 'Pages — Contact', href: getPermalink('/contact') },
        { text: 'Pages — Terms', href: getPermalink('/terms') },
        { text: 'Pages — Privacy policy', href: getPermalink('/privacy') },
        { text: 'Landing — Lead Generation', href: getPermalink('/landing/lead-generation') },
        { text: 'Landing — Long-form Sales', href: getPermalink('/landing/sales') },
        { text: 'Landing — Click-Through', href: getPermalink('/landing/click-through') },
        { text: 'Landing — Product Details', href: getPermalink('/landing/product') },
        { text: 'Landing — Coming Soon / Pre-Launch', href: getPermalink('/landing/pre-launch') },
        { text: 'Landing — Subscription', href: getPermalink('/landing/subscription') },
        { text: 'Blog — List', href: getBlogPermalink() },
        { text: 'Blog — Article', href: getPermalink('get-started-website-with-astro-tailwind-css', 'post') },
        { text: 'Blog — Article (MDX)', href: getPermalink('markdown-elements-demo-post', 'post') },
        { text: 'Blog — Category Page', href: getPermalink('tutorials', 'category') },
        { text: 'Blog — Tag Page', href: getPermalink('astro', 'tag') },
        { text: 'Widgets', href: '#' },
      ],
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo"> Arthelokyo</a> · All rights reserved.
  `,
};
