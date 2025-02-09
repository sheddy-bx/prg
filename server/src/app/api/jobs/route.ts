import { NextResponse } from "next/server";
import { JobsResponse } from "../../../../../types/jobs";

// export const runtime = "edge";
export const dynamic = "force-static";

const CLS = 30;
const CROP_TOKEN = "V9NXD";

export async function GET() {
  try {
    const baseURL = new URL(
      `https://public-rest${CLS}.bullhornstaffing.com/rest-services/${CROP_TOKEN}/search/JobOrder`
    );

    baseURL.searchParams.set("query", "(isOpen:1)");
    baseURL.searchParams.set("fields", "*");
    baseURL.searchParams.set("count", "200");

    console.log({ baseURL: baseURL.toString() });

    const response = await fetch(baseURL.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as JobsResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
