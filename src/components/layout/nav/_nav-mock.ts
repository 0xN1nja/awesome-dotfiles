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
];

export type NavType = typeof navData;
