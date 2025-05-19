import { NavLink } from "react-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import DisplayAvatar from "../DisplayAvatar"


const ScheduleCards = ({item, role}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{item?.weekday}</CardTitle>
                <CardDescription>
                    {
                        item?.timeSlot?.map((slot, index) => (
                            <p key={index}>{slot?.slot} {slot?.shift}</p>
                        ))
                    }
                </CardDescription>
            </CardHeader>

            <CardContent>
                <h3 className="font-bold text-2xl pb-2">{item?.subject?.name} ({item?.subject.code})</h3>
                <p>{item?.room}</p>
            </CardContent>
            <CardFooter>
                {
                    role == 1999 && (
                        <DisplayAvatar
                            img={item?.courseTeacher?.image}
                            alt={item?.courseTeacher?.name}
                        >
                            <NavLink
                                to={`/academics/teachers/${item?.courseTeacher?._id}`}
                                className={"text-lg"}
                            >
                                {item?.courseTeacher?.name}
                            </NavLink>
                        </DisplayAvatar>
                    )
                }
                {
                    role == 2022 && (
                        <p>Batch: {item?.batchSection?.batch?.name} - {item?.batchSection.section} - {item?.batchSection?.shift?.toUpperCase()}</p>
                    )
                }
                
            </CardFooter>

            
        </Card>
    )
}

export default ScheduleCards