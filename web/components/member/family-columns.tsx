/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Member } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { INewFamilyResponse } from "@/lib/features/family/types";
import { isFatherUpdate } from "@/lib/features/family/is-father";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { isMotherUpdate } from "@/lib/features/family/is-mother";
import { getCurrentUser } from "@/lib/session";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const familyColumn: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "names",
    header: "Names",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "family.names",
    header: "Family",
  },
  {
    accessorKey: "dob",
    header: () => <div className="text-left">DOB</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("dob"))?.toDateString();
      return date;
    },
  },
  {
    accessorKey: "joinDate",
    header: () => <div className="text-left">Join date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"))?.toDateString();
      return date;
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const member = row.original;
      const router = useRouter();

      

     

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.email)}
            >
              Copy Member Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/member/contributions/${member.id}`}>
                Contributions
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>View member details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
