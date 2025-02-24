import type { JobsResponse } from "../../types/jobs";
const BASE_URL = "https://prg-one.vercel.app";
document.addEventListener("DOMContentLoaded", async () => {
  const sliderWrap = document.querySelector<HTMLDivElement>(
    `[dev-target=slide-wrap]`
  );

  if (!sliderWrap) {
    return console.error("Missing element sliderWrap");
  }

  try {
    const jobs = await getAllJobs();
    console.log({ jobs });
    initSlider({ jobs, sliderWrap, limit: 10 });
  } catch (error) {
    console.error("Something went wrong", error);
  }

  function initSlider({
    jobs,
    sliderWrap,
    limit,
  }: {
    jobs: JobsResponse;
    sliderWrap: HTMLDivElement;
    limit: number;
  }) {
    const slideTemplate = sliderWrap.querySelector<HTMLLinkElement>(
      `[dev-target=slide-link]`
    );
    sliderWrap.innerHTML = "";

    if (!slideTemplate) {
      return console.error("Missing element slideTemplate");
    }

    jobs.data.slice(0, limit).forEach((job) => {
      const slide = slideTemplate.cloneNode(true) as HTMLLinkElement;
      slide.href = `/internal-jobs-final?id=${job.id}`;
      const titleDiv = slide.querySelector(`[dev-target=title]`);
      const customTextDiv = slide.querySelector(`[dev-target=custom-text-2]`);
      const stateDiv = slide.querySelector(`[dev-target=state]`);

      if (!titleDiv || !customTextDiv || !stateDiv) {
        return console.error("Missing element in slide");
      }
      titleDiv.textContent = job.title;
      customTextDiv.textContent = job.customText2 ?? "";
      stateDiv.textContent = `${job.address.city ?? ""}${
        job.address.state ? " / " + job.address.state : ""
      }`;
      sliderWrap.appendChild(slide);
    });
  }

  async function getAllJobs() {
    try {
      const response = await fetch(`${BASE_URL}/api/jobs`);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const jobs: JobsResponse = await response.json();
      return jobs;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  }
});
