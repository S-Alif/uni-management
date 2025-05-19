import UserStore from "@/stores/UserStore"
import Loading from "./Loading"


const SectionDashboard = ({
    id="give-ad-id",
    sectionTitle=null,
    containerClassName="",
    sectionClassName="",
    wrapperClassName="",
    loading=false,
    headerSideOptions = null,
    loadingType = "card",
    children
}) => {

    const { sidebarState } = UserStore()

    return (
        <section id={id} className={`section-layout ${sectionClassName}`}>
            <div className={`${sidebarState ? "" : "container"} ${wrapperClassName}`}>
                {(sectionTitle && !headerSideOptions) && <h1 className="page-title">{sectionTitle}</h1>}
                {
                    (headerSideOptions && sectionTitle) && (
                        <div className="flex justify-between items-center mb-10">
                            <h1 className="page-title">{sectionTitle}</h1>
                            {headerSideOptions}
                        </div>
                    )
                }

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