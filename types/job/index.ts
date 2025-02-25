export interface JobResponse {
  total: number;
  start: number;
  count: number;
  data: Datum[];
}

export interface Datum {
  externalCategoryID: null | number;
  publicDescription: string;
  address: Address;
  title: string;
  dateLastModified: number;
  id: number;
  customText2: null | string;
  employmentType: string;
  isWorkFromHome: boolean;
}

export interface Address {
  address1: string;
  city: string;
  state: null;
  zip: string;
  countryID: number;
}
