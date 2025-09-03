'use client';

import css from './page.module.css';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Sorry, something went wrong, the page was not found.',
  openGraph: {
    title: 'Page not found',
    description: 'Sorry, something went wrong, the page was not found.',
    // url: 'https://bc-76-next-practice.vercel.app/',
    images: [
      {
        url: '/public/images/note.jpg',
        width: 1200,
        height: 630,
        alt: 'Ack! the page was not found.',
      },
    ],
  },
};

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        You will be redirected to the homepage in a few seconds…
      </p>
    </div>
  );
};

export default NotFound;
