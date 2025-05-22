import { NavLink } from "react-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import DisplayAvatar from "../DisplayAvatar"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"
import apiHandler from "@/utils/api/apiHandler"
import { GET, POST, teacherRoutes } from "@/utils/api/apiConstants"
import DisplayDialog from "../DisplayDialog"
import UserStore from "@/stores/UserStore"


const ScheduleCards = ({item, role}) => {

    const {user} = UserStore()
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{item?.weekday}</CardTitle>
                <CardDescription>
                    {
                        item?.timeSlot?.map((slot, index) => (
                            <p key={index}>{slot?.slot} {slot?.shift?.toUpperCase()}</p>
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
                        <DisplayDialog
                            heading={"Share Material"}
                            trigger={
                                <Button
                                    size="lg"
                                    variant="link"
                                    className="text-lg px-0"
                                >
                                    Batch: {item?.batchSection?.batch?.name} - {item?.batchSection.section} - {item?.batchSection?.shift?.toUpperCase()}
                                </Button>
                            }
                        >
                            <ShareMaterial
                                batchSection={item?.batchSection?._id}
                            />
                            
                        </DisplayDialog>
                    )
                }
                
            </CardFooter>

            
        </Card>
    )
}

export default ScheduleCards

// share a material
const ShareMaterial = ({batchSection}) => {

    const [materials, setMaterials] = useState([])
    const [sharedMaterial, setSharedMaterial] = useState({
        materialId: "",
        batchSection: batchSection
    })

    useEffect(() => {
        (async () => {
            const result = await apiHandler({url: `${teacherRoutes.materials}`, method: GET})
            if(!result) return
            setMaterials(result?.materials)
        })()
    }, [])

    return (
        <div>
            <Select
                value={sharedMaterial?.materialId}
                className="z-10"
                onValueChange={(e) => setSharedMaterial({...sharedMaterial, materialId: e})}
            >
                <SelectTrigger>
                    <SelectValue placeholder={"Select Material"} />
                </SelectTrigger>
                <SelectContent>
                    {
                        materials?.map((material, index) => (
                            <SelectItem
                                value={material?._id}
                                key={index}
                            >
                                {material?.name}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <Button
                size="lg"
                className="mt-4"
                onClick={async () => {
                    const result = await apiHandler(
                        {url: `${teacherRoutes.sharedMaterials}`,method: POST},
                        sharedMaterial,
                        true
                    )
                    if(!result) return
                    setSharedMaterial({
                        materialId: "",
                        batchSection: batchSection
                    })
                }}
            >
                Share
            </Button>
        </div>
    )
}