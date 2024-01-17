"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  CardFooter,
  CardHeader,
} from "../ui/card";
import { typeSchema } from "@/lib/validations/type";
import { newType } from "@/lib/features/type/new-type";
import { INewTypeResponse } from "@/lib/features/type/types";

interface TypeFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof typeSchema>;

export function TypeForm({ className, ...props }: TypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(typeSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const response: INewTypeResponse = await newType(data);

    await router.push("/type");

    if (response.names) {
      return toast({
        description: "New contribution type was saved successful.",
      });
    } else {
      return toast({
        title: "Something went wrong.",
        description: `${response.message}. Please try again.`,
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          {/* <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter full information to register new contribution with.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="names">
              Names
            </Label>
            <Input
              id="names"
              placeholder="Type names"
              type="text"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("names")}
            />
            {errors?.names && (
              <p className="px-1 text-xs text-red-600">
                {errors.names.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="percentage">
              Percentage
            </Label>
            <Input
              id="percentage"
              placeholder="Percentage"
              type="number"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("percentage", { valueAsNumber: true })}
            />
            {errors?.percentage && (
              <p className="px-1 text-xs text-red-600">
                {errors.percentage.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save new contribution Type
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
