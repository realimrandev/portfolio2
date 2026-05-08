export default function Loading() {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-midnight-deep">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-emerald-glow/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-glow" />
      </div>
    </div>
  );
}
