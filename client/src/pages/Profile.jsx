import DisplayDialog from "@/components/DisplayDialog"
import RichTextEditor from "@/components/RichTextEditor/Index"
import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import UserStore from "@/stores/UserStore"
import { POST, studentRoutes, teacherRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { PencilLine } from "lucide-react"
import { useState } from "react"



const Profile = () => {

	const {user, setUser} = UserStore()
	const role = user?.role
	const [about, setAbout] = useState("")

	return (
		<section className="section-layout" id="user-profile">

			{/* user profile */}
			<SectionDashboard 
				id="user-profile"
				sectionTitle={`Hi, ${user?.name}`}
			>
				<div className="flex flex-col lg:flex-row gap-10 mt-10">
					<div className="lg:sticky lg:top-0 aspect-square rounded-md overflow-hidden shadow-md shrink-0 mx-auto max-w-[450px]">
						<img src={user?.image} alt="user image" className="w-full h-full object-cover object-center" />
					</div>

					<div className="grow">
						<h3 className="pb-4 border-b border-b-primary font-bold text-2xl">Personal Informations</h3>
						<div className="pt-6">
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Name:</span> {user?.name}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Personal Id:</span> {user?.personalId}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Email:</span> {user?.email}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Phone:</span> +{user?.phone}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Department:</span> {user?.dept?.name} ({user?.dept?.shortName})</p>
							{
								role == 1999 && (
									<>
										<p className="text-base xl:text-lg pb-2"><span className="font-bold">Batch:</span> {user?.batch?.name}</p>
										<p className="text-base xl:text-lg pb-2"><span className="font-bold">Section:</span> {user?.section?.section}</p>
										<p className="text-base xl:text-lg pb-2"><span className="font-bold">Shift:</span> {user?.section?.shift}</p>
									</>
								)
							}
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Address:</span> {user?.address}</p>
						</div>
					</div>
				</div>
			</SectionDashboard>

			{/* about */}
			<SectionDashboard
				sectionTitle="About"
				id="about"
				headerSideOptions={
					<DisplayDialog
						trigger={
							<Button size="icon"><PencilLine /></Button>
						}
						heading={"About"}
						dialogClassName="lg:max-w-[900px] xl:max-w-[1100px]"
					>
						<RichTextEditor 
							defaultValue={user?.about ? user?.about : "Write something about yourself"}
							onChange={setAbout}
						/>
						<Button
							size="lg"
							onClick={async () => {
								const url = role == 1999 ? studentRoutes.user : teacherRoutes.user
								const result = await apiHandler(
									{url: url, method: POST},
									{about: about},
									true
								)
								if(!result) return
								setUser(result)
							}}
						>
							Save
						</Button>

					</DisplayDialog>
				}
			>
				{
					user?.about ? 
					<div className="detail-content" dangerouslySetInnerHTML={{__html: user?.about}} /> 
					: <p className="pt-10 text-xl">No about information found</p>
				}

			</SectionDashboard>
		</section>
	)
}

export default Profile