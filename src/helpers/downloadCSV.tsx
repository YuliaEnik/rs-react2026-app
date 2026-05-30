import type { IData } from "../types/types";

const downloadCSV = (selectedCards: IData[]) => {
  const count = selectedCards.length;
  if (count === 0) return;
  const headers = [
    "ID",
    "Title",
    "Author",
    "Creation Date",
    "Description",
    "Image URL",
  ];

  const csvRows = selectedCards.map((item) => {
    const title = item.title || "Unknown Title";
    const author = item.creators?.[0]?.description || "Unknown";
    const date = item.creation_date || "Unknown";
    const desc = item.description || "";
    const imgUrl = item.images?.web?.url || "";

    return [
      `"${item.id}"`,
      `"${title.replace(/"/g, '""')}"`,
      `"${author.replace(/"/g, '""')}"`,
      `"${date.replace(/"/g, '""')}"`,
      `"${desc.replace(/"/g, '""')}"`,
      `"${imgUrl}"`,
    ].join(",");
  });

  const csvContent = [headers.join(","), ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${count}_items.csv`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export { downloadCSV };
