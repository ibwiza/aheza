"use client";

import { Type } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { INewTypeResponse } from "@/lib/features/type/types";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { activeType } from "@/lib/features/type/active";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Type>[] = [
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
    accessorKey: "names",
    header: "Names",
  },
  {
    accessorKey: "percentage",
    header: "Parcentage",
  },
  {
    accessorKey: "active",
    header: "Active",
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Create date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))?.toDateString();
      return date;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const type = row.original;
      const router = useRouter();

      async function activate(active: boolean, cid: string) {
        const response: INewTypeResponse = await activeType(active, cid);

        await router.refresh();

        if (response.names) {
          return toast({
            description: "Type was activated successful.",
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
              onClick={() => navigator.clipboard.writeText(type.names)}
            >
              Copy Type name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => activate(true, type.cid)}>
              Activate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => activate(false, type.cid)}>
              Disactivate
            </DropdownMenuItem>
            <DropdownMenuItem>View Type details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
