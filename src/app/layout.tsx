import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const viewport: Viewport = {
  themeColor: '#18490D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Hostxeon - Affordable Hosting Pakistan | High-Performance Web Hosting',
    template: '%s | Hostxeon Hosting'
  },
  description: 'Launch your website with Hostxeon, the most affordable hosting in Pakistan. Get high-speed NVMe SSD storage, free SSL, and 24/7 expert support.',
  keywords: ['Affordable Hosting Pakistan', 'Best Web Hosting', 'Shared Hosting Pakistan', 'VPS Hosting Pakistan', 'WordPress Hosting', 'Dedicated Servers'],
  authors: [{ name: 'Hostxeon Team' }],
  creator: 'Hostxeon',
  publisher: 'Hostxeon Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hostxeon.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hostxeon - Professional Web Hosting Solutions',
    description: 'High-performance, secure, and affordable hosting infrastructure powered by WHMCS.',
    url: 'https://hostxeon.com',
    siteName: 'Hostxeon',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hostxeon - Web Hosting Pakistan',
    description: 'The fastest hosting infrastructure in Pakistan.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
