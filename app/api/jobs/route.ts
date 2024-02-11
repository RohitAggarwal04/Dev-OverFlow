import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchQuery, page, filter } = await req.json();

  const url = `https://jsearch.p.rapidapi.com/search?query=${searchQuery}%20in%20${filter}&page=${page}&num_pages=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.JSEARCH_API_KEY}`,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return NextResponse.json({ message: "OK", result });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message });
  }
}
