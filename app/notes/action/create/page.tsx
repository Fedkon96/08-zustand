import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create a note',
  openGraph: {
    title: 'Create Note',
    description: 'Create a note',
    url: 'https://08-zustand-seven-phi.vercel.app/notes/action/create',
    type: 'website',
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
