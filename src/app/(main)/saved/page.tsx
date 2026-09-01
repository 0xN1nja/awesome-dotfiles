import SavedList from "~/components/rice/saved-list";
import { getSEOTags } from "~/lib/seo";
import { getAllCards } from "~/lib/rice";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: "Saved",
  description: "Your bookmarked dotfiles and rices, saved locally in your browser.",
  canonicalUrlRelative: "/saved",
});

const SavedPage = () => {
  const cards = getAllCards();

  return (
    <div className="!mt-8 space-y-4">
      <h1 className="text-xl font-medium">Saved Rices</h1>
      <SavedList cards={cards} />
    </div>
  );
};

export default SavedPage;
