import { fetchNoteId } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';

interface NoteDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteId(id);

  return {
    title: note.title,
    description: note.content.slice(0, 15),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 30),
      url: `https://08-zustand-seven-phi.vercel.app/notes/${id}`,
      images: [
        {
          url: '/images/note.jpg',
          width: 1200,
          height: 630,
          alt: 'Note image',
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
