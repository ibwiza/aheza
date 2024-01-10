export type IMutateSignIn = {
  email: string;
  password: string;
};

export type ISignInResponse = {
  message: string;
  statusCode: number;
  accessToken: string;
};
