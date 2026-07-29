const Chips = ({
  wm,
  distro,
  colorscheme,
}: {
  wm: string | null;
  distro: string | null;
  colorscheme: string | null;
}) => {
  const chips = [wm, distro, colorscheme].filter((value): value is string => Boolean(value));

  if (chips.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-x-2 top-2 z-[5] flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
        >
          {chip}
        </span>
      ))}
    </div>
  );
};

export default Chips;
