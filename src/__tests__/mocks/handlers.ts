import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/artworks", ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("q");

    console.log("MSW intercepted request for:", searchTerm);

    if (searchTerm === "UnknownArt") {
      return HttpResponse.json({
        data: [],
        hasMore: false,
      });
    }

    return HttpResponse.json({
      data: [
        {
          id: 1,
          title: "Test Artwork 1",
          creators: [{ description: "Artist 1" }],
          images: { web: { url: "" } },
        },
        {
          id: 2,
          title: "Test Artwork 2",
          creators: [{ description: "Artist 2" }],
          images: { web: { url: "" } },
        },
      ],
      hasMore: true,
    });
  }),
];
