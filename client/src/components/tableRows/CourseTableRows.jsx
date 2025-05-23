import { PencilLine, Trash2 } from "lucide-react"
import CustomSheet from "../CustomSheet"
import { Button } from "../ui/button"
import CourseForm from "@/pages/admin/academics/forms/CourseForm"
import { format } from "date-fns"
import { TableCell, TableRow } from "../ui/table"
import UserStore from "@/stores/UserStore"
import { Fragment } from "react"

// course table rows
const CourseTableRows = ({ page, limit, index, item, setSubject }) => {

    const {user} = UserStore()

    return (
        <TableRow>
            <TableCell className="border-r">
                {(page * limit) + index + 1}
            </TableCell>
            <TableCell className="border-r">
                {item.name}
            </TableCell>

            <TableCell className="border-r">
                {item.code}
            </TableCell>

            <TableCell className="border-r">
                {item.about}
            </TableCell>

            <TableCell className="border-r">
                {item.dept.name}
            </TableCell>

            {
                user?.role == 2025 &&
                <Fragment>
                    <TableCell className="border-r">
                        {format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
                    </TableCell>

                    <TableCell>
                        {/* actions */}
                        <div className="flex gap-2 items-center">
                            <CustomSheet
                                trigger={
                                    <Button size="icon"><PencilLine /></Button>
                                }
                                title={"Update course details"}
                            >
                                <div className="pt-10">
                                    <CourseForm id={item?._id} data={item} setSubject={setSubject} />
                                </div>
                            </CustomSheet>

                            {/* remove */}
                            <Button
                                size="icon"
                                variant="destructive"
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </TableCell>
                </Fragment>
            }
        </TableRow>
    )
}

export default CourseTableRows