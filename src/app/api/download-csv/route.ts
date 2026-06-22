import { NextResponse } from "next/server";
import type { IData } from "../../../types/types";

export async function POST(request: Request) {
  try {
    const selectedCards: IData[] = await request.json();

    const headers = "ID,Title,Creation Date\n";
    const rows = selectedCards
      .map(
        (card) =>
          `${card.id},"${card.title.replace(/"/g, '""')}",${card.creation_date || "Unknown"}`,
      )
      .join("\n");

    const csvContent = headers + rows;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=selected_artworks.csv",
      },
    });
  } catch (error) {
    console.error("Server CSV generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 },
    );
  }
}
