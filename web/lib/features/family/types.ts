export type IMutateNewFamily = {
  names: string;
  code: string;
  dob: Date;
};

export type INewFamilyResponse = {
  names: string;
  id: number;
  code: string;
  message?: string;
};
