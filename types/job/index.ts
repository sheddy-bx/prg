export interface JobResponse {
  total: number;
  start: number;
  count: number;
  data: Datum[];
}

export interface Datum {
  id: number;
  title: string;
  customText2: string | null;
  employmentType: string;
  publicDescription: string;
  address: Address;
  onSite: string;
  dateLastModified: number;
  externalCategoryID: number | null;
  isWorkFromHome: boolean;
  responseUser: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface Address {
  address1: string;
  city: string;
  state: null;
  zip: string;
  countryID: number;
}
