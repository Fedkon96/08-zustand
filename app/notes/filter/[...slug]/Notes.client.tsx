'use client';

import css from './Notes.module.css';

import { GrFormAdd, GrDocument } from 'react-icons/gr';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '@/components/Loader/Loader';
import { Tag } from '@/types/note';
import Link from 'next/link';

interface NotesClientProps {
  tag: Tag | undefined;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={handlePageChange}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          <GrFormAdd /> <GrDocument />
        </Link>
      </header>

      {isSuccess && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Notes not found</p>
      )}
      {isLoading && !data && <Loader />}
    </div>
  );
};

export default NotesClient;
