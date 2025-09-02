'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteId } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface NotePreviewProps {
  id?: string;
}

const NotePreview = ({ id: propId }: NotePreviewProps) => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };

  const params = useParams<{ id: string }>();
  const id = propId ?? params.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id!),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={onClose}>
      {note && (
        <div>
          <h2 className={css.titlePreview}>{note.title}</h2>

          <div className={css.tagPreview}>{note.tag}</div>

          <p className={css.contentPreview}>{note.content}</p>

          <div className={css.datePreview}>{note.createdAt}</div>
        </div>
      )}
      {isError && <p>There was an error, please try again...</p>}
      {isLoading && <p>Loading...</p>}
    </Modal>
  );
};

export default NotePreview;
