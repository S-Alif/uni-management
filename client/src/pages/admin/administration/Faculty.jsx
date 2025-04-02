import CustomSheet from "@/components/CustomSheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


const Faculty = () => {
	return (
		<section className="section-layout">
			{/* controls */}
			<div className="flex justify-between items-end">
				<h1 className="page-title">Faculty list</h1>
				<CustomSheet
					trigger={
						<Button size="lg"><span className="hidden md:block">Create faculty</span> <span className="!text-2xl"><Plus size={50} /></span></Button>
					}
					title="Create new faculty"
				>
					create a form
				</CustomSheet>
			</div>


		</section>
	)
}

export default Faculty