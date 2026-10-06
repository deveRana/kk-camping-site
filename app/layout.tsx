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
  icons: { icon: '/logos/logo.PNG' },
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
