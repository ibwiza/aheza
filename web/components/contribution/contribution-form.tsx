"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { contributionSchema } from "@/lib/validations/contribution";
import { newContribution } from "@/lib/features/contribution/new-contribution";
import { INewContributionResponse } from "@/lib/features/contribution/types";

interface ContributionFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof contributionSchema>;

export function ContributionForm({
  className,
  ...props
}: ContributionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contributionSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const params = useParams<{ tag: string; memberId: string }>();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response: INewContributionResponse = await newContribution(
      data,
      params.memberId
    );

    if (response.id) {
      await router.push("/member");
      return toast({
        description: "New contribution was saved successful.",
      });
    } else {
      setIsLoading(false);
      return toast({
        title: "Something went wrong.",
        description: `Failed to save new contribution. Please try again.`,
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter full information to register new contribution with.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="year">
              Year
            </Label>
            <Input
              id="year"
              placeholder="Year"
              type="number"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("year", { valueAsNumber: true })}
            />
            {errors?.year && (
              <p className="px-1 text-xs text-red-600">{errors.year.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="amount">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="Amount"
              type="number"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("amount", { valueAsNumber: true })}
            />
            {errors?.amount && (
              <p className="px-1 text-xs text-red-600">
                {errors.amount.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save new contribution
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
