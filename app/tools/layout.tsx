import { baseOptions } from '@/lib/layout.shared';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export default function ToolsLayout({ children }: LayoutProps<'/tools'>) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}

