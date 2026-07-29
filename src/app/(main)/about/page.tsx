import { getSEOTags } from "~/lib/seo";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: "About",
  description: "About awesome-dotfiles, plus submission and removal guidelines.",
  canonicalUrlRelative: "/about",
});

const CONTRIBUTING_URL = "https://github.com/0xN1nja/awesome-dotfiles/blob/master/CONTRIBUTING.md";

const AboutPage = () => {
  return (
    <div className="!mt-8 mx-auto max-w-228 space-y-8">
      <h1 className="font-serif text-2xl">About</h1>

      <section className="space-y-2">
        <p className="text-base text-muted-foreground">
          Built by <span className="text-white">Abhimanyu Sharma</span> (
          <a
            href="https://github.com/0xN1nja"
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            0xN1nja
          </a>
          ) —{" "}
          <a
            href="https://github.com/0xN1nja"
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            github.com/0xN1nja
          </a>
          ,{" "}
          <a
            href="https://0xn1nja.dev"
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            0xn1nja.dev
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">What this is</h2>
        <p className="text-base text-muted-foreground">
          awesome-dotfiles is a browsable, filterable collection of dotfiles (&ldquo;rices&rdquo;) —
          scraped from{" "}
          <a
            href="https://reddit.com/r/unixporn"
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            r/unixporn
          </a>{" "}
          and supplemented with community submissions via GitHub. Reddit gives you no way to filter
          posts by distro, window manager, or colorscheme — this site exists to fix that.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Credit &amp; ownership</h2>
        <p className="text-base text-muted-foreground">
          Every rice on this site is credited to its original author — the username shown on each
          card and detail page links back to them. This site only indexes and displays setups for
          discovery; it does not own or claim any of them. Each rice belongs to the person who made
          it.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Submission</h2>
        <p className="text-base text-muted-foreground">
          Make a PR on this repo. See{" "}
          <a
            href={CONTRIBUTING_URL}
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            CONTRIBUTING.md
          </a>{" "}
          for the JSON template, required fields, and where to add your file.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Removals</h2>
        <p className="text-base text-muted-foreground">Make a PR on this repo.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Acknowledgements</h2>
        <p className="text-base text-muted-foreground">
          This site started as a fork of{" "}
          <a
            href="https://ayushworks.com"
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            ayushworks.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
