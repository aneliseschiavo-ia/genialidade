import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Genialidade - Diagnóstico Neural',
  description: 'Formulário de diagnóstico neural estruturado',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
