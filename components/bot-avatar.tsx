import { Avatar, AvatarImage } from "./ui/avatar"

export const BotAvatar = () => {
    return (
        <div>
            <Avatar className="h-7 w-7 md:h-10 md:w-10">
                <AvatarImage className="p-1" src="/logo.png" />
            </Avatar>
        </div>
    )
}