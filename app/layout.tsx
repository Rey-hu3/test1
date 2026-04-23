import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maxikash Audit Dashboard',
  description: 'Dashboard ejecutivo sobre la presencia digital, riesgos y plan de acción para Maxikash.mx.',
  applicationName: 'Maxikash Audit Dashboard',
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: 'Maxikash Audit Dashboard',
    description: 'Presencia digital, riesgos y ruta de mejora para Maxikash.mx.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
