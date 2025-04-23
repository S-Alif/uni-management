import DisplayAvatar from "@/components/DisplayAvatar"
import { Card, CardContent } from "@/components/ui/card"
import { NavLink } from "react-router"


const DeptCard = ({item}) => {
    return(
        <Card className="overflow-hidden">
            <div className="mb-8 overflow-hidden aspect-video">
                <img src={item?.bgImage} alt="department background" />
            </div>
            <CardContent>
                <DisplayAvatar
                    img={item?.image}
                    alt="department image"
                >
                    <NavLink to={`/academics/departments/${item?._id}`} className={"font-bold hover:underline underline-offset-1"}>{item?.name} ({item?.shortName})</NavLink>
                </DisplayAvatar>

                <p className="pt-5 text-base">{item?.shortDesc}</p>

                <div className="pt-6 mt-6 border-t">
                    <NavLink to={`/academics/faculty/${item?.faculty?._id}`} className={"font-bold text-sm hover:underline underline-offset-1"}>{item?.faculty?.name}</NavLink>  
                </div>
            </CardContent>
        </Card>
    )
}

export default DeptCard