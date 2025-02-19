import { NextResponse } from "next/server";
import { JobResponse } from "../../../../../../types/job";

// export const runtime = "edge";
export const dynamic = "force-static";

const CLS = 30;
const CROP_TOKEN = "V9NXD";
const REVALIDATE_SECONDS = 4 * 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const jobId = (await params).id;
    const baseURL = new URL(
      `https://public-rest${CLS}.bullhornstaffing.com/rest-services/${CROP_TOKEN}/search/JobOrder`
    );
    baseURL.searchParams.set(
      "fields",
      "benefits,externalCategoryID,publicDescription,willSponsor,dateEnd,salary,address(address1,city,state,zip,countryID),title,dateAdded,isDeleted,dateLastPublished,isPublic,id,yearsRequired,customText2,bonusPackage,employmentType,travelRequirements,payRate,publishedZip,salaryUnit,willRelocate,responseUser(id,firstName,lastName),isOpen,publishedCategory(id,name),startDate,_score,isWorkFromHome,dateLastModified"
    );
    // baseURL.searchParams.set("fields", "isWorkFromHome");
    baseURL.searchParams.set("query", `(id:${jobId})`);

    console.log({ baseURL: baseURL.toString() });

    const response = await fetch(baseURL.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jobData = (await response.json()) as JobResponse;

    return NextResponse.json(jobData);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job details" },
      { status: 500 }
    );
  }
}
