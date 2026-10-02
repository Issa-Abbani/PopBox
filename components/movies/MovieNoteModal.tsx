"use client";

import { useState, type FormEvent } from "react";
import { BookHeart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MovieDialog } from "@/components/movies/MovieDialog";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";

type MovieNote = {
  id: string;
  text: string;
  createdAt: string;
};

type MovieNoteModalProps = {
  open: boolean;
  onClose: () => void;
  movie: OmdbSearchResult;
};

export function MovieNoteModal({ open, onClose, movie }: MovieNoteModalProps) {
  const [noteDraft, setNoteDraft] = useState("");
  const [notes, setNotes] = useState<MovieNote[]>([]);
  const [noteAdded, setNoteAdded] = useState(false);

  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = noteDraft.trim();
    if (!text) return;

    setNotes((currentNotes) => [
      {
        id: globalThis.crypto.randomUUID(),
        text,
        createdAt: new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date()),
      },
      ...currentNotes,
    ]);
    setNoteDraft("");
    setNoteAdded(true);
  };

  return (
    <MovieDialog
      open={open}
      onClose={onClose}
      labelledBy="movie-notes-title"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-accent">
            <BookHeart className="h-4 w-4" />
            <span>Your notes</span>
          </div>
          <h2 id="movie-notes-title" className="text-xl font-semibold">
            Add a note
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {movie.Title} ({movie.Year})
          </p>
        </div>
        <button
          type="button"
          aria-label="Close notes dialog"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form className="space-y-4 px-5 py-5 sm:px-6" onSubmit={addNote}>
        <label htmlFor="movie-note" className="block text-sm font-medium">
          Note
        </label>
        <textarea
          id="movie-note"
          autoFocus
          rows={5}
          value={noteDraft}
          onChange={(event) => {
            setNoteDraft(event.target.value);
            setNoteAdded(false);
          }}
          placeholder="What stood out to you?"
          className="w-full resize-y rounded-xl border border-border bg-muted px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span aria-live="polite">{noteAdded ? "Note added." : " "}</span>
          <span>{noteDraft.length.toLocaleString()} characters</span>
        </div>

        {notes.length > 0 && (
          <section
            className="space-y-3 border-t border-border pt-4"
            aria-label="Added notes"
          >
            <h3 className="text-sm font-medium">Added notes ({notes.length})</h3>
            <ul className="max-h-48 space-y-2 overflow-y-auto">
              {notes.map((note) => (
                <li key={note.id} className="rounded-xl bg-muted px-4 py-3">
                  <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6">
                    {note.text}
                  </p>
                  <time className="mt-2 block text-xs text-muted-foreground">
                    {note.createdAt}
                  </time>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" disabled={!noteDraft.trim()}>
            Add note
          </Button>
        </div>
      </form>
    </MovieDialog>
  );
}