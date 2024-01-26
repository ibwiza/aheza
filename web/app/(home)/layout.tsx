import { notFound, redirect } from "next/navigation";

import {
  adminConfig,
  clarkConfig,
  contributionConfig,
  parentConfig,
} from "@/config/dashboard";
import { MainNav } from "@/components/layout/marketing/main-nav";
import { getCurrentUser } from "@/lib/session";
import { SiteFooter } from "@/components/layout/marketing/site-footer";
import { UserAccountNav } from "@/components/auth/user-account-nav";
import { Nav } from "@/components/layout/marketing/home/nav";

interface FamilyLayoutProps {
  children?: React.ReactNode;
}

export default async function FamilyLayout({ children }: FamilyLayoutProps) {
  const user = await getCurrentUser();

  if (user.statusCode == 401) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div>
            {(() => {
              if (user.role === "USER") {
                return <MainNav items={contributionConfig.mainNav} />;
              } else if (user.role === "CLARK") {
                return <MainNav items={clarkConfig.mainNav} />;
              } else if (user.role === "ADMIN") {
                return <MainNav items={adminConfig.mainNav} />;
              } else if (user.role === "PARENT") {
                return <MainNav items={parentConfig.mainNav} />;
              }
            })()}
          </div>

          <UserAccountNav
            user={{
              names: user.name,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container flex-1 gap-12 md:grid-cols-[200px_1fr]">
        {/* <aside className="hidden w-[200px] flex-col md:flex">
          <Nav items={dashboardConfig.sidebarNav} />
        </aside> */}
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
