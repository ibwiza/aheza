import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Logo from "@/components/layout/marketing/logo";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { NewPasswordForm } from "@/components/auth/new-password-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default function NewPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-10 w-10">
            <Logo />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your New password
          </p>
        </div>
        <NewPasswordForm />
      </div>
    </div>
  );
}
