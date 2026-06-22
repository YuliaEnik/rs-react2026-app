"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./../../../pages/DetailsPage/DetailsPage.scss";

export default function CloseButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("id");
    router.push(`?${params.toString()}`);
  };
  
  return (
    <div className="btn-modal" onClick={handleClose}>
      <p className="btn-modal__img">✕</p>
    </div>
  );
}
