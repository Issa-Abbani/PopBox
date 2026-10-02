"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BookHeart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MovieDialog } from "@/components/movies/MovieDialog";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import { getMovieNotesClient } from "@/lib/reviews/getMovieNotes";

type MovieNoteModalProps = {
  open: boolean;
  onClose: () => void;
  movie: OmdbSearchResult;
};

export async function handlePostMovieNotes(
  movie: OmdbSearchResult,
  notes: string,
) {
  const response = await fetch("/api/reviews/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie,
      notes,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.error || "Couldn't save movie notes");
  }

  return response.json();
}

export function MovieNoteModal({ open, onClose, movie }: MovieNoteModalProps) {
  const [noteDraft, setNoteDraft] = useState("");
  const [noteAdded, setNoteAdded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadNotes() {
      try {
        const notes = await getMovieNotesClient(movie.imdbID);

        if (!cancelled) {
          setNoteDraft(notes);
        }
      } catch (error) {
        console.error("Failed to load movie notes:", error);
      }
    }

    loadNotes();

    return () => {
      cancelled = true;
    };
  }, [open, movie.imdbID]);

  const addNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = noteDraft.trim();
    if (!text || saving) return;

    try {
      setSaving(true);

      await handlePostMovieNotes(movie, text);

      setNoteDraft(text);
      setNoteAdded(true);
    } catch (error) {
      console.error("Failed to save note:", error);
      setNoteAdded(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <MovieDialog open={open} onClose={onClose} labelledBy="movie-notes-title">
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
          <span aria-live="polite">{noteAdded ? "Note saved." : " "}</span>

          <span>{noteDraft.length.toLocaleString()} / 2000 characters</span>
        </div>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button type="submit" disabled={!noteDraft.trim() || saving}>
            {saving ? "Saving..." : "Save note"}
          </Button>
        </div>
      </form>
    </MovieDialog>
  );
}
