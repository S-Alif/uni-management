import CustomSheet from "@/components/CustomSheet"
import DisplayTable from "@/components/DisplayTable"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import useQueryParams from "@/hooks/useQueryParams"
import { administrationRoutes, DELETE_METHOD, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { ListFilter, PencilLine, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import BatchForm from "./forms/BatchForm"
import { format } from "date-fns"
import DisplayDialog from "@/components/DisplayDialog"
import DisplayPagination from "@/components/DisplayPagination"
import SectionDashboard from "@/components/SectionDashboard"
import { useIsMobile } from "@/hooks/use-mobile"
import FilterOptions from "@/components/FilterOptions"


const BatchSection = () => {

	const [batch, setBatch] = useState([])
	const {values: {page = 1, limit = 20}, updateParams} = useQueryParams(["page", "limit"])
	const [totalPage, setTotalPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const [filterOpen, setFilterOpen] = useState(false)
	const isMobile = useIsMobile()

	// fetch list
	useEffect(() => {
		(async () => {
			setLoading(true)
			const result = await apiHandler(
				{ url: `${administrationRoutes.batch}?page=${page}&limit=${limit}`, method: GET },
				{},
				true
			)
			setLoading(false)
			if (!result) return
			setBatch(result?.batch)
			setTotalPage(result?.totalPage)
		})()
	}, [page, limit])


	// filter options
	const filterOptions = [
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
	]
	

	return (
		<section className="section-layout">

			<SectionDashboard
				id="batch"
				sectionTitle={"Batch List"}
				loading={loading}
				loadingType="table"
				headerSideOptions={
					<div className="flex justify-between items-end gap-2">
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
									<span className="hidden md:block">Add Batch</span> <Plus />
								</Button>
							}
							title="Create new batch"
						>
							<div className="pt-10">
								<BatchForm setBatch={setBatch} />
							</div>
						</CustomSheet>
					</div>
				}
			>
				{/* filter options */}
				<FilterOptions
					options={filterOptions}
					filterOpen={filterOpen}
					searchBtnOnClick={() => {
						updateParams("page", 1)
					}}
				/>

				{/* batch list */}
				<div className="pt-14">
					<DisplayTable
						headings={[
							{ name: "#" },
							{ name: "Batch no" },
							{ name: "Last updated at" },
							{ name: "Actions" },
						]}
					>
						{
							batch?.length > 0 &&
							batch.map((item, index) => (
								<BatchSectionTableRow
									item={item}
									page={parseInt(page)}
									limit={parseInt(limit)}
									index={index}
									setBatch={setBatch}
									key={index}
								/>
							))
						}

					</DisplayTable>
				</div>

				{/* pagination */}
				<div className="pt-10">
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

export default BatchSection

// batch section table row
const BatchSectionTableRow = ({item, page, limit, index, setBatch}) => {

	const [dialogOpen, setDialogOpen] = useState(false)

	return (
		<TableRow>
			<TableCell className="border-r">{(page - 1) * limit + index + 1}</TableCell>
			<TableCell className="border-r">
				<NavLink to={`/admin/sections?batch=${item?._id}&no=${item?.name}`} state={{ batchNo: item?.name }}>
					<p className="text-base">Batch {item?.name < 10 ? "0" + item?.name : item?.name}</p>
				</NavLink>
			</TableCell>
			<TableCell className="border-r">
				{format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
			</TableCell>
			<TableCell>
				<div className="flex gap-2 items-center">
					<CustomSheet
						trigger={
							<Button size="icon"><PencilLine /></Button>
						}
						title="Update batch"
					>
						<div className="pt-10">
							<BatchForm id={item?._id} data={item} setBatch={setBatch} />
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
						heading={`Delete batch - ${item?.name}`}
						description={`Are you sure you want to delete this batch ?`}
					>
						<div className="flex gap-5 justify-end pt-10">
							<Button
								size="lg"
								variant="destructive"
								onClick={async () => {
									const result = await apiHandler(
										{ url: `${administrationRoutes.batch}/${item?._id}`, method: DELETE_METHOD },
										{},
										true
									)
									if (!result) return
									setBatch(prev => prev.filter(batch => batch._id !== item?._id))
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