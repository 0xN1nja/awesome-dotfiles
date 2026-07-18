import RiceList from "~/components/rice/rice-list";
import { getSEOTags } from "~/lib/seo";
import { getAllCards, getFilterIndex, getFilterMeta } from "~/lib/rice";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: "Rices",
  description:
    "Browse dotfiles and rices from r/unixporn, filterable by distro, WM/DE, colorscheme and tools used.",
  canonicalUrlRelative: "/rices",
});

const RicesPage = () => {
  const cards = getAllCards();
  const filterMeta = getFilterMeta();
  const filterIndex = getFilterIndex();

  return (
    <div className="!mt-8 space-y-4">
      <h1 className="text-xl font-medium">All Rices</h1>
      <RiceList cards={cards} filterMeta={filterMeta} filterIndex={filterIndex} />
    </div>
  );
};

export default RicesPage;
