import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, getSidebarTabs } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      tabMode="auto"
      sidebar={{
        tabs: getSidebarTabs(),
      }}
    >
      {children}
    </DocsLayout>
  );
}
