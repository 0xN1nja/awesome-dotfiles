"use client";

import { Button } from "~/components/ui/button";

export type SortMode = "newest" | "oldest" | "random";

const OPTIONS: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "random", label: "Random" },
];

interface RiceSortProps {
  value: SortMode;
  onChange: (mode: SortMode) => void;
}

const RiceSort = ({ value, onChange }: RiceSortProps) => {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Sort rices">
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default RiceSort;
