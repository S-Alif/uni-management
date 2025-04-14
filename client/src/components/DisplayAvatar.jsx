import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


const DisplayAvatar = ({ img = null, alt = "UN", children }) => {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="shadow-md w-[55px] h-[55px]">
                <AvatarImage src={img} />
                <AvatarFallback>{alt}</AvatarFallback>
            </Avatar>

            <div>
                {children}
            </div>
        </div>
    )
}

export default DisplayAvatar