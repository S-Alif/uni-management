import SectionPage from "@/components/SectionPage"
import PublicPageLayout from "./components/layouts/PublicPageLayout"


const FacultyAndDept = () => {
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


            </SectionPage>

        </PublicPageLayout>
    )
}

export default FacultyAndDept