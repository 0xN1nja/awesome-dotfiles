import fs from "fs";
import path from "path";
import type { FilterIndex, FilterMeta, FilterOption, RiceCard, RiceDetail } from "./rice-shared";

export type {
  FilterIndex,
  FilterMeta,
  FilterOption,
  RiceCard,
  RiceDetail,
  RiceSource,
} from "./rice-shared";
export { resolveRiceImages } from "./rice-shared";

const DATA_DIR = path.join(process.cwd(), "data");

interface GithubSubmissionInput {
  title: string;
  author: string;
  preview_image: string;
  gallery_images?: string[];
  github_url: string;
  wm: string;
  distro?: string;
  colorscheme?: string;
  utils_used?: string[];
}

function loadGithubSubmissions(): RiceDetail[] {
  const dir = path.join(DATA_DIR, "github");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => {
      const username = f.replace(/\.json$/, "");
      const rices = JSON.parse(
        fs.readFileSync(path.join(dir, f), "utf8"),
      ) as GithubSubmissionInput[];

      return rices.map(
        (rice, i): RiceDetail => ({
          id: `gh-${username}-${i}`,
          title: rice.title,
          author: rice.author,
          preview_image: rice.preview_image,
          gallery_images: rice.gallery_images ?? [],
          is_gallery: (rice.gallery_images?.length ?? 0) > 1,
          github_url: rice.github_url,
          wm: rice.wm,
          distro: rice.distro ?? null,
          colorscheme: rice.colorscheme ?? null,
          utils_used: rice.utils_used ?? [],
          created_utc: Math.floor(Date.now() / 1000),
          source: "github",
          source_url: `https://github.com/0xN1nja/awesome-dotfiles/blob/master/data/github/${f}`,
        }),
      );
    });
}

interface RedditDataFile {
  cards: Omit<RiceCard, "source">[];
  filterMeta: FilterMeta;
  filterIndex: FilterIndex;
}

let cachedCards: RiceCard[] | null = null;
let cachedFilterMeta: FilterMeta | null = null;
let cachedFilterIndex: FilterIndex | null = null;

function loadRedditData(): RedditDataFile {
  const raw = fs.readFileSync(path.join(DATA_DIR, "reddit", "rice-data.json"), "utf8");
  return JSON.parse(raw) as RedditDataFile;
}

function bumpFilter(
  meta: FilterOption[],
  index: Record<string, string[]>,
  value: string,
  id: string,
) {
  const existing = meta.find((o) => o.value === value);
  if (existing) {
    existing.count += 1;
  } else {
    meta.push({ value, count: 1 });
  }
  (index[value] ??= []).push(id);
}

function prefixIndex(index: Record<string, string[]>): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const [value, ids] of Object.entries(index)) {
    result[value] = ids.map((id) => `reddit-${id}`);
  }
  return result;
}

function buildFilters(reddit: RedditDataFile, githubRices: RiceDetail[]) {
  const filterMeta: FilterMeta = {
    wm: reddit.filterMeta.wm.map((o) => ({ ...o })),
    distro: reddit.filterMeta.distro.map((o) => ({ ...o })),
    colorscheme: reddit.filterMeta.colorscheme.map((o) => ({ ...o })),
    utils_used: reddit.filterMeta.utils_used.map((o) => ({ ...o })),
  };
  const filterIndex: FilterIndex = {
    wm: prefixIndex(reddit.filterIndex.wm),
    distro: prefixIndex(reddit.filterIndex.distro),
    colorscheme: prefixIndex(reddit.filterIndex.colorscheme),
    utils_used: prefixIndex(reddit.filterIndex.utils_used),
  };

  for (const rice of githubRices) {
    if (rice.wm) bumpFilter(filterMeta.wm, filterIndex.wm, rice.wm, rice.id);
    if (rice.distro) bumpFilter(filterMeta.distro, filterIndex.distro, rice.distro, rice.id);
    if (rice.colorscheme) {
      bumpFilter(filterMeta.colorscheme, filterIndex.colorscheme, rice.colorscheme, rice.id);
    }
    for (const util of rice.utils_used) {
      bumpFilter(filterMeta.utils_used, filterIndex.utils_used, util, rice.id);
    }
  }

  for (const key of Object.keys(filterMeta) as (keyof FilterMeta)[]) {
    filterMeta[key].sort((a, b) => b.count - a.count);
  }

  return { filterMeta, filterIndex };
}

function loadAll() {
  if (cachedCards && cachedFilterMeta && cachedFilterIndex) {
    return { cards: cachedCards, filterMeta: cachedFilterMeta, filterIndex: cachedFilterIndex };
  }

  const reddit = loadRedditData();
  const redditCards: RiceCard[] = reddit.cards.map((c) => ({
    ...c,
    id: `reddit-${c.id}`,
    source: "reddit",
  }));

  const githubRices = loadGithubSubmissions();
  const { filterMeta, filterIndex } = buildFilters(reddit, githubRices);

  cachedCards = [...redditCards, ...githubRices];
  cachedFilterMeta = filterMeta;
  cachedFilterIndex = filterIndex;

  return { cards: cachedCards, filterMeta: cachedFilterMeta, filterIndex: cachedFilterIndex };
}

export function getAllCards(): RiceCard[] {
  return loadAll().cards;
}

export function getFilterMeta(): FilterMeta {
  return loadAll().filterMeta;
}

export function getFilterIndex(): FilterIndex {
  return loadAll().filterIndex;
}

let cachedDetails: Record<string, Omit<RiceDetail, "source">> | null = null;

function loadRedditDetails() {
  if (!cachedDetails) {
    const raw = fs.readFileSync(path.join(DATA_DIR, "reddit", "rice-details.json"), "utf8");
    cachedDetails = JSON.parse(raw);
  }
  return cachedDetails!;
}

export function getRiceDetail(id: string): RiceDetail | undefined {
  if (id.startsWith("gh-")) {
    return loadGithubSubmissions().find((r) => r.id === id);
  }

  const rawId = id.replace(/^reddit-/, "");
  const details = loadRedditDetails();
  const detail = details[rawId];
  if (!detail) return undefined;

  return {
    ...detail,
    id: `reddit-${detail.id}`,
    source: "reddit",
    gallery_images: detail.gallery_images ?? [],
  };
}
