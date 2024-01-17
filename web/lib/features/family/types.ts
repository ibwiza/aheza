export type IMutateNewFamily = {
  names: string;
};

export type INewFamilyResponse = {
  names: string;
  id: number;
  cid: string;
  message?: string;
};
