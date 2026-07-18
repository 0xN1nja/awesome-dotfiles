# Rice data schema

This is the source of truth for the scraped/submitted rice data — schema,
filtering, and how to present it on cards. `PROMPT.md` points here.

## Files

- **`data/generated/rice-data.json`** — grid/filter data. 4036 posts.
- **`data/generated/rice-details.json`** — full per-post detail, keyed by id.
- **`data/github/<username>.json`** — community submissions (schema at the
  bottom). May not exist yet if no submissions have come in.

## `rice-data.json`

```jsonc
{
  "generatedAt": "2026-07-16T13:51:44Z",
  "total": 4036,
  "cards": [ /* see below */ ],
  "filterMeta": {
    "wm": [{ "value": "i3", "count": 930 }, { "value": "bspwm", "count": 580 }, /* ... */],
    "distro": [{ "value": "Arch Linux", "count": 1017 }, /* ... */],
    "colorscheme": [{ "value": "Gruvbox", "count": 218 }, /* ... */],
    "utils_used": [{ "value": "Polybar", "count": 1145 }, /* ... */]
  },
  "filterIndex": {
    "wm": { "i3": ["id1", "id2", ...], "bspwm": [...], ... },
    "distro": { "Arch Linux": [...], ... },
    "colorscheme": { "Gruvbox": [...], ... },
    "utils_used": { "Polybar": [...], ... }
  }
}
```

`filterMeta` is count-sorted, ready for filter dropdown checkboxes.
`filterIndex` maps each value to matching post ids — filter by intersecting
these lists, don't re-scan `cards` on every click. Four filter dropdowns:
**Distro, WM/DE, Colorscheme, Tools Used** — all four, `PROMPT.md`'s
3-dropdown example under-lists them.

`wm`/`distro`/`colorscheme` in `filterIndex`/`filterMeta`/cards are one
value per post. `utils_used` is a list — one post appears under several
different `utils_used` buckets at once.

### Card object (one per post, in `cards`)

```jsonc
{
  "id": "1usv4xs",
  "title": "[vxwm] bar-centric X11 rice (infinite desktop + pywal all the way)",
  "preview_image": "https://preview.redd.it/79aaoyiwyfch1.jpg?...",
  "is_gallery": true,
  "author": "latency-tech",
  "gallery_images": ["https://preview.redd.it/79aaoy...", "https://preview.redd.it/563loo...", "..."],
  "utils_used": ["Kitty", "Thunar"],
  "wm": "vxwm",
  "distro": null,
  "colorscheme": "Horizon",
  "score": 50,
  "created_utc": 1783706406
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Raw Reddit post id. Prefix as `reddit-<id>` when merging with GitHub submissions (see below) — avoids id collisions and marks source. |
| `title` | string | |
| `preview_image` | string \| null | Single static image URL, safe for `<img src>`. Use this for the card thumbnail regardless of gallery/video/image type. |
| `is_gallery` | bool | If true, render the multi-image carousel (nav buttons + slide count) using `gallery_images` below. |
| `gallery_images` | string[] | Full ordered image list. Empty for non-gallery posts (use `preview_image` instead). |
| `author` | string | Reddit username. Link to `reddit.com/user/<author>`. Also searchable — the search bar needs to match against this, not just `title`. |
| `utils_used` | string[] | Cleaned tool names. Render as the card's tag row ("Tools used", no `#` prefix). |
| `wm` | string \| null | Canonicalized. **Null only 0.8% of the time** — treat as reliably present. |
| `distro` | string \| null | Canonicalized. **Null 44.8% of the time** — do not assume present, only render a chip when non-null. |
| `colorscheme` | string \| null | Canonicalized. **Null 61.0% of the time** — the sparsest field. |
| `score` | int | Reddit upvotes, frozen at scrape time. No GitHub-submission equivalent — only render for `source === "reddit"` once merged. |
| `created_utc` | int | Epoch seconds. |

## `rice-details.json`

Dict keyed by raw post id. Same fields as a card, plus:

| Field | Notes |
|---|---|
| `url` | Raw post link (`i.redd.it/...`, gallery URL, etc). Not always embeddable — use `preview_image`/`gallery_images` for display. |
| `permalink` | `reddit.com/r/unixporn/comments/...` — "view reddit post" button. |
| `github_url` | The dotfiles repo — "view dotfiles" button. Always non-null. |
| `num_comments` | Reddit-only, no GitHub equivalent. |
| `spec_source` | Internal scraper debug field, not user-facing. |
| `wmRaw` / `distroRaw` / `colorschemeRaw` | Pre-canonicalization values, for debugging only. |

## GitHub submission schema

For the empty code fence in `PROMPT.md`. One file per contributor at
`data/github/<github-username>.json`, a JSON **array** (one user can
submit multiple rices):

```json
[
  {
    "title": "Minimal Hyprland setup with a floating dock",
    "author": "0xn1nja",
    "preview_image": "https://github.com/user-attachments/assets/xxxx...",
    "gallery_images": ["https://github.com/user-attachments/assets/xxxx..."],
    "github_url": "https://github.com/0xn1nja/dotfiles",
    "wm": "hyprland",
    "distro": "arch linux",
    "colorscheme": "catppuccin",
    "utils_used": ["Waybar", "Kitty", "Rofi", "Neovim"]
  }
]
```

`title`, `author`, `preview_image`, `github_url`, `wm` required.
`gallery_images`, `distro`, `colorscheme`, `utils_used` optional. Don't
include `id`/`source`/`source_url` — derive those at merge time:
`id = "gh-<username>-<index in array>"`, `source = "github"`,
`source_url` = link to the file itself.

Image URLs come from dragging an image into a GitHub PR description box —
it auto-uploads and gives a stable link.

## Merging reddit + github into one grid

One unified `/rices` grid, not separate sections. Combine at build time
(a Server Component reading files off disk, runs once per deploy, not
per-request):

```ts
import fs from "fs";
import path from "path";

function loadGithubSubmissions() {
  const dir = path.join(process.cwd(), "data/github");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .flatMap(f => {
      const username = f.replace(/\.json$/, "");
      const rices = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      return rices.map((rice: any, i: number) => ({
        ...rice,
        id: `gh-${username}-${i}`,
        source: "github",
        source_url: `https://github.com/<you>/<repo>/blob/main/data/github/${f}`,
      }));
    });
}

export function getAllCards() {
  const reddit = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/reddit/rice-data.json"), "utf8"));
  const redditCards = reddit.cards.map((c: any) => ({ ...c, id: `reddit-${c.id}`, source: "reddit" }));
  return [...redditCards, ...loadGithubSubmissions()];
}

export function getRiceDetail(id: string) {
  if (id.startsWith("gh-")) return loadGithubSubmissions().find(r => r.id === id);
  const rawId = id.replace(/^reddit-/, "");
  const details = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/reddit/rice-details.json"), "utf8"));
  return details[rawId];
}
```

Every card gets a `source: "reddit" | "github"` field from this step —
that's what the card/detail UI checks before rendering anything
Reddit-only (`score`, upvote count). GitHub submissions are few, so their
wm/distro/colorscheme/utils_used values can just be looped into the same
`filterIndex`/`filterMeta` counts from `rice-data.json` at this same build
step, rather than needing a second pipeline.

## Resolved product decisions

- Domain: `dotfiles.lol`.
- Reading-time card slot → author name + source icon (reddit/github);
  `u/<username>` format for reddit, linking to their profile. WM does not
  use this slot — wm/distro/colorscheme render as chips on/near the card
  image instead (only when non-null).
- `/tags` gets repurposed into a "browse by tool" page driven by the
  `utils_used` filterIndex (e.g. `/tags/kitty`), not removed.
- Old MDX/blog/Tina content system: fully removed, not left dormant —
  `content/*.mdx`, `velite.config.ts`, `tina/`, `/blog/[...slug]`, and
  MDX-only components (`components/mdx/`, `post-toc.tsx`,
  `post-json-schema.tsx`).
