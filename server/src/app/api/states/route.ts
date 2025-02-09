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
    baseURL.searchParams.set("fields", "address(state)");
    baseURL.searchParams.set("count", "200");

    const response = await fetch(baseURL.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const jobsData: JobsResponse = await response.json();

    // Extract unique states, filter out null values
    const states = jobsData.data
      .map((job) => job.address.state)
      .filter((state): state is string => state !== null)
      .filter((state, index, self) => self.indexOf(state) === index)
      .sort();

    return NextResponse.json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    return NextResponse.json(
      { error: "Failed to fetch states" },
      { status: 500 }
    );
  }
}
