import { format } from "date-fns"
import { Button, buttonVariants } from "../ui/button"
import { TableCell, TableRow } from "../ui/table"
import { NavLink } from "react-router"
import UserStore from "@/stores/UserStore"
import DisplayAvatar from "../DisplayAvatar"
import DisplayDialog from "../DisplayDialog"
import UserForm from "@/pages/admin/actors/forms/UserForm"
import { PencilLine, Trash2 } from "lucide-react"

// table rows
const UserTableRows = ({ data, userType, index, page, limit, setUsers }) => {

    const {user} = UserStore()

    return (
        <TableRow>
            <TableCell className="border-r">{(page - 1) * limit + index + 1}</TableCell>
            <TableCell className="border-r">
                <DisplayAvatar
                    img={data?.image}
                    alt="User image"
                >
                    <NavLink
                        to={`/academics/${userType == "student" ? "students" : "teachers"}/${data?._id}`}
                    >
                        <h3 className="text-base">{data?.name}</h3>
                        <p className="text-sm text-gray-400">{data?.personalId}</p>
                    </NavLink>

                </DisplayAvatar>
            </TableCell>

            <TableCell className="border-r">
                <div className="flex flex-col items-start">
                    <a href={`mailto:${data?.email}`} className={`!text-base ${buttonVariants({ variant: "link" })}`}>{data?.email}</a>
                    <a href={`tel:+${data?.phone}`} className={`!text-base ${buttonVariants({ variant: "link" })}`}>+{data?.phone}</a>
                </div>
            </TableCell>

            <TableCell className="border-r">
                <p className="text-base">{data?.dept?.shortName}</p>
            </TableCell>

            {
                userType == "student" &&
                <TableCell className="border-r">
                    <p className="text-base">{data?.batch?.name} - {data?.section?.shift.toUpperCase()} - {data?.section?.section}</p>
                </TableCell>
            }

            {
                userType == "teacher" &&
                <TableCell className="border-r">
                    <p className="text-base">{data?.teacherDesignation}</p>
                </TableCell>
            }

            {
                user?.role == 2025 &&
                <>
                    <TableCell className="border-r">
                        {format(data?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
                    </TableCell>
                    <TableCell className="">
                        {/* actions */}
                        <div className="flex gap-2 items-center">
                            <DisplayDialog
                                trigger={
                                    <Button size="icon"><PencilLine /></Button>
                                }
                                heading={`Update ${userType}`}
                                dialogClassName="lg:max-w-[900px]"
                            >
                                <div className="pt-10">
                                    <UserForm id={data?._id} data={data} userType={userType} setUsers={setUsers} />
                                </div>
                            </DisplayDialog>

                            {/* remove */}
                            <Button
                                size="icon"
                                variant="destructive"
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </TableCell>
                </>
            }
            
        </TableRow>
    )
}

export default UserTableRows