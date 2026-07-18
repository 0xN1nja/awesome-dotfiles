# Contributing to awesome-dotfiles

Want your setup on the site? Open a PR adding a JSON file with your rice(s).

## Where to add your file

Create a file at:

```
data/github/<your-github-username>.json
```

Use your actual GitHub username, lowercase, e.g. `data/github/0xn1nja.json`.

## File format

The file is a JSON **array** — you can list more than one rice if you have several setups to submit.

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

### Required fields

| Field | Type | Notes |
|---|---|---|
| `title` | string | A short description of your setup. |
| `author` | string | Your GitHub username. |
| `preview_image` | string | URL to the main screenshot. |
| `github_url` | string | Link to your dotfiles repo. |
| `wm` | string | Your window manager or DE (e.g. `hyprland`, `i3`, `gnome`). |

### Optional fields

| Field | Type | Notes |
|---|---|---|
| `gallery_images` | string[] | Additional screenshots, if you have more than one. |
| `distro` | string | Your Linux/BSD distro. |
| `colorscheme` | string | Your colorscheme (e.g. `catppuccin`, `gruvbox`). |
| `utils_used` | string[] | Notable tools/apps in your setup (terminal, bar, launcher, editor, etc). |

Do **not** include `id`, `source`, or `source_url` — those are derived automatically at build time.

## Getting image URLs

Drag and drop your screenshot(s) into a GitHub PR description box (or any GitHub comment box) — GitHub auto-uploads the image and gives you a stable `https://github.com/user-attachments/assets/...` link. Use that link as your `preview_image`/`gallery_images` values.

## Opening the PR

1. Fork the repo.
2. Add or edit `data/github/<your-github-username>.json`.
3. Open a PR. Once merged, your rice(s) will show up on [dotfiles.lol](https://dotfiles.lol) alongside the r/unixporn scrape.

## Removals

Want a rice removed (yours, or one scraped from r/unixporn that shouldn't be here)? Open a PR removing it.