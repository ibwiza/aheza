export type IMutateNewContribution = {
  year: number;
  amount: number;
};

export type IMutateYearContribution = {
  year: number;
  memberId: string;
};

export type INewContributionResponse = {
  id: string;
};
