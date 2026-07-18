"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  FilterIndex,
  FilterMeta,
  RiceCard as RiceCardType,
  RiceSource,
} from "~/lib/rice-shared";
import { shuffle } from "~/lib/utils";
import ContentNotFound from "~/components/ui/content-not-found";
import { EMPTY_FILTERS, type FilterKey } from "./rice-filters";
import RiceFilters from "./rice-filters";
import RicePagination from "./rice-pagination";
import RiceCard from "./rice-card";
import RiceSearch from "./rice-search";
import RiceSort, { type SortMode } from "./rice-sort";

const PAGE_SIZE = 24;

interface RiceListProps {
  cards: RiceCardType[];
  filterMeta?: FilterMeta;
  filterIndex?: FilterIndex;
}

function matchesSearch(rice: RiceCardType, query: string) {
  if (!query) return true;
  const needle = query.toLowerCase();
  return rice.title.toLowerCase().includes(needle) || rice.author.toLowerCase().includes(needle);
}

function buildFilterIdSets(filterIndex: FilterIndex, filters: Record<FilterKey, string[]>) {
  const sets: Partial<Record<FilterKey, Set<string>>> = {};

  (Object.keys(filters) as FilterKey[]).forEach((key) => {
    const values = filters[key];
    if (values.length === 0) return;

    const ids = new Set<string>();
    values.forEach((value) => {
      (filterIndex[key][value] ?? []).forEach((id) => ids.add(id));
    });
    sets[key] = ids;
  });

  return sets;
}

const RiceList = ({ cards, filterMeta, filterIndex }: RiceListProps) => {
  const hasFilters = Boolean(filterMeta && filterIndex);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<FilterKey, string[]>>(EMPTY_FILTERS);
  const [selectedSources, setSelectedSources] = useState<RiceSource[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("random");
  const [randomOrder, setRandomOrder] = useState(cards);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomOrder(shuffle(cards));
  }, [cards]);

  const filterIdSets = useMemo(
    () => (filterIndex ? buildFilterIdSets(filterIndex, filters) : {}),
    [filterIndex, filters],
  );

  const sourceCounts = useMemo(() => {
    const counts: Record<RiceSource, number> = { reddit: 0, github: 0 };
    cards.forEach((rice) => {
      counts[rice.source] += 1;
    });
    return counts;
  }, [cards]);

  const displayList = useMemo(() => {
    const base = sortMode === "random" ? randomOrder : cards;

    const filtered = base.filter((rice) => {
      if (!matchesSearch(rice, search)) return false;
      if (selectedSources.length > 0 && !selectedSources.includes(rice.source)) return false;
      return Object.values(filterIdSets).every((idSet) => !idSet || idSet.has(rice.id));
    });

    if (sortMode === "newest") return [...filtered].sort((a, b) => b.created_utc - a.created_utc);
    if (sortMode === "oldest") return [...filtered].sort((a, b) => a.created_utc - b.created_utc);
    return filtered;
  }, [sortMode, randomOrder, cards, search, filterIdSets, selectedSources]);

  const totalPages = Math.max(1, Math.ceil(displayList.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = displayList.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (mode: SortMode) => {
    if (mode === "random") setRandomOrder(shuffle(cards));
    setSortMode(mode);
    setPage(1);
  };

  const handleFilterToggle = (key: FilterKey, value: string) => {
    setFilters((prev) => {
      const active = prev[key];
      const next = active.includes(value) ? active.filter((v) => v !== value) : [...active, value];
      return { ...prev, [key]: next };
    });
    setPage(1);
  };

  const handleSourceToggle = (value: RiceSource) => {
    setSelectedSources((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setSelectedSources([]);
    setPage(1);
  };

  const hasActiveFilters =
    selectedSources.length > 0 || Object.values(filters).some((values) => values.length > 0);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {hasFilters && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <RiceSearch value={search} onChange={handleSearchChange} />
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <RiceSort value={sortMode} onChange={handleSortChange} />
          {hasFilters && filterMeta && (
            <RiceFilters
              filterMeta={filterMeta}
              selected={filters}
              onToggle={handleFilterToggle}
              sourceCounts={sourceCounts}
              selectedSources={selectedSources}
              onToggleSource={handleSourceToggle}
              onClear={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}
        </div>
      </div>

      {pageItems.length > 0 ? (
        <ol role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((rice, index) => (
            <RiceCard key={rice.id} rice={rice} priority={index < 3} />
          ))}
        </ol>
      ) : (
        <ul role="list">
          <ContentNotFound text="No rices found" />
        </ul>
      )}

      <RicePagination page={clampedPage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default RiceList;
