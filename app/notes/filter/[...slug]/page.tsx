import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { Metadata } from 'next';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: slug[0] === 'All%20notes' ? 'All notes' : `${slug[0]} notes`,
    description:
      slug[0] === 'All%20notes' ? 'All notes' : `Notes with tag ${slug[0]}`,
    openGraph: {
      title: slug[0] === 'All%20notes' ? 'All notes' : `${slug[0]} notes`,
      description:
        slug[0] === 'All%20notes' ? 'All notes' : `Notes with tag ${slug[0]}`,
      url: `https://08-zustand-seven-phi.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: '/images/note.jpg',
          width: 1200,
          height: 630,
          alt: slug[0] === 'All%20notes' ? 'All notes' : `${slug[0]} notes`,
        },
      ],
    },
  };
};

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
