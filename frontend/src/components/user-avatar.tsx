import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { User } from "@/types"

interface UserAvatarProps {
  user: Pick<User, "name" | "initials" | "avatarColor">
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
  ring?: boolean
}

const sizeClasses = {
  xs: "size-5 text-[10px]",
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-12 text-base",
}

export function UserAvatar({ user, size = "sm", className, ring }: UserAvatarProps) {
  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        ring && "ring-2 ring-background",
        className,
      )}
      title={user.name}
    >
      <AvatarFallback
        className="font-semibold text-white"
        style={{ backgroundColor: user.avatarColor }}
      >
        {user.initials}
      </AvatarFallback>
    </Avatar>
  )
}

export function AvatarStack({
  users,
  max = 4,
  size = "sm",
}: {
  users: Pick<User, "name" | "initials" | "avatarColor">[]
  max?: number
  size?: UserAvatarProps["size"]
}) {
  const visible = users.slice(0, max)
  const overflow = users.length - visible.length

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((user, index) => (
        <UserAvatar key={`${user.name}-${index}`} user={user} size={size} ring />
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-white/10 font-medium text-text-secondary ring-2 ring-background",
            sizeClasses[size],
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
