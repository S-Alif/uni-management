import SectionPage from "@/components/SectionPage"
import PublicPageLayout from "./components/layouts/PublicPageLayout"
import OtherStore from "@/stores/OtherStore"
import FacultyCard from "./components/cards/FacultyCard"
import DeptCard from "./components/cards/DeptCard"


const FacultyAndDept = () => {

    const {faculty, department} = OtherStore()
    // console.log(faculty, department)

    // // get faculty and dept lists
    // useEffect(() => {
    //     (async () => {
    //         const [faculty, dept] = await Promise.all([
    //             apiHandler(publicRoutes.faculty),
    //             apiHandler(publicRoutes.department)
    //         ])
    //         console.log(faculty, dept)
    //     })()
    // }, [])

    return(
        <PublicPageLayout
            pageId="faculty-and-dept"
            pageImg="https://tinyurl.com/28cd6ej8"
            pageTitle="Faculty & Departments"
            pageDescription="Our faculty and departments offer a wide range of courses and programs to meet the needs of students in various fields"
        >
            {/* display faculty */}
            <SectionPage
                id="faculty-list"
                sectionTitle="Our Faculties"
            >
                <div className="card-grid-layout">
                    {
                        faculty.map((faculty, index) => (
                            <FacultyCard
                                key={index}
                                item={faculty}
                            />
                        ))
                    }
                </div>
                
            </SectionPage>

            {/* display departments */}
            <SectionPage
                id="deprtment-list"
                sectionTitle="Our Departments"
                sectionClassName="bg-primary/10"
            >
                <div className="card-grid-layout">
                    {
                        department.map((department, index) => (
                            <DeptCard
                                key={index}
                                item={department}
                            />
                        ))
                    }
                </div>

            </SectionPage>

        </PublicPageLayout>
    )
}

export default FacultyAndDept