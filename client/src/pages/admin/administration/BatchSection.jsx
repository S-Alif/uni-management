import CustomSheet from "@/components/CustomSheet"
import DisplayTable from "@/components/DisplayTable"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import useQueryParams from "@/hooks/useQueryParams"
import { administrationRoutes, DELETE_METHOD, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { PencilLine, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import BatchForm from "./forms/BatchForm"
import { format } from "date-fns"
import DisplayDialog from "@/components/DisplayDialog"


const BatchSection = () => {

	const [batch, setBatch] = useState([])
	const {values: {page = 1, limit = 20}, updateParams} = useQueryParams(["page", "limit"])

	// fetch list
	useEffect(() => {
		(async () => {
			const result = await apiHandler(
				{ url: `${administrationRoutes.batch}?page=${page}&limit=${limit}`, method: GET },
				{},
				true
			)
			if (!result) return
			setBatch(result?.batch)
		})()
	}, [page, limit])
	

	return (
		<section className="section-layout">

			{/* controls */}
			<div className="flex justify-between items-end">
				<h1 className="page-title">Batch list</h1>
				<CustomSheet
					trigger={
						<Button size="lg">
							<span className="hidden md:block">Create Batch</span> <span className="!text-2xl"><Plus size={50} /></span>
						</Button>
					}
					title="Create new batch"
				>
					<div className="pt-10">
						<BatchForm setBatch={setBatch} />
					</div>
				</CustomSheet>
			</div>

			{/* batch list sort options */}
			<div className="pt-10">
				<div>
					<label className="block text-base font-bold pb-5 text-gray-700">Limit</label>
					<Select
						onValueChange={(value) => {
							updateParams("limit", value)
						}}
					>
						<SelectTrigger className="w-[180px] lg:w-[300px]">
							<SelectValue placeholder="Select limit" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="20" className="cursor-pointer">20</SelectItem>
							<SelectItem value="40" className="cursor-pointer">40</SelectItem>
							<SelectItem value="60" className="cursor-pointer">60</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>


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
								index={index}
								setBatch={setBatch}
								key={index}
							/>
						))
					}

				</DisplayTable>
			</div>
		</section>
	)
}

export default BatchSection

// batch section table row
const BatchSectionTableRow = ({item, index, setBatch}) => {

	const [dialogOpen, setDialogOpen] = useState(false)

	return (
		<TableRow>
			<TableCell className="border-r">{index + 1}</TableCell>
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