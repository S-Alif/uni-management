import CustomSheet from "@/components/CustomSheet"
import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { ListFilter, PencilLine, Plus, Trash2 } from "lucide-react"
import SemesterForm from "./forms/SemesterForm"
import { useEffect, useState } from "react"
import useQueryParams from "@/hooks/useQueryParams"
import FilterOptions from "@/components/FilterOptions"
import apiHandler from "@/utils/api/apiHandler"
import { administrationRoutes, DELETE_METHOD, GET } from "@/utils/api/apiConstants"
import { TableCell, TableRow } from "@/components/ui/table"
import DisplayDialog from "@/components/DisplayDialog"
import DisplayTable from "@/components/DisplayTable"
import { format } from "date-fns"
import DisplayPagination from "@/components/DisplayPagination"

const Semesters = () => {

	const isMobile = useIsMobile()
	const [filterOpen, setFilterOpen] = useState(false)
	const [semesters, setSemesters] = useState([])
	const [loading, setLoading] = useState(false)
	const [totalPage, setTotalPage] = useState(0)

	const {page = 1, limit = 40, updateParams} = useQueryParams()

	// get semesters
	useEffect(() => {
		(async () => {
			setLoading(true)
			const result = await apiHandler(
				{url: `${administrationRoutes.semester}?page=${page}&limit=${limit}`, method: GET},
				{},
				true
			)
			setLoading(false)
			if(!result) return
			setSemesters(result?.semesters)
			setTotalPage(result?.totalPage)
		})()
	}, [page, limit])

	return (
		<section id="semester-page" className="section-layout">
			<SectionDashboard
				id="semester-data"
				sectionTitle="Semester List"
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
						{/* section form */}
						<CustomSheet
							trigger={
								<Button
									size={isMobile ? "icon" : "lg"}
								>
									<span className="hidden md:block">Add Semester</span> <Plus />
								</Button>
							}
							title="Create a new semester"
						>
							<SemesterForm setSemester={setSemesters} />
						</CustomSheet>
					</div>
				}
			>
				{/* filter options */}
				<FilterOptions 
					filterOpen={filterOpen}
					searchBtnOnClick={() => {
						updateParams("page", 1)
					}}
					options={[
						{
							label: "Limit",
							name: "limit",
							placeholder: "Select limit",
							selectItems: [
								{ _id: 40, name: "40" },
								{ _id: 60, name: "60" },
								{ _id: 80, name: "80" },
							],
							onValueChange: (name, value) => {
								updateParams(name, value)
							}
						},
					]}

				/>

				{/* semester table */}
				<div className="pt-10">
					<DisplayTable
						headings={[
							{name: "#"},
							{name: "Semester"},
							{name: "Active"},
							{name: "Start"},
							{name: "End"},
							{name: "Last updated on"},
							{name: "Actions"},
						]}
					>
						{
							semesters?.map((item, index) => (
								<SemesterTableRows 
									key={index}
									index={index}
									item={item}
									page={page}
									limit={limit}
									setSemester={setSemesters}
								/>
							))
						}
						{
							semesters?.length === 0 && (
								<TableRow>
									<TableCell colSpan={6} className="text-center">
										No semester found
									</TableCell>
								</TableRow>
							)
						}

					</DisplayTable>
				</div>

				{/* pagination */}
				<div className="pt-8">
					<DisplayPagination
						totalPage={totalPage}
						currentPage={parseInt(page)}
						onPageChange={updateParams}
					/>
				</div>

			</SectionDashboard>
		</section>
	)
}

export default Semesters


// semester table rows
const SemesterTableRows = ({page, limit, index, item, setSemester}) => {

	const [dialogOpen, setDialogOpen] = useState(false)

	return (
		<TableRow>
			<TableCell className="border-r">
				{index + 1 + (page - 1) * limit}
			</TableCell>

			<TableCell className="border-r">
				{item?.name}
			</TableCell>

			<TableCell className="border-r">
				{item?.active.toString().toUpperCase()}
			</TableCell>

			<TableCell className="border-r">
				{format(item?.start, "MMMM dd, EEEE, yyyy, hh:mm a")}
			</TableCell>

			<TableCell className="border-r">
				{format(item?.end, "MMMM dd, EEEE, yyyy, hh:mm a")}
			</TableCell>

			<TableCell className="border-r">
				{format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
			</TableCell>

			{/* actions */}
			<TableCell>
				<div className="flex gap-2 items-center">
					<CustomSheet
						trigger={
							<Button size="icon"><PencilLine /></Button>
						}
						title="Update semester"
					>
						<div className="pt-10">
							<SemesterForm id={item?._id} data={item} setSemester={setSemester} />
						</div>
					</CustomSheet>

					{/* remove */}
					<DisplayDialog
						trigger={
							<Button size="icon" variant="destructive" onClick={() => setDialogOpen(true)}>
								<Trash2 />
							</Button>
						}
						openState={dialogOpen}
						setOpenstate={setDialogOpen}
						heading={`Remove semester ${item?.name} ?`}
						description={`Are you sure you want to delete this semester ?`}
					>
						<div className="flex gap-5 justify-end pt-10">
							<Button
								size="lg"
								variant="destructive"
								onClick={async () => {
									const result = await apiHandler(
										{ url: `${administrationRoutes.semester}/${item?._id}`, method: DELETE_METHOD },
										{},
										true
									)
									if (!result) return
									setSemester(prev => prev.filter(section => section._id !== item?._id))
									setDialogOpen(false)
								}}
							>
								Proceed
							</Button>

							<Button
								size="lg"
								variant="outline"
								onClick={() => setDialogOpen(false)}
							>
								Exit
							</Button>
						</div>
					</DisplayDialog>
				</div>
			</TableCell>

			
		</TableRow>
	)
}