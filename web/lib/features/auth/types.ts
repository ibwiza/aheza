export type IMutateSignIn = {
  email: string;
  password: string;
};

export type ISignInResponse = {
  message: string;
  statusCode: number;
  accessToken: string;
};


export type IMutateSignUp = {
  email: string;
  password: string;
};

export type ISignUpResponse = {
  message: string;
  statusCode: number;
};

