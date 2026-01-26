import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Built Different',
      url: '/',
    },
    links: [],
  };
}

export function getSidebarTabs() {
  return [
    {
      title: 'Home',
      url: '/docs',
      // This will match /docs and all /docs/* routes via prefix matching
    },
    {
      title: 'Tools',
      url: '/tools',
    },
  ];
}
