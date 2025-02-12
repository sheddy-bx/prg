import type { JobResponse } from "../../types/job";
const BASE_URL = "https://prg-one.vercel.app";

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
    jobIdInput.value = job.data[0].id.toString();
    jobNameInput.value = job.data[0].title;
    jobTitle.textContent = job.data[0].title;
    jobLastModified.textContent = formatTimestamp(
      job.data[0].dateLastPublished
    );
    jobDescription.innerHTML = job.data[0].publicDescription;
    jobCustomText2.textContent = job.data[0].customText2 ?? "";
    jobState.textContent = job.data[0].address.state ?? "";
    console.log({ jobWorkFromHome });
    // jobWorkFromHome.innerText = job.data[0].isWorkFromHome ? "Yes" : "No";
    jobEmploymentType.textContent = job.data[0].employmentType;
    jobExternalCategoryID.innerText = job.data[0].publishedCategory.name ?? "";
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
});
