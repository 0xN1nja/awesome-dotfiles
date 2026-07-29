import { ConfigProps } from "./types/config";

export const config = {
  appName: "awesome-dotfiles",
  appDescription:
    "4000+ unique rices scraped from r/unixporn. Filter by distro, window manager, colorscheme, or utils used. Finding the perfect rice has never felt easier.",

  domainName: "dotfiles.lol",

  colors: {
    theme: "dark",
    main: "#000000",
  },

  social: {
    github: "https://github.com/0xN1nja",
  },
} as ConfigProps;

export default config;
