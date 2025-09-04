import css from './page.module.css';
import { Metadata } from 'next';
import NotFoundRedirect from '@/app/NotFoundRedirect';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Sorry, something went wrong, the page was not found.',
  openGraph: {
    title: 'Page not found',
    description: 'Sorry, something went wrong, the page was not found.',
    url: 'https://08-zustand-seven-phi.vercel.app/',
    images: [
      {
        url: '/images/note.jpg',
        width: 1200,
        height: 630,
        alt: 'Ack! the page was not found.',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        You will be redirected to the homepage in a few seconds…
      </p>
      <NotFoundRedirect />
    </div>
  );
};

export default NotFound;
