import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router"
import ScheduleForm from "./forms/ScheduleForm"
import useQueryParams from "@/hooks/useQueryParams"
import OtherStore from "@/stores/OtherStore"
import { ListFilter, PencilLine, Plus, Trash2 } from "lucide-react"
import DisplayDialog from "@/components/DisplayDialog"
import { useEffect, useState } from "react"
import FilterOptions from "@/components/FilterOptions"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import DisplayTable from "@/components/DisplayTable"
import { TableCell, TableRow } from "@/components/ui/table"
import DisplayAvatar from "@/components/DisplayAvatar"


// schedule save form
const Schedules = () => {

	const navigate = useNavigate()
	const {semesterId} = useParams()
	console.log(semesterId)

	const { values: { page = 1, limit = 40, dept = "all", section = "all", batch = "all" }, updateParams } = useQueryParams(["page", "limit", "dept", "section", "batch"])
	const { department } = OtherStore()

	const [batchList, setBatchList] = useState([])
	const [sectionList, setSectionList] = useState([])
	const [scheduleList, setScheduleList] = useState([])
	const [totalPages, setTotalPages] = useState(0)
	const [filterOpen, setFilterOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	// get batch and sections
	useEffect(() => {
		// get batch list based on department
		if (dept != "all") return
		const getBatchList = async () => {
			const result = await apiHandler(
				{ url: `${administrationRoutes.batch}?page=1&limit=100`, method: GET },
				{},
				false
			)
			if (!result) return
			setBatchList(result?.batch)
		}
		getBatchList()

		// get section based on dept and batch
		if (batch == "all") {
			setSectionList([])
			updateParams("section", "all")
			return
		}
		const getSectionList = async () => {
			const result = await apiHandler(
				{ url: `${administrationRoutes.sections}?dept=${dept}&batch=${batch}`, method: GET },
				{},
				false
			)
			if (!result) return
			setSectionList(result?.sections)
		}
		getSectionList()

	}, [batch, section, dept])

	if (!semesterId) {
		return (
			<div>
				<h1>Invalid SemesterId</h1>
				<p>Please go back and try again</p>
				<Button
					size="lg"
					onClick={() => {
						navigate(-1)
					}}
				>
					Go Back
				</Button>
			</div>
		)
	}

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
		{
			label: "Batch",
			name: "batch",
			placeholder: "Select Batch",
			selectItems: [
				{ _id: "all", name: "ALL" },
				...batchList
			],
			onValueChange: (name, value) => {
				updateParams(name, value)
			}
		},
		{
			label: "Section",
			name: "section",
			placeholder: "Select section",
			selectItems: [
				{ _id: "all", name: "ALL" },
				...sectionList
			],
			onValueChange: (name, value) => {
				updateParams(name, value)
			}
		},
	]

	// get Schedule
	const getData = async () => {
		setLoading(true)
		const result = await apiHandler(
			{ url: `${administrationRoutes.schedule}?page=${page}&limit=${limit}&dept=${dept}&section=${section}&batch=${batch}&semester=${semesterId}`, method: GET },
			{},
			true
		)
		setLoading(false)
		if (!result) return
		setScheduleList(result?.schedules)
		setTotalPages(result?.totalPages)
	}

	useEffect(() => {
		getData()
	}, [page])


	return (
		<section className="section-layout" id="schedule-form">
			{/* schedule table */}
			<SectionDashboard
				id="schedule-table"
				sectionTitle={"Schedule Table"}
				loading={loading}
				loadingType="table"
				headerSideOptions={
					<div className="flex justify-between items-center">
						{/* buttons */}
						<div className="flex gap-2">
							<Button
								size="lg"
								variant="outline"
								onClick={() => {
									setFilterOpen((prev) => !prev)
								}}
							>
								filter <span className="ml-1"><ListFilter /></span>
							</Button>

							{/* dialog */}
							<DisplayDialog
								trigger={
									<Button size="lg">
										<span className="hidden md:block">Add Schedule</span> <span className="!text-2xl"><Plus size={50} /></span>
									</Button>
								}
								heading={`Add Schedule`}
								dialogClassName="lg:max-w-[1100px]"
							>
								{/* place student form here */}
								<div className="pt-10">
									<ScheduleForm semesterId={semesterId} />
								</div>
							</DisplayDialog>
						</div>
					</div>
				}
			>

				{/* filter options */}
				<FilterOptions
					options={filterOptions}
					filterOpen={filterOpen}
					searchBtnOnClick={async () => {
						if (page == 1) {
							return await getData()
						}
						updateParams("page", 1)
					}}
				/>

				{/* table */}
				<div className="pt-10">
					<DisplayTable
						headings={[
							{ name: "#" },
							{ name: "Teacher" },
							{ name: "Day" },
							{ name: "Time" },
							{ name: "Course" },
							{ name: "Room" },
							{ name: "Batch & Section" },
							{ name: "Action" },
						]}
					>
						{
							scheduleList?.map((item, index) => (
								<ScheduleRows
									key={index}
									page={page}
									limit={limit}
									item={item}
									index={index}
									setScheduleList={setScheduleList}
								/>
							))
						}
						{
							scheduleList?.length == 0 && 
							<TableRow>
								<TableCell colSpan={8} className="text-center">
									<p className="text-xl">No Schedule Found</p>
								</TableCell>
							</TableRow>
						}

					</DisplayTable>
				</div>

			</SectionDashboard>
		</section>
	)
}

export default Schedules


// schedule table rows
const ScheduleRows = ({ page, limit, item, index, setScheduleList }) => {
	return (
		<TableRow>
			<TableCell className="border-r">
				{index + 1 + (page - 1) * limit}
			</TableCell>

			<TableCell className="border-r">
				<DisplayAvatar
					img={item?.courseTeacher?.image}
					alt="User image"
				>
					<h3 className="text-base">{item?.courseTeacher?.name}</h3>
					<p className="text-sm text-gray-400">{item?.courseTeacher?.personalId}</p>

				</DisplayAvatar>
			</TableCell>

			<TableCell className="border-r">
				{item?.weekday?.toUpperCase()}
			</TableCell>

			<TableCell className="border-r">
				{
					item?.timeSlot?.map((time, index) => (
						<p className="my-1">{time?.slot}</p>
					))
				}
			</TableCell>

			<TableCell className="border-r">
				{item?.subject?.name}({item?.subject?.code})
			</TableCell>

			<TableCell className="border-r">
				{item?.room}
			</TableCell>
			<TableCell className="border-r">
				{item?.batchSection?.batch?.name} - {item?.batchSection?.shift?.toUpperCase()} - {item?.batchSection?.section}
			</TableCell>

			<TableCell className="">
				{/* actions */}
				<div className="flex gap-2 items-center">
					<DisplayDialog
						trigger={
							<Button size="icon"><PencilLine /></Button>
						}
						heading={`Edit Schedule`}
						dialogClassName="lg:max-w-[1100px]"
					>
						<div className="pt-10">
							<ScheduleForm id={item?._id} data={item} semesterId={item?.semester?._id} />
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

		</TableRow>
	)
}