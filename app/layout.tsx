import type { Metadata } from 'next';
import { Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'An application for note-taking and organization',
  openGraph: {
    title: 'NoteHub',
    description: 'An application for note-taking and organization',
    url: 'https://08-zustand-seven-phi.vercel.app/',
    images: [
      {
        url: '/images/note.jpg',
        width: 1200,
        height: 630,
        alt: 'An application for note-taking and organization',
      },
    ],
  },
};

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
