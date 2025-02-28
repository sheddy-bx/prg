export interface JobsResponse {
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
  city: string | null;
  state: null | string;
}
