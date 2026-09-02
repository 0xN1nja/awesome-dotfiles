import config from "~/config";

const Footer = () => {
  return (
    <footer className="!mt-auto flex flex-col items-center justify-center py-4">
      <div className="flex w-full flex-wrap items-center justify-center gap-2 text-center sm:justify-between">
        <span>
          Built with ❤️ by{" "}
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            0xN1nja
          </a>
        </span>

        <ul role="list" className="flex items-center gap-2 text-sm">
          <li role="listitem">
            <a
              href={`https://${config.domainName}/feed.xml`}
              target="_blank"
              rel="noopener noreferrer external"
              aria-label="visit rss feed"
              className="el-focus-styles text-ring underline"
            >
              RSS FEED
            </a>
          </li>
          <span> / </span>
          <li role="listitem">
            <a
              href={`https://${config.domainName}/sitemap.xml`}
              target="_blank"
              rel="noopener noreferrer external"
              className="el-focus-styles text-ring underline"
            >
              SITE MAP
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
