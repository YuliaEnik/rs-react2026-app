"use server";

import { redirect } from "next/navigation";

export async function handleSearchAction(formData: FormData) {
  const query = formData.get("query")?.toString() || "";

  if (query.trim()) {
    redirect(`/catalog?query=${encodeURIComponent(query.trim())}&page=1`);
  } else {
    redirect("/catalog?page=1");
  }
}

export async function handleSelectAction(formData: FormData) {
  const id = formData.get("id")?.toString() || "";
  const currentPage = formData.get("page")?.toString() || "1";
  const currentQuery = formData.get("query")?.toString() || "";

  const params = new URLSearchParams();
  if (currentQuery) params.set("query", currentQuery);
  params.set("page", currentPage);
  if (id) params.set("id", id);

  redirect(`/catalog?${params.toString()}`);
}

export async function handleCloseAction(formData: FormData) {
  const currentPage = formData.get("page")?.toString() || "1";
  const currentQuery = formData.get("query")?.toString() || "";

  const params = new URLSearchParams();
  if (currentQuery) params.set("query", currentQuery);
  params.set("page", currentPage);

  redirect(`/catalog?${params.toString()}`);
}
