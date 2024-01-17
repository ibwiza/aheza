import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    facebook: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type HomeConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export type User = {
  names: string;
  email: string;
};

export type Contribution = {
  cid: string;
  year: number;
  month: number;
  amount: number;
  type: Type;
  createdAt: Date;
};

export type Type = {
  cid: string;
  names: string;
  percentage: number;
  createdAt: Date;

};
export type Family = {
  cid: string;
  names: string;
};

export type Member = {
  id: string;
  names: string;
  email: string;
  family: Family;
  phone: string;
};
