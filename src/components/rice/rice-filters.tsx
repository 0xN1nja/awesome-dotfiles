"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import type { FilterMeta, FilterOption, RiceSource } from "~/lib/rice-shared";

export type FilterKey = "distro" | "wm" | "colorscheme" | "utils_used";

export const EMPTY_FILTERS: Record<FilterKey, string[]> = {
  distro: [],
  wm: [],
  colorscheme: [],
  utils_used: [],
};

const FILTER_ORDER: FilterKey[] = ["distro", "wm", "colorscheme", "utils_used"];

const FILTER_LABELS: Record<FilterKey, string> = {
  distro: "Distro",
  wm: "DE/WM",
  colorscheme: "Colorscheme",
  utils_used: "Utils",
};

const SOURCE_LABELS: Record<RiceSource, string> = {
  reddit: "Reddit",
  github: "GitHub",
};

const SOURCE_ORDER: RiceSource[] = ["reddit", "github"];

interface FilterDropdownProps {
  label: string;
  activeCount: number;
  children: React.ReactNode;
}

const FilterDropdown = ({ label, activeCount, children }: FilterDropdownProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="gap-1.5 normal-case">
        {label}
        {activeCount > 0 && (
          <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {activeCount}
          </span>
        )}
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </Button>
    </PopoverTrigger>

    <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>{children}</PopoverContent>
  </Popover>
);

interface FilterOptionListProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

const FilterOptionList = ({ label, options, selected, onToggle }: FilterOptionListProps) => {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const selectedOptions = options.filter((option) => selected.includes(option.value));
  const unselectedOptions = options.filter((option) => !selected.includes(option.value));
  const matchingUnselected = needle
    ? unselectedOptions.filter((option) => option.value.toLowerCase().includes(needle))
    : unselectedOptions;

  const renderOption = (option: FilterOption) => {
    const id = `${label}-${option.value}`;
    const checked = selected.includes(option.value);

    return (
      <li key={option.value}>
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-sm normal-case hover:bg-accent"
        >
          <Checkbox id={id} checked={checked} onCheckedChange={() => onToggle(option.value)} />
          <span className="flex-1 truncate">{option.value}</span>
          <span className="text-xs text-muted-foreground">{option.count}</span>
        </label>
      </li>
    );
  };

  return (
    <div className="space-y-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${label.toLowerCase()}...`}
        className="h-8"
      />

      <ul role="list" className="max-h-56 space-y-0.5 overflow-y-auto">
        {selectedOptions.map(renderOption)}

        {selectedOptions.length > 0 && matchingUnselected.length > 0 && (
          <li role="presentation" className="my-1 border-t" />
        )}

        {matchingUnselected.length > 0
          ? matchingUnselected.map(renderOption)
          : selectedOptions.length === 0 && (
              <li className="px-1.5 py-2 text-sm text-muted-foreground">No matches</li>
            )}
      </ul>
    </div>
  );
};

interface RiceFiltersProps {
  filterMeta: FilterMeta;
  selected: Record<FilterKey, string[]>;
  onToggle: (key: FilterKey, value: string) => void;
  sourceCounts: Record<RiceSource, number>;
  selectedSources: RiceSource[];
  onToggleSource: (value: RiceSource) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const RiceFilters = ({
  filterMeta,
  selected,
  onToggle,
  sourceCounts,
  selectedSources,
  onToggleSource,
  onClear,
  hasActiveFilters,
}: RiceFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTER_ORDER.map((key) => (
        <FilterDropdown key={key} label={FILTER_LABELS[key]} activeCount={selected[key].length}>
          <FilterOptionList
            label={FILTER_LABELS[key]}
            options={filterMeta[key]}
            selected={selected[key]}
            onToggle={(value) => onToggle(key, value)}
          />
        </FilterDropdown>
      ))}

      <FilterDropdown label="Source" activeCount={selectedSources.length}>
        <ul role="list" className="space-y-0.5">
          {SOURCE_ORDER.map((source) => {
            const id = `source-${source}`;
            const checked = selectedSources.includes(source);

            return (
              <li key={source}>
                <label
                  htmlFor={id}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-sm normal-case hover:bg-accent"
                >
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() => onToggleSource(source)}
                  />
                  <span className="flex-1 truncate">{SOURCE_LABELS[source]}</span>
                  <span className="text-xs text-muted-foreground">{sourceCounts[source]}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </FilterDropdown>

      <Button
        variant="ghost"
        size="sm"
        className="gap-1 text-muted-foreground"
        onClick={onClear}
        disabled={!hasActiveFilters}
      >
        <X className="size-3.5" aria-hidden="true" />
        Clear filters
      </Button>
    </div>
  );
};

export default RiceFilters;
