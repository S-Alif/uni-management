import CustomSheet from "@/components/CustomSheet"
import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { ListFilter, PencilLine, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import CourseForm from "./forms/CourseForm"
import FilterOptions from "@/components/FilterOptions"
import useQueryParams from "@/hooks/useQueryParams"
import OtherStore from "@/stores/OtherStore"
import apiHandler from "@/utils/api/apiHandler"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import { TableCell, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import DisplayTable from "@/components/DisplayTable"
import DisplayPagination from "@/components/DisplayPagination"


const Courses = () => {

	const [loading, setLoading] = useState(false)
	const [filterOpen, setFilterOpen] = useState(false)
	const [courses, setCourses] = useState([])
	const [totalPage, setTotalPage] = useState(0)

	const {page = 0, limit = 40, dept = "all", updateParams} = useQueryParams()
	const {department} = OtherStore()
	const isMobile = useIsMobile()
	console.log(courses)

	// get course list
	const getData = async () => {
		setLoading(true)

		// fetch data
		const result = await apiHandler(
			{url: `${administrationRoutes.subjects}?page=${page}&limit=${limit}&dept=${dept}`, method: GET},
			{},
			true
		)
		setLoading(false)
		if(!result) return
		setCourses(result?.subjects)
		setTotalPage(result?.totalPage)
	}

	useEffect(() => {
		getData()
	}, [page])

	// filter options
	const filterOptions = [
		{
			label: "Limit",
			name: "limit",
			placeholder: "Limit",
			selectItems: [
				{ _id: "40", name: "40" },
				{ _id: "60", name: "60" },
				{ _id: "80", name: "80" },
			],
			onValueChange: (name, value) => {
				updateParams(name, value)
			}
		},
		{
			label: "Department",
			name: "dept",
			placeholder: "Select department",
			selectItems: [
				{ _id: "all", name: "All" },
				...department
			],
			onValueChange: (name, value) => {
				updateParams(name, value)
			}
		},
	]

	return (
		<section id="course-page" className="section-layout">
			<SectionDashboard
				id="course-dashboard"
				sectionTitle={"Course List"}
				loading={loading}
				loadingType="table"
				headerSideOptions={
					<div className="flex gap-2">
						<Button
							size={isMobile ? "icon" : "lg"}
							variant="outline"
							onClick={() => {
								setFilterOpen((prev) => !prev)
							}}
						>
							<span className="hidden md:block md:mr-1">filter</span> <ListFilter />
						</Button>

						<CustomSheet
							trigger={
								<Button
									size={isMobile ? "icon" : "lg"}
								>
									<span className="hidden md:block">Add Course</span> <Plus />
								</Button>
							}
							title="Create a new course"
						>
							<CourseForm setSubject={setCourses} />
						</CustomSheet>
					</div>
				}
			>
				
				{/* filter options */}
				<FilterOptions
					options={filterOptions}
					filterOpen={filterOpen}
					searchBtnOnClick={async () => {
						if (page-1 == 0) {
							return await getData()
						}
						updateParams("page", 1)
					}}
				/>

				{/* course list */}
				<div className="pt-10">
					<DisplayTable
						headings={[
							{ name: "#" },
							{ name: "Subject name" },
							{ name: "Code" },
							{ name: "About" },
							{ name: "Department" },
							{ name: "Last updated at" },
							{ name: "Actions" }
						]}
					>
						{
							courses?.length > 0 &&
							courses.map((item, index) => (
								<CourseTableRows
									key={index}
									item={item}
									index={index}
									page={page}
									limit={limit}
									setSubject={setCourses}
								/>
							))
						}

					</DisplayTable>
				</div>

				<DisplayPagination 
					totalPage={totalPage}
					currentPage={page}
					onPageChange={updateParams}
				/>

			</SectionDashboard>
		</section>
	)
}

export default Courses


// course table rows
const CourseTableRows = ({page, limit, index, item, setSubject}) => {
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
		</TableRow>
	)
}