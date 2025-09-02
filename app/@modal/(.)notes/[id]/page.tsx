import { fetchNoteId } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreview from './NotePreview.client';

interface PreviewProps {
  params: Promise<{ id: string }>;
}

const PreviewPage = async ({ params }: PreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default PreviewPage;
