import type { JobResponse } from "../../types/job";
const externalCategoryData: { [key: number]: string } = {
  1: "Corporate Accounting",
  2: "Public Accounting",
  3: "Finance",
  4: "Commercial Lines Account Manager",
  5: "Personal Lines Account Manager",
  6: "Employee Benefits Account Manager",
  7: "Underwriting",
  8: "Commercial Casualty Claims",
  9: "Complex/Specialty Claims",
  10: "Commercial Property Claims",
  11: "Personal Lines Claims",
  12: "Workers' Compensation Claims",
  13: "Corporate Legal",
  14: "Technology",
  15: "Risk Management",
  16: "Reinsurance",
  17: "Executive Search",
  18: "Other",
};
const BASE_URL = "https://prg-one.vercel.app";

document.addEventListener("DOMContentLoaded", async () => {
  const jobIdInput = document.querySelector<HTMLInputElement>(
    "[dev-target=job-id]"
  );
  const jobNameInput = document.querySelector<HTMLInputElement>(
    "[dev-target=job-name]"
  );
  const responseUserFirstNameInput = document.querySelector<HTMLInputElement>(
    "[dev-target=response-user-first-name]"
  );
  const responseUserLastNameInput = document.querySelector<HTMLInputElement>(
    "[dev-target=response-user-last-name]"
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
    !responseUserFirstNameInput ||
    !responseUserLastNameInput ||
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
        responseUserFirstNameInput,
        responseUserLastNameInput,
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
      window.location.href = "/404";
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
    responseUserFirstNameInput,
    responseUserLastNameInput,
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
    responseUserFirstNameInput: HTMLInputElement;
    responseUserLastNameInput: HTMLInputElement;
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
    responseUserFirstNameInput.value = job.data[0].responseUser.firstName;
    responseUserLastNameInput.value = job.data[0].responseUser.lastName;
    jobTitle.textContent = title;
    jobLastModified.textContent = formatTimestamp(job.data[0].dateLastModified);
    jobDescription.innerHTML = job.data[0].publicDescription;
    jobCustomText2.textContent = customText ?? "";
    jobState.textContent = state ? `${customText ? "/" : ""} ${state}` : "";
    jobWorkFromHome.innerText = job.data[0].onSite;
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
