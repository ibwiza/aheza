import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(8),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RestPasswordSchema = z.object({
  email: z.string().email(),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8),
});
