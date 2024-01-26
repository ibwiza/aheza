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
import { memberSchema } from "@/lib/validations/member";
import { newMember } from "@/lib/features/member/new-member";
import { INewMemberResponse } from "@/lib/features/member/types";
import { INewFamilyResponse } from "@/lib/features/family/types";
import { getFamily } from "@/lib/features/family/get-family";

interface MemberFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof memberSchema>;

export function MemberForm({ className, ...props }: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(memberSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const params = useParams<{ tag: string; familyId: string }>();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const family: INewFamilyResponse = await getFamily(params.familyId);

    const response: INewMemberResponse = await newMember(data, family.id);

    if (response.email) {
      await router.push("/member");

      return toast({
        description: "New Member was saved successful.",
      });
    } else {
      setIsLoading(false);
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
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter full information to register new member with.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-1">
            <Label className="" htmlFor="names">
              Names
            </Label>
            <Input
              id="names"
              placeholder="Full names"
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
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="phone">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="Phone number"
              type="text"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("phone")}
            />
            {errors?.phone && (
              <p className="px-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="code">
              Code
            </Label>
            <Input
              id="code"
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
          <div className="grid gap-1">
            <Label className="" htmlFor="dob">
              DOB
            </Label>
            <Input
              id="dob"
              placeholder="DOB"
              type="date"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("dob", { valueAsDate: true })}
            />
            {errors?.dob && (
              <p className="px-1 text-xs text-red-600">{errors.dob.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="joinDate">
              Join Date
            </Label>
            <Input
              id="joinDate"
              placeholder="Join Date"
              type="date"
              className="w-[600px]"
              size={32}
              disabled={isLoading}
              {...register("joinDate", { valueAsDate: true })}
            />
            {errors?.joinDate && (
              <p className="px-1 text-xs text-red-600">
                {errors.joinDate.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save new member
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
