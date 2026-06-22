import { NextResponse } from "next/server";
import { IData } from "../../../../types/types";

export async function POST(request: Request) {
  try {
    const selectedCards: IData[] = await request.json();

    const headers = [
      "ID",
      "Title",
      "Author",
      "Creation Date",
      "Description",
      "Image URL",
    ].join(",");

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

    const csvContent = "\uFEFF" + [headers, ...csvRows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "X-Total-Count": String(selectedCards.length),
      },
    });
  } catch (error) {
    console.error("Server CSV generation failed:", error);
    return NextResponse.json({ error: "Failed to generate CSV" }, { status: 500 });
  }
}
