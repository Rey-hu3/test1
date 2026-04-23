import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maxikash Digital Audit Dashboard',
  description: 'Dashboard interactivo para presentar hallazgos, riesgos y oportunidades de Maxikash.mx'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
