export default function FilterBarBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="
        w-full
        bg-card
        rounded-2xl
        border border-border
        shadow-sm
        px-4 py-3
      "
    >
      <div className="flex items-end gap-4 flex-wrap">
        {children}
      </div>
    </div>
  );
}
