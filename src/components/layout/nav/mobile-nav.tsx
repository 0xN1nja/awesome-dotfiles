"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import NavList from "./nav-list";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] px-6 pt-12"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>
        <NavList setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
