export type IMutateNewMember = {
  names: string;
  phone: string;
  email: string;
  code: string;
  dob: Date;
  joinDate: Date;
};

export type INewMemberResponse = {
  names: string;
  phone: string;
  email: string;
  message?: string;
};
