export type Theme = "light" | "dark";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;

  social: {
    github: string;
    email: string;
  };

  colors: {
    theme: Theme;
    main: string;
  };
}
