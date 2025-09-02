import axios from 'axios';
import { Note, Tag } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${myKey}`,
    Accept: 'application/json',
  },
});

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: Tag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNoteCreate {
  title: string;
  content: string;
  tag: Tag;
}

// ! GET
export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: { [key: string]: string | number } = {
    page,
    perPage: 6,
  };

  if (search && search.trim() !== '') {
    params.search = search;
  }

  if (tag && tag.trim() !== '') {
    params.tag = tag;
  }

  const res = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
}

export async function fetchNoteId(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

// ! POST
export async function createNote(newNote: FetchNoteCreate): Promise<Note> {
  const { data } = await api.post<Note>('/notes', newNote);
  return data;
}

// ! DELETE
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

// !!!!!!!!!!!!
