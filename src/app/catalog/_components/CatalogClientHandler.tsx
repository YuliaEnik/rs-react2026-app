"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Search from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import dynamic from "next/dynamic";

const SelectionFlyout = dynamic(
  () =>
    import("../../../Components/SelectionFlyout/SelectionFlyout").then(
      (mod) => mod.SelectionFlyout,
    ),
  { ssr: false },
);

interface HandlerProps {
  initialQuery: string;
  currentPage: number;
  totalPages: number;
  children: React.ReactNode;
}

export default function CatalogClientHandler({
  initialQuery,
  currentPage,
  totalPages,
  children,
}: HandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (query: string, page: number) => {
    const currentParamsString = searchParams ? searchParams.toString() : "";
    const params = new URLSearchParams(currentParamsString);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    params.set("page", String(page));

    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue === initialQuery) return;
    updateUrl(searchValue, 1);
  };

  const handlePageChange = (newPage: number) => {
    updateUrl(initialQuery, newPage);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      {children}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      <SelectionFlyout />
    </>
  );
}
