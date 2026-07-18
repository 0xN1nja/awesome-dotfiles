import React from "react";
import config from "~/config";
import { Button } from "./ui/button";
import { MdOutlineSupportAgent } from "react-icons/md";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

const SupportButton = ({ onReset }: { onReset?: () => void }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {typeof onReset === "undefined" && (
        <Button asChild variant="outline">
          <Link href="/" className="flex items-center gap-2" replace aria-label="Home">
            <span className="text-base">
              <AiFillHome />
            </span>
            Back to Home
          </Link>
        </Button>
      )}

      {typeof onReset === "function" && (
        <Button
          variant="outline"
          onClick={onReset}
          className="flex items-center gap-2"
          aria-label="Reset"
        >
          <span className="text-base">
            <GrPowerReset />
          </span>
          Try again
        </Button>
      )}

      <Button asChild variant="outline">
        <a
          href={`mailto:${config.social.email}`}
          target="_blank"
          className="flex items-center gap-2"
          rel="noreferrer"
          aria-label="Support"
        >
          <MdOutlineSupportAgent />
          Support
        </a>
      </Button>
    </div>
  );
};

export default SupportButton;
