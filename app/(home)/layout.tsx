import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, getSidebarTabs } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      tabMode="auto"
      sidebar={{
        tabs: getSidebarTabs(),
        banner: (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground">
              💪 Built Different
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Science-backed fitness guidance
            </p>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
