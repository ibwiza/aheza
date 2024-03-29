import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { User } from "@/types";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "names" | "email">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarFallback>
        <span className="sr-only">{user.names}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
