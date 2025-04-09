import CustomSheet from "@/components/CustomSheet"
import DisplayDialog from "@/components/DisplayDialog"
import { Button } from "@/components/ui/button"
import useQueryParams from "@/hooks/useQueryParams"
import { Plus } from "lucide-react"
import { useState } from "react"
import UserForm from "./forms/UserForm"


const Students = () => {

	const { values: { page = 1, limit = 20, dept = "all", batch = "all", section = "all" }, updateParams } = useQueryParams(["page", "limit", "dept", "batch", "section"])
	const [totalPage, setTotalPage] = useState(0)

	return (
		<section className="section-layout">
			{/* controls */}
			<div className="flex justify-between items-center mb-10">
				<h1 className="page-title">Student list</h1>
				<DisplayDialog
					trigger={
						<Button size="lg">
							<span className="hidden md:block">Add Student</span> <span className="!text-2xl"><Plus size={50} /></span>
						</Button>
					}
					heading="Add a new student"
					dialogClassName="lg:max-w-[900px]"
				>
					{/* place student form here */}
					<div className="pt-10">
						<UserForm userType="student" />
					</div>
				</DisplayDialog>
			</div>
		</section>
	)
}

export default Students