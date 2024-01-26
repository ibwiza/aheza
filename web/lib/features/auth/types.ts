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

export type IMutateResetPassword = {
  email: string;
};

export type IResetPasswordResponse = {
  message: string;
  statusCode: number;
};

export type IMutateNewPassword = {
  password: string;
};

export type INewPasswordResponse = {
  message: string;
  statusCode: number;
};
