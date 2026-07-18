"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface RicePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RicePagination = ({ page, totalPages, onPageChange }: RicePaginationProps) => {
  const [jumping, setJumping] = useState(false);
  const [draft, setDraft] = useState("");

  if (totalPages <= 1) return null;

  const submitJump = () => {
    const target = Number(draft);
    if (Number.isInteger(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
    }
    setJumping(false);
    setDraft("");
  };

  return (
    <nav className="flex flex-wrap items-center justify-center gap-3" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Page {page} of {totalPages}
        {jumping ? (
          <Input
            autoFocus
            type="number"
            min={1}
            max={totalPages}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={submitJump}
            onKeyDown={(event) => {
              if (event.key === "Enter") submitJump();
              if (event.key === "Escape") {
                setJumping(false);
                setDraft("");
              }
            }}
            className="h-7 w-16 px-2 text-center"
          />
        ) : (
          <button
            type="button"
            onClick={() => setJumping(true)}
            aria-label="Jump to page"
            className="el-focus-styles rounded-sm px-1 underline decoration-dotted underline-offset-2 hover:text-foreground"
          >
            ...
          </button>
        )}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </nav>
  );
};

export default RicePagination;
