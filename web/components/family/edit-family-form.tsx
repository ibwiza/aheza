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
import { Icons } from "@/components/icons";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { familySchema } from "@/lib/validations/family";
import { getFamily } from "@/lib/features/family/get-family";
import { INewFamilyResponse } from "@/lib/features/family/types";
import { newFamily } from "@/lib/features/family/new-family";
import { toast } from "../ui/use-toast";
import { Family } from "@/types";

interface FamilyFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof familySchema>;

import { use } from "react";

async function findFamily(familyId: string) {
  return await getFamily(familyId);
}

export function EditFamilyForm({ className, ...props }: FamilyFormProps) {
  const params = useParams<{ tag: string; familyId: string }>();

  const family = use(findFamily(params.familyId));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      names: family.names,
      code: family.code,
      dob: family.dob,
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const response: INewFamilyResponse = await newFamily(data);

    await router.push("/family");

    if (response.names) {
      return toast({
        description: "New Member was saved successful.",
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
        <CardHeader></CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="names">
              Names
            </Label>
            <Input
              id="names"
              placeholder="Family names"
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
            <Label className="sr-only" htmlFor="names">
              Code
            </Label>
            <Input
              id="names"
              placeholder="CODE"
              type="text"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("code")}
            />
            {errors?.code && (
              <p className="px-1 text-xs text-red-600">{errors.code.message}</p>
            )}
          </div>


        </CardContent>
        <CardFooter>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save new family
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
