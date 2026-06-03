"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="font-serif text-2xl font-semibold text-navy mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-muted mb-6 max-w-md">
        We encountered an unexpected error. Please try again or return home.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="bg-mid text-white text-xs font-semibold px-5 py-2.5 rounded hover:bg-mid/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-transparent text-navy text-xs font-semibold px-5 py-2.5 rounded border border-border hover:bg-off transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
