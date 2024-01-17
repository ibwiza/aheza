export type IMutateNewMember = {
  names: string;
  phone: string;
  email: string;
};

export type INewMemberResponse = {
  names: string;
  phone: string;
  email: string;
  message?: string;
};
