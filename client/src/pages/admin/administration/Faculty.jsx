import CustomSheet from "@/components/CustomSheet"
import DisplayAvatar from "@/components/DisplayAvatar"
import DisplayDialog from "@/components/DisplayDialog"
import DisplayTable from "@/components/DisplayTable"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import OtherStore from "@/stores/OtherStore"
import { format } from "date-fns"
import { PencilLine, Plus, Trash2 } from "lucide-react"
import FacultyForm from "./forms/FacultyForm"


const Faculty = () => {

	const {faculty, setState} = OtherStore()

	return (
		<section className="section-layout">
			{/* controls */}
			<div className="flex justify-between items-end">
				<h1 className="page-title">Faculty list</h1>
				<CustomSheet
					trigger={
						<Button size="lg">
							<span className="hidden md:block">Create faculty</span> <span className="!text-2xl"><Plus size={50} /></span>
						</Button>
					}
					title="Create new faculty"
				>
					<div className="pt-10">
						<FacultyForm />
					</div>
				</CustomSheet>
			</div>

			{/* faculty list */}
			<div className="pt-10">
				<DisplayTable
					headings={[
						{name:"#"},
						{name: "Faculty"},
						{name: "Dean"},
						{name: "Last Updated"},
						{name: "Actions"},
					]}
				>
					{
						faculty?.map((item, index) => (
							<TableRow key={index}>
								<TableCell className="border-r">{index+1}</TableCell>
								<TableCell className="border-r">
									<DisplayAvatar 
										img={item?.image} 
										alt="FY"
										avatarClassName="rounded-md shadow-none"
									>
										<DisplayDialog
											trigger={<p className="cursor-pointer">{item?.name}</p>}
											heading={"Faculty details"}
											dialogClassName="lg:max-w-[900px]"
										>
											<div className="pt-5">
												<p className="text-base">{item?.shortDesc}</p>
												<div className="pt-8 detail-content">
													<div dangerouslySetInnerHTML={{ __html: item?.about }} />
												</div>
											</div>

										</DisplayDialog>
									</DisplayAvatar>
								</TableCell>
								<TableCell className="border-r">
									{
										!item?.dean ?
											<h3 className="text-xl font-bold text-center">-</h3>
											:
											<DisplayAvatar img={item?.dean?.image} alt="Dran">
												<h3 className="text-base">{item?.dean?.name}</h3>
												<p className="text-sm text-gray-400">{item?.dean?.personalId}</p>
											</DisplayAvatar>
									}
								</TableCell>
								<TableCell className="border-r">
									{format(item?.updatedAt, "MMMM dd, EEEE, yyyy, hh:mm a")}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										{/* update */}
										<CustomSheet
											trigger={
												<Button size="icon"><PencilLine /></Button>
											}
											title="Edit faculty"
										>
											<div className="pt-10">
												<FacultyForm id={item?._id} data={item} />
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
						))
					}

				</DisplayTable>
			</div>


		</section>
	)
}

export default Faculty