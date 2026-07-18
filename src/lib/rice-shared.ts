export type RiceSource = "reddit" | "github";

export interface RiceCard {
  id: string;
  title: string;
  preview_image: string | null;
  is_gallery: boolean;
  author: string;
  gallery_images: string[];
  utils_used: string[];
  wm: string | null;
  distro: string | null;
  colorscheme: string | null;
  score?: number;
  created_utc: number;
  source: RiceSource;
  source_url?: string;
}

export interface RiceDetail extends RiceCard {
  permalink?: string;
  github_url: string;
  num_comments?: number;
}

export interface FilterOption {
  value: string;
  count: number;
}

export interface FilterMeta {
  wm: FilterOption[];
  distro: FilterOption[];
  colorscheme: FilterOption[];
  utils_used: FilterOption[];
}

export interface FilterIndex {
  wm: Record<string, string[]>;
  distro: Record<string, string[]>;
  colorscheme: Record<string, string[]>;
  utils_used: Record<string, string[]>;
}

export function resolveRiceImages(rice: {
  is_gallery: boolean;
  gallery_images: string[] | null | undefined;
  preview_image: string | null;
}): string[] {
  const galleryImages = rice.gallery_images ?? [];
  if (rice.is_gallery && galleryImages.length > 1) return galleryImages;
  if (rice.preview_image) return [rice.preview_image];
  return galleryImages.slice(0, 1);
}
