"use client";
import { ReactNode } from "react";

import BottomBlur from "~/components/bottom-blur";
import { TooltipProvider } from "~/components/ui/tooltip";
import TopLoader from "~/components/ui/top-loader";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider>
      <TopLoader />
      {children}
      <BottomBlur />
    </TooltipProvider>
  );
};

export default RootProviders;
