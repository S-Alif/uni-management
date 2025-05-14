import { NavLink } from "react-router"
import { Card, CardContent } from "../ui/card"
import { buttonVariants } from "../ui/button"


const UserCards = ({item}) => {

    const isTeacher = (item?.role == 2022) || item?.teacherDesignation
    
    return (
        <Card className="overflow-hidden relative">
            <div className="overflow-hidden aspect-square max-w-[450px] mx-auto">
                <img src={item?.image} alt="teacher profile image" className="w-full h-full object-cover object-center" />
            </div>

            {/* info */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] bg-primary/65 z-10 backdrop-blur-lg">
                <CardContent className="py-4">
                    <NavLink
                        to={
                            isTeacher ? `/academics/teachers/${item?._id}`
                            : `/students/${item?._id}`
                        }
                        className={`${buttonVariants({size: "lg", variant: "link"})} !px-0`}
                    >
                        <h3 className="text-white text-2xl font-bold">{item?.name}</h3>
                    </NavLink>
                    {
                        isTeacher ?
                        <p className="pt-2 text-white">
                            {item?.teacherDesignation}
                            {item?.dept && <span>({item?.dept?.shortName})</span>}
                        </p>
                        : 
                        <p className="pt-2 text-white">
                            {item?.dept?.shortName} - {item?.personalId}
                        </p>
                    }
                </CardContent>
            </div>
        </Card>
    )
}

export default UserCards