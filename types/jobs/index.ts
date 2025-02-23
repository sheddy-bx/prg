export interface JobsResponse {
  total: number;
  start: number;
  count: number;
  data: Datum[];
}

export interface Datum {
  benefits: null;
  bonusPackage: null;
  customText2: null | string;
  employmentType: string;
  travelRequirements: null;
  payRate: number;
  publicDescription: string;
  willSponsor: boolean;
  dateEnd: null;
  publishedZip: null;
  salary: number;
  address: Address;
  title: string;
  dateAdded: number;
  dateLastModified: number;
  externalCategoryID: number | null;
  salaryUnit: string;
  willRelocate: boolean;
  responseUser: ResponseUser;
  isOpen: boolean;
  isDeleted: boolean;
  dateLastPublished: number;
  publishedCategory: PublishedCategory;
  isPublic: number;
  id: number;
  yearsRequired: number;
  startDate: number;
  _score: number;
}

export interface Address {
  address1: null | string;
  city: string | null;
  state: null | string;
  zip: null | string;
  countryID: number;
}

export interface PublishedCategory {
  id: number;
  name: string;
}

export interface ResponseUser {
  id: number;
  firstName: string;
  lastName: string;
}
