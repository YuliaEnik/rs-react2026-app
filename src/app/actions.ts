"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function getCurrentLocale() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const match = pathname.match(/^\/(en|ru)/);
  return match ? match[1] : "en";
}

export async function handleSearchAction(formData: FormData) {
  const query = formData.get("query")?.toString() || "";

  const locale =
    formData.get("locale")?.toString() || (await getCurrentLocale());

  if (query.trim()) {
    redirect(
      `/${locale}/catalog?query=${encodeURIComponent(query.trim())}&page=1`,
    );
  } else {
    redirect(`/${locale}/catalog?page=1`);
  }
}

export async function handleSelectAction(formData: FormData) {
  const id = formData.get("id")?.toString() || "";
  const currentPage = formData.get("page")?.toString() || "1";
  const currentQuery = formData.get("query")?.toString() || "";

  const locale =
    formData.get("locale")?.toString() || (await getCurrentLocale());

  const params = new URLSearchParams();
  if (currentQuery) params.set("query", currentQuery);
  params.set("page", currentPage);
  if (id) params.set("id", id);

  redirect(`/${locale}/catalog?${params.toString()}`);
}

export async function handleCloseAction(formData: FormData) {
  const currentPage = formData.get("page")?.toString() || "1";
  const currentQuery = formData.get("query")?.toString() || "";

  const locale =
    formData.get("locale")?.toString() || (await getCurrentLocale());

  const params = new URLSearchParams();
  if (currentQuery) params.set("query", currentQuery);
  params.set("page", currentPage);

  redirect(`/${locale}/catalog?${params.toString()}`);
}
