import DisplayAvatar from "@/components/DisplayAvatar"
import { Card, CardContent } from "@/components/ui/card"
import { NavLink } from "react-router"


const FacultyCard = ({item}) => {
    return (
        <Card className="overflow-hidden">
            <div className="mb-8 overflow-hidden aspect-video">
                <img src={item?.bgImage} alt="faculty background" />
            </div>
            <CardContent>
                <DisplayAvatar
                    img={item?.image}
                    alt="faculty image"
                    avatarClassName="rounded-md shadow-none"
                >
                    <NavLink to={`/academics/faculty/${item?._id}`} className={"font-bold hover:underline underline-offset-1"}>{item?.name}</NavLink>                    
                </DisplayAvatar>

                <p className="pt-5 text-base">{item?.shortDesc}</p>
            </CardContent>
        </Card>
    )
}

export default FacultyCard