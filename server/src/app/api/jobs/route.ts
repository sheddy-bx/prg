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
    baseURL.searchParams.set(
      "fields",
      "benefits,externalCategoryID,publicDescription,willSponsor,dateEnd,salary,address(address1,city,state,zip,countryID),title,dateAdded,isDeleted,dateLastPublished,isPublic,id,yearsRequired,customText2,bonusPackage,employmentType,travelRequirements,payRate,publishedZip,salaryUnit,willRelocate,responseUser(id,firstName,lastName),isOpen,publishedCategory(id,name),startDate,_score,isWorkFromHome"
    );
    // baseURL.searchParams.set("fields", "*");
    baseURL.searchParams.set("count", "200");
    baseURL.searchParams.set("sort", "-dateLastModified");

    console.log({ baseURL: baseURL.toString() });

    const response = await fetch(baseURL.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
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
