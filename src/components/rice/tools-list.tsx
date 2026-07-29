const ToolsList = ({ tools, showLabel = true }: { tools: string[]; showLabel?: boolean }) => {
  if (tools.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {showLabel && <p className="text-xs font-medium text-muted-foreground">Tools used</p>}
      <ul className="flex flex-wrap gap-1.5" role="list">
        {tools.map((tool) => (
          <li
            key={tool}
            role="listitem"
            className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsList;
