import Link from "next/link";
import HomeIntro from "~/components/home-intro";
import RiceCard from "~/components/rice/rice-card";
import { buttonVariants } from "~/components/ui/button";
import { typo } from "~/components/ui/typograpghy";
import { getSEOTags } from "~/lib/seo";
import { getAllCards } from "~/lib/rice";
import { shuffle } from "~/lib/utils";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: "~/.config",
});

const HomePage = () => {
  const gallery = shuffle(getAllCards()).slice(0, 6);

  return (
    <main className="!mt-8 mx-auto max-w-228 space-y-14">
      <HomeIntro />

      <section aria-label="rices" className="space-y-6">
        <h2 className={typo({ variant: "h2" })}>Rices</h2>

        <ol role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((rice) => (
            <RiceCard key={rice.id} rice={rice} />
          ))}
        </ol>

        <div className="flex justify-center">
          <Link href="/rices" className={buttonVariants({ variant: "outline" })}>
            Down the rabbit hole
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
