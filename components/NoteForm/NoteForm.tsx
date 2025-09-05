'use client';

import css from './NoteForm.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { SlArrowDown } from 'react-icons/sl';
import { HiMiniCheck } from 'react-icons/hi2';
import { HiMiniXMark } from 'react-icons/hi2';
import { CreateNote } from '@/types/note';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';

import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
};

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
      clearDraft();
    },
  });

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNote;
    mutate(values);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.display} htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            name="title"
            value={draft.title}
            onChange={handleChange}
            className={`${css.input} ${css.flex}`}
            minLength={3}
            maxLength={64}
            required
          />
          <span className={css.inputInvalidText}>
            The title must contain between 3 and 64 characters!
          </span>
        </label>
      </div>

      <div className={css.formGroup}>
        <label className={css.display} htmlFor="content">
          Content
          <textarea
            id="content"
            name="content"
            rows={8}
            className={`${css.textarea} ${css.flex}`}
            value={draft.content}
            onChange={handleChange}
            minLength={3}
            maxLength={1000}
            required
          />
          <span className={css.areaInvalidText}>
            From 3 to 1000 characters!
          </span>
        </label>
      </div>

      <div className={css.formGroup}>
        <label className={css.arrowFather} htmlFor="tag">
          Tag
          <SlArrowDown className={css.arrow} />
          <select
            id="tag"
            name="tag"
            value={draft.tag}
            onChange={handleChange}
            className={`${css.select} ${css.flex}`}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </label>
      </div>

      <div className={css.actions}>
        <button
          onClick={() => router.back()}
          type="button"
          className={css.cancelButton}
          aria-label="Go back"
        >
          <HiMiniXMark className={css.closeX} />
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? (
            <ClipLoader
              className={css.spinner}
              color="#fff"
              size={20}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <HiMiniCheck className={css.closeV} />
          )}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
