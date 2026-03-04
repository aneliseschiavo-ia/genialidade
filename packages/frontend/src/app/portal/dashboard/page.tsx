import { Metadata } from 'next';
import { PortalDashboard } from '@/components/PortalDashboard';

export const metadata: Metadata = {
  title: 'Portal Cliente - Genialidade',
  description: 'Seu diagnóstico e informações da sessão',
};

export default function PortalDashboardPage() {
  return <PortalDashboard />;
}
