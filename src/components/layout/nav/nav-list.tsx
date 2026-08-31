"use client";
import { Dispatch, SetStateAction } from "react";
import { navData } from "./_nav-mock";
import NavItem from "./nav-item";

const CONTRIBUTING_URL = "https://github.com/0xN1nja/awesome-dotfiles/blob/master/CONTRIBUTING.md";

interface NavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const NavList: React.FC<NavProps> = ({ setOpen }) => {
  const onSubmitClick = () => {
    if (typeof setOpen === "function") {
      setOpen(false);
    }
  };

  return (
    <ul role="list" className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
      {navData.map((nav) => (
        <NavItem key={nav.id} setOpen={setOpen} {...nav} />
      ))}

      <li role="listitem" onClick={onSubmitClick}>
        <a
          href={CONTRIBUTING_URL}
          target="_blank"
          rel="noopener noreferrer external"
          aria-label="Submit your rice"
          className="el-focus-styles inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          Submit your rice
        </a>
      </li>
    </ul>
  );
};

export default NavList;
