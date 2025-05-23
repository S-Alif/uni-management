import CustomSheet from "@/components/CustomSheet"
import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { ListFilter, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import CourseForm from "./admin/academics/forms/CourseForm"
import FilterOptions from "@/components/FilterOptions"
import useQueryParams from "@/hooks/useQueryParams"
import OtherStore from "@/stores/OtherStore"
import apiHandler from "@/utils/api/apiHandler"
import { administrationRoutes, GET, publicRoutes } from "@/utils/api/apiConstants"
import DisplayTable from "@/components/DisplayTable"
import DisplayPagination from "@/components/DisplayPagination"
import CourseTableRows from "@/components/tableRows/CourseTableRows"
import UserStore from "@/stores/UserStore"
import { useLocation } from "react-router"


const Courses = () => {

	const [loading, setLoading] = useState(false)
	const [filterOpen, setFilterOpen] = useState(false)
	const [courses, setCourses] = useState([])
	const [totalPage, setTotalPage] = useState(0)
	const location = useLocation()

	const { values: { page = 1, limit = 60, dept = "all" }, updateParams} = useQueryParams(["page", "limit", "dept"])
	const {department} = OtherStore()
	const isMobile = useIsMobile()
	console.log(courses)

	const {user} = UserStore()

	// get course list
	const getData = async () => {
		let url = `${administrationRoutes.subjects}?page=${page}&limit=${limit}&dept=${dept}`
		if (user?.role !== 2025) url = `${publicRoutes.subjects.url}?page=${page}&limit=${limit}&dept=${dept}`

		setLoading(true)

		// fetch data
		const result = await apiHandler(
			{url: url, method: GET},
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
				sectionClassName={(user?.role !== 2025 || !location.pathname.includes("/admin")) ? "container" : ""}
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

						{
							(user?.role == 2025 && location.pathname.includes("/admin")) &&
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
						}
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
							...((user?.role == 2025 && location.pathname.includes("/admin")) ? [
								{ name: "Last updated at" },
								{ name: "Actions" }
							] : [])
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