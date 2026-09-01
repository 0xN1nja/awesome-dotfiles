"use client";

import { useMemo } from "react";
import type { RiceCard as RiceCardType } from "~/lib/rice-shared";
import { useBookmarkIds } from "~/lib/bookmarks";
import ContentNotFound from "~/components/ui/content-not-found";
import RiceCard from "./rice-card";

interface SavedListProps {
  cards: RiceCardType[];
}

const SavedList = ({ cards }: SavedListProps) => {
  const bookmarkedIds = useBookmarkIds();

  const savedCards = useMemo(() => {
    const idSet = new Set(bookmarkedIds);
    return cards.filter((card) => idSet.has(card.id));
  }, [cards, bookmarkedIds]);

  if (savedCards.length === 0) {
    return (
      <ul role="list">
        <ContentNotFound text="No saved rices yet" />
      </ul>
    );
  }

  return (
    <ol role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {savedCards.map((rice, index) => (
        <RiceCard key={rice.id} rice={rice} priority={index < 3} />
      ))}
    </ol>
  );
};

export default SavedList;
