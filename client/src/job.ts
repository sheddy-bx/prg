import type { JobResponse } from "../../types/job";
const BASE_URL = "https://prg-one.vercel.app";
const externalCategoryData: { [key: number]: string } = {
  2101: "Accounting / Human Resources: Accountant - General",
  2102: "Accounting / Human Resources: Accountant - Financial",
  2103: "Accounting / Human Resources: Accountant - Tax",
  2104: "Accounting / Human Resources: Accounts Receivable",
  2105: "Accounting / Human Resources: Accounts Payable",
  2106: "Accounting / Human Resources: Analyst",
  2107: "Accounting / Human Resources: Auditor",
  2108: "Accounting / Human Resources: Billing",
  2109: "Accounting / Human Resources: Bookkeeper",
  2110: "Accounting / Human Resources: Consultant",
  2111: "Accounting / Human Resources: Controller",
  2112: "Accounting / Human Resources: HR Manager",
  2113: "Accounting / Human Resources: HR Recruiter",
  2114: "Accounting / Human Resources: HR Technical Recruiter",
  2115: "Accounting / Human Resources: Payroll / Benefits",
  2201: "Administrative / Clerical: Administrative Assistant",
  2202: "Administrative / Clerical: Buyer / Purchasing",
  2203: "Administrative / Clerical: Customer Service",
  2204: "Administrative / Clerical: Legal Assistant",
  2205: "Administrative / Clerical: Receptionist",
  2206: "Administrative / Clerical: Secretarial",
  2301: "Banking / Finance / Insurance: Actuary",
  2302: "Banking / Finance / Insurance: Bank Operations",
  2303: "Banking / Finance / Insurance: Bank Teller",
  2304: "Banking / Finance / Insurance: Banking Sales",
  2305: "Banking / Finance / Insurance: Claims / Adjuster",
  2306: "Banking / Finance / Insurance: Financial Analyst",
  2307: "Banking / Finance / Insurance: Financial Sales",
  2308: "Banking / Finance / Insurance: Insurance Sales",
  2309: "Banking / Finance / Insurance: Insurance Operations",
  2310: "Banking / Finance / Insurance: Investments",
  2311: "Banking / Finance / Insurance: Loan / Mortgage",
  2312: "Banking / Finance / Insurance: Stock Broker / Securities Trader",
  2313: "Banking / Finance / Insurance: Underwriting",
  2401: "Engineering: Aerospace",
  2402: "Engineering: Agriculture",
  2403: "Engineering: Bio-Medical",
  2404: "Engineering: Chemical",
  2405: "Engineering: Civil",
  2406: "Engineering: Electrical",
  2407: "Engineering: Electronic",
  2408: "Engineering: Engineering Consulting",
  2409: "Engineering: Engineering Management",
  2410: "Engineering: Environmental",
  2411: "Engineering: Industrial",
  2412: "Engineering: Manufacturing",
  2413: "Engineering: Marine",
  2414: "Engineering: Mechanical",
  2415: "Engineering: Metallurgical / Materials",
  2416: "Engineering: Mining",
  2417: "Engineering: Nuclear",
  2418: "Engineering: Optical",
  2419: "Engineering: Packaging",
  2420: "Engineering: Petroleum",
  2421: "Engineering: Process",
  2422: "Engineering: Project",
  2423: "Engineering: Quality",
  2424: "Engineering: Structural",
  2501: "General / Other: Assembly / Production",
  2502: "General / Other: Construction Worker",
  2503: "General / Other: Day Laborer",
  2504: "General / Other: Driver",
  2505: "General / Other: Electrician",
  2506: "General / Other: Entertainment / Gaming",
  2507: "General / Other: Groundskeeping",
  2508: "General / Other: Hotel Staff",
  2509: "General / Other: Law Enforcement",
  2510: "General / Other: Mechanic",
  2511: "General / Other: Protective / Security",
  2512: "General / Other: Restaurant Staff",
  2513: "General / Other: Repair / Technician",
  2514: "General / Other: Skilled Trades",
  2515: "General / Other: Training / Development",
  2516: "General / Other: Travel",
  2517: "General / Other: Warehouse",
  2518: "General / Other: Writer / Editor",
  2601: "Health Care: Administration",
  2602: "Health Care: Billing / Collections",
  2603: "Health Care: CNT",
  2604: "Health Care: Dental Assistant",
  2605: "Health Care: Dentist",
  2606: "Health Care: Dietary / Nutrition",
  2607: "Health Care: Executive",
  2608: "Health Care: Home Healthcare",
  2609: "Health Care: Laboratory",
  2610: "Health Care: Medical Technician",
  2611: "Health Care: Medical Records",
  2612: "Health Care: Mental Health",
  2613: "Health Care: Nursing",
  2614: "Health Care: Optician",
  2615: "Health Care: Patient Care / Management",
  2616: "Health Care: Pharmacist",
  2617: "Health Care: Physician",
  2618: "Health Care: Radiation Technologist",
  2619: "Health Care: Therapist",
  2701: "Information Systems: Business Analyst",
  2702: "Information Systems: CAD / AutoCAD",
  2703: "Information Systems: Consulting",
  2704: "Information Systems: Database Administrator",
  2705: "Information Systems: Database Developer",
  2706: "Information Systems: Graphics / Multimedia",
  2707: "Information Systems: Hardware Engineer",
  2708: "Information Systems: Hardware Technician",
  2709: "Information Systems: Help Desk / Technical Support",
  2710: "Information Systems: Management",
  2711: "Information Systems: Network Administrator",
  2712: "Information Systems: Project Manager",
  2713: "Information Systems: Quality Assurance",
  2714: "Information Systems: Security",
  2715: "Information Systems: Software Engineer",
  2716: "Information Systems: Systems Administrator",
  2717: "Information Systems: Systems Analyst",
  2718: "Information Systems: Technical Writer",
  2719: "Information Systems: Trainer",
  2720: "Information Systems: Web Developer",
  2801: "Management: Administration",
  2802: "Management: Construction",
  2803: "Management: Consultant",
  2804: "Management: Finance",
  2805: "Management: Hotel / Restaurant",
  2806: "Management: Laboratory",
  2807: "Management: Maintenance / Facilities",
  2808: "Management: Manufacturing / Plant",
  2809: "Management: Marketing",
  2810: "Management: Non-Profit",
  2811: "Management: Purchasing",
  2812: "Management: R & D",
  2813: "Management: Retail / Store",
  2814: "Management: Sales",
  2815: "Management: Service",
  2816: "Management: Supply / Material",
  2817: "Management: Transportation",
  2818: "Management: Utilities",
  2901: "Senior Management: President / CEO",
  2902: "Senior Management: University Administration / Management",
  2903: "Senior Management: VP - Administration",
  2904: "Senior Management: VP - Chief Operation Officer / COO",
  2905: "Senior Management: VP - Distribution",
  2906: "Senior Management: VP - Engineering / Development",
  2907: "Senior Management: VP - Finance / CFO",
  2908: "Senior Management: VP - Human Resources",
  2909: "Senior Management: VP - Information Systems / CIO",
  2910: "Senior Management: VP - Manufacturing",
  2911: "Senior Management: VP - Marketing / Sales",
  2912: "Senior Management: VP - Operations",
  3001: "Professional: Architect",
  3002: "Professional: Biologist",
  3003: "Professional: Chemist",
  3004: "Professional: Clergy",
  3005: "Professional: Counselor",
  3006: "Professional: Economist",
  3007: "Professional: Geologist",
  3008: "Professional: Hydrologist",
  3009: "Professional: Legal - Attorney",
  3010: "Professional: Legal - Paralegal",
  3011: "Professional: Librarian",
  3012: "Professional: Physicist",
  3013: "Professional: Psychologist",
  3014: "Professional: Safety",
  3015: "Professional: Scientist",
  3016: "Professional: Social Worker",
  3017: "Professional: Teacher",
  3018: "Professional: Veterinarian",
  3101: "Sales & Marketing: Advertising",
  3102: "Sales & Marketing: Brand / Product Management",
  3103: "Sales & Marketing: Marketing Analyst",
  3104: "Sales & Marketing: Marketing Research",
  3105: "Sales & Marketing: Media Planner / Buyer",
  3106: "Sales & Marketing: Public Relations",
  3107: "Sales & Marketing: Real Estate",
  3108: "Sales & Marketing: Retail",
  3109: "Sales & Marketing: Sales - Inside",
  3110: "Sales & Marketing: Sales - Medical",
  3111: "Sales & Marketing: Sales - Outside",
  3112: "Sales & Marketing: Sales - Pharmaceutical",
  3113: "Sales & Marketing: Sales - Securities",
  3114: "Sales & Marketing: Sales - Technical",
  3115: "Sales & Marketing: Sales - Telemarketing",
  3201: "Telecommunications: CLEC / ILEC / IXC",
  3202: "Telecommunications: Cable",
  3203: "Telecommunications: Consulting",
  3204: "Telecommunications: Cellular / PCS / Paging",
  3205: "Telecommunications: Data Networking",
  3206: "Telecommunications: Fiber Optics",
  3207: "Telecommunications: Hardware",
  3208: "Telecommunications: IP Telephony",
  3209: "Telecommunications: ISP",
  3210: "Telecommunications: Integrator",
  3211: "Telecommunications: Inter-Connect (CPE)",
  3212: "Telecommunications: RBOC",
  3213: "Telecommunications: Sales",
  3214: "Telecommunications: Satellite",
  3215: "Telecommunications: Software",
  3216: "Telecommunications: Web Hosting",
};

document.addEventListener("DOMContentLoaded", async () => {
  const jobIdInput = document.querySelector<HTMLInputElement>(
    "[dev-target=job-id]"
  );
  const jobNameInput = document.querySelector<HTMLInputElement>(
    "[dev-target=job-name]"
  );
  const jobTitle = document.querySelector<HTMLDivElement>("[dev-target=title]");
  const jobLastModified = document.querySelector<HTMLDivElement>(
    "[dev-target=last-modified]"
  );
  const jobDescription = document.querySelector<HTMLDivElement>(
    "[dev-target=description]"
  );
  const jobCustomText2 = document.querySelector<HTMLDivElement>(
    "[dev-target=custom-text-2]"
  );
  const jobState = document.querySelector<HTMLDivElement>("[dev-target=state]");
  const jobWorkFromHome = document.querySelector<HTMLDivElement>(
    "[dev-target=isWorkFromHome]"
  );
  const jobEmploymentType = document.querySelector<HTMLDivElement>(
    "[dev-target=employmentType]"
  );
  const jobExternalCategoryID = document.querySelector<HTMLDivElement>(
    "[dev-target=externalCategoryID]"
  );
  const jobLoader = document.querySelector<HTMLDivElement>(
    `[dev-target=job-loader]`
  );
  const jobContentWrap = document.querySelector<HTMLDivElement>(
    `[dev-target=content-wrap]`
  );
  const jobSlugId = new URLSearchParams(window.location.search).get("id");

  if (
    !jobIdInput ||
    !jobNameInput ||
    !jobTitle ||
    !jobDescription ||
    !jobCustomText2 ||
    !jobState ||
    !jobWorkFromHome ||
    !jobEmploymentType ||
    !jobLoader ||
    !jobContentWrap ||
    !jobLastModified ||
    !jobExternalCategoryID
  ) {
    return console.error("Missing element");
  }
  if (!jobSlugId) {
    return console.error("Missing id");
  }

  try {
    const job = await getJob(Number(jobSlugId));
    if (job.count === 1) {
      initPage({
        job,
        jobCustomText2,
        jobDescription,
        jobEmploymentType,
        jobExternalCategoryID,
        jobIdInput,
        jobNameInput,
        jobState,
        jobTitle,
        jobLastModified,
        jobWorkFromHome,
        jobLoader,
        jobContentWrap,
      });
      console.log({ job });
    } else {
      console.log("no job", job);
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }

  function initPage({
    job,
    jobCustomText2,
    jobDescription,
    jobEmploymentType,
    jobExternalCategoryID,
    jobIdInput,
    jobNameInput,
    jobState,
    jobTitle,
    jobLastModified,
    jobWorkFromHome,
    jobLoader,
    jobContentWrap,
  }: {
    job: JobResponse;
    jobIdInput: HTMLInputElement;
    jobNameInput: HTMLInputElement;
    jobTitle: HTMLDivElement;
    jobLastModified: HTMLDivElement;
    jobDescription: HTMLDivElement;
    jobCustomText2: HTMLDivElement;
    jobState: HTMLDivElement;
    jobWorkFromHome: HTMLDivElement;
    jobEmploymentType: HTMLDivElement;
    jobExternalCategoryID: HTMLDivElement;
    jobLoader: HTMLDivElement;
    jobContentWrap: HTMLDivElement;
  }) {
    const category = getDisplayValueById(job.data[0].externalCategoryID);
    const title = job.data[0].title;
    const customText = job.data[0].customText2;
    const state = job.data[0].address.state;
    const employmentType = job.data[0].employmentType;
    if (!state && !customText)
      jobCustomText2.parentElement?.parentElement?.setAttribute(
        "dev-hide",
        "true"
      );
    if (!category)
      jobExternalCategoryID.parentElement?.setAttribute("dev-hide", "true");
    jobIdInput.value = job.data[0].id.toString();
    jobNameInput.value = title;
    jobTitle.textContent = title;
    jobLastModified.textContent = formatTimestamp(
      job.data[0].dateLastPublished
    );
    jobDescription.innerHTML = job.data[0].publicDescription;
    jobCustomText2.textContent = customText ?? "";
    jobState.textContent = state ? `${customText ? "/" : ""} ${state}` : "";
    jobWorkFromHome.innerText = job.data[0].isWorkFromHome
      ? "Remote"
      : "Onsite";
    jobEmploymentType.textContent = employmentType;
    jobExternalCategoryID.innerText = category ?? "";
    jobLoader.setAttribute("dev-hide", "true");
    jobContentWrap.setAttribute("dev-hide", "false");
  }

  function formatTimestamp(timestamp: string | number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  async function getJob(id: number) {
    try {
      const response = await fetch(`${BASE_URL}/api/jobs/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch job");
      }
      const job: JobResponse = await response.json();
      return job;
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  }
  function getDisplayValueById(id: number | null): string | null {
    return id ? externalCategoryData[id] : null;
  }
});
