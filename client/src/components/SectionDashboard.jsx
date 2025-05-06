import UserStore from "@/stores/UserStore"
import Loading from "./Loading"


const SectionDashboard = ({
    id="give-ad-id",
    sectionTitle=null,
    containerClassName="",
    sectionClassName="",
    loading=false,
    loadingType = "card",
    children
}) => {

    const { sidebarState } = UserStore()

    return (
        <section id={id} className={`section-layout ${sectionClassName}`}>
            <div className={sidebarState ? "" : "container"}>
                {sectionTitle && <h2 className="page-title">{sectionTitle}</h2>}

                <div className={containerClassName}>
                    {
                        loading ?
                            <Loading type={loadingType} />
                            :
                            children
                    }
                </div>
            </div>
        </section>
    )
}

export default SectionDashboard