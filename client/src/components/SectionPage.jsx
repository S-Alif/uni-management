import Loading from "./Loading"


const SectionPage = ({
    id = "give-an-id",
    containerClassName = "",
    sectionClassName = "",
    sectionTitle = null,
    loading = false,
    loadingType = "card",
    children
}) => {
  return (
    <section id={id} className={`public-section-layout ${sectionClassName}`}>
        <div className="container">
        {sectionTitle && <h2 className="section-title">{sectionTitle}</h2>}

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

export default SectionPage