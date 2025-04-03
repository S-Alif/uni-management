import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


const DisplayAvatar = ({ img = null, alt = "UN", children }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="shadow-md">
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