export interface JobsResponse {
  total: number;
  start: number;
  count: number;
  data: Datum[];
}

export interface Datum {
  customText2: null | string;
  employmentType: string;
  publicDescription: string;
  address: Address;
  title: string;
  dateLastModified: number;
  externalCategoryID: number | null;
  publishedCategory: PublishedCategory;
  id: number;
}

export interface Address {
  city: string | null;
  state: null | string;
}

export interface PublishedCategory {
  id: number;
  name: string;
}
