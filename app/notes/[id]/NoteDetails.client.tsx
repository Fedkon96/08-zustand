'use client';

import css from './NoteDetails.module.css';

import { fetchNoteId } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id),
    refetchOnMount: false,
  });

  return (
    <>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>
              <span className={css.tag}>{note.tag}</span>
              {note.content}
            </p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetailsClient;
