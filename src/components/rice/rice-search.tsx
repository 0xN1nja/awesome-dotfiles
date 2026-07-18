"use client";

import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

interface RiceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const RiceSearch = ({ value, onChange }: RiceSearchProps) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-2 top-2/4 size-4 -translate-y-2/4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by title or username..."
        className="w-full rounded-lg bg-background pl-8"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default RiceSearch;
