import { createId } from "@paralleldrive/cuid2";

export const navData = [
  {
    id: createId(),
    label: "$ ~/",
    path: "/",
  },
  {
    id: createId(),
    label: "Rices",
    path: "/rices",
  },
  {
    id: createId(),
    label: "About",
    path: "/about",
  },
  {
    id: createId(),
    label: "awesome-dotfiles",
    path: "https://github.com/0xN1nja/awesome-dotfiles",
    external: true,
  },
];

export type NavType = typeof navData;
