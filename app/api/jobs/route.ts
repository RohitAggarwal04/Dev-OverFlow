import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchQuery, page, filter } = await req.json();

  const url = `https://jsearch.p.rapidapi.com/search?query=${searchQuery}%20in%20${filter}&page=${page}&num_pages=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e0a0a123c5msh3e2bb5703d914e0p1713c9jsn37070b07fd84",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return NextResponse.json({ message: "OK", result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
