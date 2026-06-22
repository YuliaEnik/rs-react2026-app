import { redirect } from "next/navigation";
interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const queryString = new URLSearchParams(
    params as Record<string, string>,
  ).toString();

  redirect(queryString ? `/catalog?${queryString}` : "/catalog");
}
