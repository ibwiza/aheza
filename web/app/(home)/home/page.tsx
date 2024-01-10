import { objectives } from "@/config/home";
import { getUserContribution } from "@/lib/features/contribution/user-contribution";

export default async function IndexPage() {
  const userContributions = await getUserContribution();
  return (
    <>
      <p>Contribution</p>
    </>
  );
}
