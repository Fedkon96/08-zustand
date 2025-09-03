import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateNote } from '@/types/note';

export const initialDraft: CreateNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: CreateNote;
  setDraft: (note: Partial<CreateNote>) => void;
  clearDraft: VoidFunction;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft' },
  ),
);
