export interface JobResponse {
  total: number;
  start: number;
  count: number;
  data: Datum[];
}

export interface Datum {
  benefits: null;
  externalCategoryID: null;
  publicDescription: string;
  willSponsor: boolean;
  dateEnd: null;
  salary: number;
  address: Address;
  title: string;
  dateAdded: number;
  isDeleted: boolean;
  dateLastPublished: number;
  isPublic: number;
  id: number;
  yearsRequired: number;
  customText2: null;
  bonusPackage: null;
  employmentType: string;
  travelRequirements: null;
  payRate: number;
  publishedZip: null;
  salaryUnit: string;
  willRelocate: boolean;
  responseUser: ResponseUser;
  isOpen: boolean;
  publishedCategory: PublishedCategory;
  startDate: number;
  _score: number;
}

export interface Address {
  address1: string;
  city: string;
  state: null;
  zip: string;
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
