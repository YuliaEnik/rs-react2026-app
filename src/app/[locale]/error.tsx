"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("errorBoundary");

  useEffect(() => {
    console.error("Next.js Server Error caught:", error);
  }, [error]);

  return (
    <div
      className="error-boundary"
      style={{ padding: "40px", textAlign: "center" }}
    >
      <h2>{t("heading")}</h2>
      <p>{error.message || t("fallbackMessage")}</p>
      <button onClick={() => reset()}>{t("tryAgainBtn")}</button>
    </div>
  );
}
