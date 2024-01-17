import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./icons";

interface CreateButtonProps {
  link: string;
  text?: string;
}

export function CreateButton({ link, text }: CreateButtonProps) {
  return (
    <Link href={link}>
      <Button>
        <Icons.add className="mr-2 h-4 w-4" />
        {text}
      </Button>
    </Link>
  );
}
