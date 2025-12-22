export default function FilterBarBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="
        inline-block
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        px-4 py-3
      "
    >
      <div className="flex items-end gap-4">
        {children}
      </div>
    </div>
  );
}
