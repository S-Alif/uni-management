import CustomSheet from "@/components/CustomSheet"
import SectionDashboard from "@/components/SectionDashboard"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { ListFilter, Plus } from "lucide-react"
import { useState } from "react"
import CourseForm from "./forms/CourseForm"


const Courses = () => {

	const [loading, setLoading] = useState(false)
	const [filterOpen, setFilterOpen] = useState(false)
	const [courses, setCourses] = useState([])
	const isMobile = useIsMobile()

	return (
		<section id="course-page" className="section-layout">
			<SectionDashboard
				id="course-dashboard"
				sectionTitle={"Course List"}
				loading={loading}
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
							<CourseForm />
						</CustomSheet>
					</div>
				}
			>
				

			</SectionDashboard>
		</section>
	)
}

export default Courses