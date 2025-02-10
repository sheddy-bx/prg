import type { JobsResponse } from "../../types/jobs";
const BASE_URL = "https://prg-one.vercel.app";
document.addEventListener("DOMContentLoaded", async () => {
  const jobSearchInput = document.querySelector<HTMLInputElement>(
    `[dev-target=job-search]`
  );
  const jobFilterWrappers =
    document.querySelectorAll<HTMLDivElement>(`[dev-target-filters]`);
  const jobItemTemplate = document.querySelector<HTMLDivElement>(
    `[dev-target=job-item-template]`
  );
  const jobLoader = document.querySelector<HTMLDivElement>(
    `[dev-target=job-loader]`
  );
  const jobsReset = document.querySelector<HTMLDivElement>(
    `[dev-target=jobs-reset]`
  );
  const jobsWrapper = document.querySelector<HTMLDivElement>(
    `[dev-target=jobs-wrapper]`
  );
  const jobList = document.querySelector<HTMLDivElement>(
    `[dev-target=job-list]`
  );
  let currentState = "";
  let currentCategory = "";
  let jobSearch = "";
  let globalJobs: JobsResponse | null = null;

  if (
    !jobSearchInput ||
    !jobFilterWrappers ||
    !jobItemTemplate ||
    !jobLoader ||
    !jobsWrapper ||
    !jobsReset ||
    !jobList
  ) {
    return console.error("Missing elements");
  }

  try {
    const jobs = await getAllJobs();
    console.log({ jobs });
    globalJobs = jobs;
    jobsInit({ jobs, jobList, jobLoader, jobItemTemplate, jobsWrapper });
    searchInputInit({
      jobSearchInput,
      jobItemTemplate,
      jobList,
      jobLoader,
      jobsWrapper,
    });
    filtersInit({
      jobFilterWrappers,
      jobItemTemplate,
      jobList,
      jobLoader,
      jobsWrapper,
    });
    jobsReset.addEventListener("click", () => {
      resetFilters({
        jobList,
        jobLoader,
        jobItemTemplate,
        jobsWrapper,
        jobSearchInput,
        jobFilterWrappers,
      });
    });
    document.addEventListener("click", (e) => {
      if (
        e.target instanceof Element &&
        !e.target.closest("[dev-target-filters]")
      ) {
        jobFilterWrappers.forEach((filterWrapper) => {
          const filterDropdownWrapper =
            filterWrapper.querySelector<HTMLDivElement>(
              `[dev-target=dd-wrapper]`
            );
          if (filterDropdownWrapper) {
            filterDropdownWrapper.setAttribute("dev-hide", "true");
          }
        });
      }
    });
  } catch (error) {
    console.error("Something went wrong", error);
  }

  function resetFilters({
    jobList,
    jobLoader,
    jobItemTemplate,
    jobsWrapper,
    jobSearchInput,
    jobFilterWrappers,
  }: {
    jobList: HTMLDivElement;
    jobLoader: HTMLDivElement;
    jobsWrapper: HTMLDivElement;
    jobItemTemplate: HTMLDivElement;
    jobSearchInput: HTMLInputElement;
    jobFilterWrappers: NodeListOf<HTMLDivElement>;
  }) {
    currentState = "";
    currentCategory = "";
    jobSearch = "";
    jobSearchInput.value = "";
    jobFilterWrappers.forEach((filterWrapper) => {
      const filterDropdownInput = filterWrapper.querySelector<HTMLDivElement>(
        `[dev-target=dd-input]`
      );
      if (!filterDropdownInput) {
        return console.error("Missing filter dropdown elements");
      }
      filterDropdownInput.textContent = "Select one...";
    });
    if (globalJobs) {
      const filteredJob = filterJobs({
        category: currentCategory,
        jobs: globalJobs,
        search: jobSearch,
        state: currentState,
      });
      jobsInit({
        jobs: filteredJob,
        jobList,
        jobLoader,
        jobItemTemplate,
        jobsWrapper,
      });
    }
  }

  function searchInputInit({
    jobSearchInput,
    jobItemTemplate,
    jobList,
    jobLoader,
    jobsWrapper,
  }: {
    jobSearchInput: HTMLInputElement;
    jobItemTemplate: HTMLDivElement;
    jobList: HTMLDivElement;
    jobLoader: HTMLDivElement;
    jobsWrapper: HTMLDivElement;
  }) {
    jobSearchInput.addEventListener("input", (event) => {
      const searchInput = event.target as HTMLInputElement;
      jobSearch = searchInput.value;
      if (globalJobs) {
        const filteredJob = filterJobs({
          category: currentCategory,
          jobs: globalJobs,
          search: jobSearch,
          state: currentState,
        });
        jobsInit({
          jobs: filteredJob,
          jobList,
          jobLoader,
          jobItemTemplate,
          jobsWrapper,
        });
      }
    });
  }

  function filterJobs({
    category,
    jobs,
    search,
    state,
  }: {
    jobs: JobsResponse;
    search: string;
    state: string;
    category: string;
  }): JobsResponse {
    return {
      ...jobs,
      data: jobs.data.filter((job) => {
        const matchesSearch =
          search === "" ||
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.address.state?.toLowerCase().includes(search.toLowerCase()) ||
          job.address.city?.toLowerCase().includes(search.toLowerCase()) ||
          job.customText2?.toLowerCase().includes(search.toLowerCase());

        const matchesState =
          state === "" ||
          job.address.state?.toLowerCase() === state.toLowerCase();

        const matchesCategory =
          category === "" ||
          job.publishedCategory.name.toLowerCase() === category.toLowerCase();

        return matchesSearch && matchesState && matchesCategory;
      }),
    };
  }

  function filtersInit({
    jobFilterWrappers,
    jobItemTemplate,
    jobList,
    jobLoader,
    jobsWrapper,
  }: {
    jobFilterWrappers: NodeListOf<HTMLDivElement>;
    jobList: HTMLDivElement;
    jobLoader: HTMLDivElement;
    jobItemTemplate: HTMLDivElement;
    jobsWrapper: HTMLDivElement;
  }) {
    jobFilterWrappers.forEach(async (filterWrapper) => {
      const filterType = filterWrapper.getAttribute("dev-target-filters");
      const filterDropdownInput = filterWrapper.querySelector<HTMLDivElement>(
        `[dev-target=dd-input]`
      );
      const filterDropdownWrapper = filterWrapper.querySelector<HTMLDivElement>(
        `[dev-target=dd-wrapper]`
      );

      if (!filterDropdownWrapper || !filterDropdownInput) {
        return console.error("Missing filter dropdown elements");
      }
      if (!filterType) {
        return console.error("Missing filter type");
      }

      if (filterType === "state") {
        const states = await getJobStates();
        filterInit({
          filterDropdownInput,
          filterDropdownWrapper,
          filterList: states,
          filterType,
          jobItemTemplate,
          jobList,
          jobLoader,
          jobsWrapper,
        });
      } else if (filterType === "category") {
        const categories = await getJobCategories();
        filterInit({
          filterDropdownInput,
          filterDropdownWrapper,
          filterList: categories,
          filterType,
          jobItemTemplate,
          jobList,
          jobLoader,
          jobsWrapper,
        });
      }
    });
  }

  function filterInit({
    filterDropdownInput,
    filterDropdownWrapper,
    filterList,
    filterType,
    jobList,
    jobLoader,
    jobItemTemplate,
    jobsWrapper,
  }: {
    filterDropdownInput: HTMLDivElement;
    filterDropdownWrapper: HTMLDivElement;
    filterList: string[];
    filterType: string;
    jobList: HTMLDivElement;
    jobLoader: HTMLDivElement;
    jobItemTemplate: HTMLDivElement;
    jobsWrapper: HTMLDivElement;
  }) {
    const allFilterDropdownWrapper = document.querySelectorAll<HTMLDivElement>(
      `[dev-target=dd-wrapper]`
    );
    const filterDropdownContainer =
      filterDropdownWrapper.querySelector<HTMLDivElement>(
        `[dev-target=dd-container]`
      );
    const filterDropdownItemTemplate =
      filterDropdownWrapper.querySelector<HTMLDivElement>(
        `[dev-target=dd-item-template]`
      );
    if (!filterDropdownContainer || !filterDropdownItemTemplate) {
      return console.error("Missing filter dropdown elements");
    }
    filterDropdownContainer.innerHTML = "";
    console.log({ filterDropdownInput });
    filterDropdownInput.addEventListener("click", () => {
      console.log("click");
      allFilterDropdownWrapper.forEach((filterWrapper) => {
        if (filterWrapper !== filterDropdownWrapper) {
          filterWrapper.setAttribute("dev-hide", "true");
        }
      });
      if (filterDropdownWrapper.getAttribute("dev-hide") === "true") {
        filterDropdownWrapper.setAttribute("dev-hide", "false");
      } else {
        filterDropdownWrapper.setAttribute("dev-hide", "true");
      }
    });
    const filterEmptyDropdownItem = filterDropdownItemTemplate.cloneNode(
      true
    ) as HTMLDivElement;
    filterEmptyDropdownItem.textContent = "Select one...";
    filterEmptyDropdownItem.addEventListener("click", () => {
      filterDropdownInput.textContent = "Select one...";
      if (filterType === "state") {
        currentState = "";
      } else if (filterType === "category") {
        currentCategory = "";
      }
      filterDropdownWrapper.setAttribute("dev-hide", "true");
      if (globalJobs) {
        const filteredJob = filterJobs({
          category: currentCategory,
          jobs: globalJobs,
          search: jobSearch,
          state: currentState,
        });
        jobsInit({
          jobs: filteredJob,
          jobList,
          jobLoader,
          jobItemTemplate,
          jobsWrapper,
        });
      }
    });
    filterDropdownContainer.appendChild(filterEmptyDropdownItem);

    filterList.filter(Boolean).forEach((filter) => {
      const filterDropdownItem = filterDropdownItemTemplate.cloneNode(
        true
      ) as HTMLDivElement;
      filterDropdownItem.textContent = filter;

      filterDropdownItem.addEventListener("click", () => {
        filterDropdownInput.textContent = filter;
        if (filterType === "state") {
          currentState = filter;
        } else if (filterType === "category") {
          currentCategory = filter;
        }
        filterDropdownWrapper.setAttribute("dev-hide", "true");
        if (globalJobs) {
          const filteredJob = filterJobs({
            category: currentCategory,
            jobs: globalJobs,
            search: jobSearch,
            state: currentState,
          });
          jobsInit({
            jobs: filteredJob,
            jobList,
            jobLoader,
            jobItemTemplate,
            jobsWrapper,
          });
        }
      });
      filterDropdownContainer.appendChild(filterDropdownItem);
    });
  }

  function jobsInit({
    jobs,
    jobList,
    jobLoader,
    jobItemTemplate,
    jobsWrapper,
  }: {
    jobs: JobsResponse;
    jobList: HTMLDivElement;
    jobLoader: HTMLDivElement;
    jobItemTemplate: HTMLDivElement;
    jobsWrapper: HTMLDivElement;
  }) {
    jobList.innerHTML = "";
    jobs.data.forEach((job) => {
      const jobItem = jobItemTemplate.cloneNode(true) as HTMLDivElement;
      const jobLink = jobItem.querySelector<HTMLAnchorElement>(
        `[dev-target=item-link]`
      );
      const jobTitle = jobItem.querySelector<HTMLDivElement>(
        `[dev-target=item-title]`
      );
      const jobLocation = jobItem.querySelector<HTMLDivElement>(
        `[dev-target=location]`
      );

      if (!jobLink || !jobTitle || !jobLocation) {
        return console.error("Missing job item elements");
      }
      jobLink.href = `/internal-jobs-final?id=${job.id}`;
      jobTitle.textContent = job.title;
      jobLocation.textContent = `${job.address.city ?? ""}${
        job.address.state ? "/" + job.address.state : ""
      }`;

      jobList.appendChild(jobItem);
    });
    toggleHideElement({ element: jobLoader, toggle: "hide" });
    toggleHideElement({ element: jobsWrapper, toggle: "show" });
  }

  function toggleHideElement({
    element,
    toggle,
  }: {
    element: HTMLElement;
    toggle: "show" | "hide";
  }) {
    if (toggle === "show") {
      element.setAttribute("dev-hide", "false");
    } else {
      element.setAttribute("dev-hide", "true");
    }
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

  async function getJobStates() {
    try {
      const response = await fetch(`${BASE_URL}/api/states`);
      if (!response.ok) {
        throw new Error("Failed to fetch job states");
      }
      const states: string[] = await response.json();
      return states;
    } catch (error) {
      console.error("Error fetching job states:", error);
      throw error;
    }
  }

  async function getJobCategories() {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch job categories");
      }
      const categories: string[] = await response.json();
      return categories;
    } catch (error) {
      console.error("Error fetching job categories:", error);
      throw error;
    }
  }
});
