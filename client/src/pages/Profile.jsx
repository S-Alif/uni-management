import SectionDashboard from "@/components/SectionDashboard"
import UserStore from "@/stores/UserStore"



const Profile = () => {

	const {user} = UserStore()
	const role = user?.role

	return (
		<section className="section-layout" id="user-profile">

			{/* user profile */}
			<SectionDashboard 
				id="user-profile"
				sectionTitle={`Hi, ${user?.name}`}
			>
				<div className="flex flex-col lg:flex-row gap-10">
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
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Batch:</span> {user?.batch?.name}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Section:</span> {user?.section?.section}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Shift:</span> {user?.section?.shift}</p>
							<p className="text-base xl:text-lg pb-2"><span className="font-bold">Address:</span> {user?.address}</p>
						</div>
					</div>
				</div>
			</SectionDashboard>
		</section>
	)
}

export default Profile