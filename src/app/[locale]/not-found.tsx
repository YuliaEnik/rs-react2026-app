import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import "./../../pages/NotFoundPage/NotFoundPage.scss";

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  const t = await getTranslations({ locale, namespace: "pages.notFound" });

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>{t("heading")}</h1>
        <h2>{t("subheading")}</h2>
        <p>{t("message")}</p>
        <Link href="/" className="home-link">
          {t("backLink")}
        </Link>
      </div>
    </div>
  );
}
