import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/modal/ModalProvider';
import { ToastProvider } from '@/components/toast/ToastProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lakeora — Lakeside Cafe, Camping & Stays at Pawna Lake',
  description:
    'Lakeora: sunrise over the water, birdsong, fresh coffee and great food. Book lakeside tents, glamping and cottages at Pawna Lake — 2 hours from Pune and Mumbai.',
  keywords: ['Pawna Lake camping', 'lakeside camping', 'Lonavala camping', 'glamping Maharashtra', 'Pawna Lake tents', 'cottage stay Lonavala', 'camping near Mumbai', 'camping near Pune'],
  authors: [{ name: 'Lakeora' }],
  creator: 'Lakeora',
  publisher: 'Lakeora',
  alternates: {
    canonical: 'https://lakeorastay.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lakeorastay.com',
    siteName: 'Lakeora',
    title: 'Lakeora — Lakeside Cafe, Camping & Stays at Pawna Lake',
    description: 'Book lakeside tents, glamping and cottages at Pawna Lake. Just 2 hours from Pune and Mumbai. Bonfires, BBQ, kayaking, and live music.',
    images: [
      {
        url: 'https://lakeorastay.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lakeora Pawna Lake Camping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakeora — Lakeside Camping at Pawna Lake',
    description: 'Book lakeside tents, glamping and cottages at Pawna Lake. Just 2 hours from Pune and Mumbai.',
    images: ['https://lakeorastay.com/og-image.jpg'],
    creator: '@lakeora',
  },
  icons: {
    icon: '/logos/logo.PNG',
    apple: '/logos/logo.PNG',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-forest-deep font-sans">
        <ToastProvider>
          <ModalProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
