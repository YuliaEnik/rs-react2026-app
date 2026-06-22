"use client";

import { useEffect } from "react";
import { TEXT } from "../constants/text";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Next.js Server Error caught:", error);
  }, [error]);

  return (
    <div
      className="error-boundary"
      style={{ padding: "40px", textAlign: "center" }}
    >
      <h2>{TEXT.errorBoundary.heading}</h2>
      <p>{error.message || TEXT.errorBoundary.fallbackMessage}</p>
      <button onClick={() => reset()}>{TEXT.catalog.tryAgainBtn}</button>
    </div>
  );
}
