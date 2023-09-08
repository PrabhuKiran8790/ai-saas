import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
    const { user } = useUser();

    return (
        <div>
            <Avatar className="h-10 w-10">
                <AvatarImage className="p-0" src={user?.imageUrl} />
                <AvatarFallback className="p-1">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
    )
}