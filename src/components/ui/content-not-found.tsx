import { Frown } from "lucide-react";
import React from "react";

const ContentNotFound = ({ text }: { text: string }) => {
  return (
    <li role="listitem" className="flex h-60 w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <Frown />
        <h2 className="text-lg">{text}</h2>
      </div>
    </li>
  );
};

export default ContentNotFound;
