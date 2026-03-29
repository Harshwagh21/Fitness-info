import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <img
          src="/logo/logo-1.png"
          alt="Built Different"
          className="h-6 w-28 invert dark:invert-0"
        />
      ),
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
