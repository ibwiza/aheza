"use client";

import * as React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { NewPasswordSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { IResetPasswordResponse } from "@/lib/features/auth/types";
import { resetPassword } from "@/lib/features/auth/reset-password";
import { newPassword } from "@/lib/features/auth/new-password";

interface UserSignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof NewPasswordSchema>;

export function NewPasswordForm({ className, ...props }: UserSignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(NewPasswordSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response: IResetPasswordResponse = await newPassword(data, token);

    if (response.statusCode !== 200) {
      setIsLoading(false);
      return toast({
        title: "Something went wrong.",
        description: `${response.message}. Please try again.`,
        variant: "destructive",
      });
    }

    await router.push("/sign-in");
    setIsLoading(false);

    return toast({
      title: `${response.message}`,
      description: "Sign In and start using application.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="New password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset password
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
