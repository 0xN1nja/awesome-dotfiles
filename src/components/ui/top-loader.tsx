"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const TopLoader = () => {
  return <ProgressBar height="4px" color={"#ffffff"} shallowRouting />;
};

export default TopLoader;
