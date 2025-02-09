import { NextResponse } from "next/server";
import { JobsResponse } from "../../../../../types/jobs";

// export const runtime = "edge";
export const dynamic = "force-static";

const CLS = 30;
const CROP_TOKEN = "V9NXD";
const REVALIDATE_SECONDS = 3600;

export async function GET() {
  try {
    const baseURL = new URL(
      `https://public-rest${CLS}.bullhornstaffing.com/rest-services/${CROP_TOKEN}/search/JobOrder`
    );

    baseURL.searchParams.set("query", "(isOpen:1)");
    baseURL.searchParams.set("fields", "publishedCategory(name)");
    baseURL.searchParams.set("count", "200");

    const response = await fetch(baseURL.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const jobsData: JobsResponse = await response.json();

    // Extract unique categories
    const categories = jobsData.data
      .map((job) => job.publishedCategory.name)
      .filter((category) => category !== null)
      .filter((category, index, self) => self.indexOf(category) === index)
      .sort();

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
