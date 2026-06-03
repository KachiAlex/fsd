export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-off">
      <div className="w-8 h-8 border-2 border-mid/20 border-t-mid rounded-full animate-spin" />
      <p className="text-xs text-muted mt-3">Loading...</p>
    </div>
  );
}
