import './globals.css';
import type { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Intranet ELIM',
  description: 'Mi descripción de la página',
  icons: { icon: '/images/logo_elim.jpg', },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
