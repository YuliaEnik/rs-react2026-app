import { redirect } from "../../i18n/navigation";

interface LocaleHomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({
  searchParams,
  params,
}: LocaleHomePageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  const queryString = new URLSearchParams(
    resolvedSearchParams as Record<string, string>,
  ).toString();

  redirect({
    href: queryString ? `/catalog?${queryString}` : `/catalog`,
    locale: locale,
  });
}
