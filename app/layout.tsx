import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/modal/ModalProvider';
import { ToastProvider } from '@/components/toast/ToastProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LakeStay — Lakeside Camping & Cottages at Pawna Lake',
  description:
    'Book premium lakeside camping, glamping tents, and cottages at Pawna Lake. Bonfires, kayaking, BBQ, and unforgettable sunsets — 2 hours from Pune and Mumbai.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-terracotta-deep font-sans">
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
