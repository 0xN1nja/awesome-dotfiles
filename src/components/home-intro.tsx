import Image from "next/image";
import Link from "next/link";
import { typo } from "./ui/typograpghy";

const introImage = "/arch_guy.jpg";

const HomeIntro = () => {
  return (
    <section className="grid gap-8 sm:gap-4 md:grid-cols-3" aria-label="About">
      <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
        <h1 className="font-serif text-2xl sm:text-3xl">There&apos;s no place like ~/.config</h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">4000+ unique rices</span> scraped from{" "}
          <a
            href="https://reddit.com/r/unixporn"
            target="_blank"
            rel="noopener noreferrer external"
            className="el-focus-styles text-ring underline"
          >
            r/unixporn
          </a>
          . Filter by distro, window manager, colorscheme, or utils used. Finding the perfect rice
          has never felt easier.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Sort by newest, oldest, or hit <span className="text-white">random</span> and see what
          turns up — or search by title or username if you already know who you&apos;re looking for.
          Every rice links back to the original Reddit post and a{" "}
          <span className="text-white">GitHub dotfiles repo you can clone</span>.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          People spend more time finding rices and configuring their computer than actually using
          it. Imagine a place where a perfectly configured setup&apos;s dotfiles are{" "}
          <Link href="/rices" className="el-focus-styles text-ring underline">
            a click away
          </Link>
          .
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Good posts on Reddit sink below the timeline and stay lost — there&apos;s no easy way to
          preview and filter rices in a single grid. <span className="text-white">Until now.</span>
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Want to submit your own setup? check the{" "}
          <Link href="/about" className="el-focus-styles text-ring underline">
            submission instructions
          </Link>{" "}
          on the about page.
        </p>
      </div>

      <div className="relative order-1 block aspect-square rotate-3 sm:order-2 sm:hidden md:block md:self-center">
        <Image
          alt="awesome-dotfiles"
          src={introImage}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="size-full rounded-md object-cover shadow-md"
          priority
        />
      </div>
    </section>
  );
};

export default HomeIntro;
