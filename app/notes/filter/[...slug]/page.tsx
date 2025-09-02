import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
const allowedTags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;

  let tag: Tag | undefined;

  if (slug[0] === 'All%20notes') {
    tag = undefined;
  } else if (allowedTags.includes(slug[0] as Tag)) {
    tag = slug[0] as Tag;
  } else {
    tag = undefined;
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ search: '', page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
