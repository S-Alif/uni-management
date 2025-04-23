

const SectionPage = ({
    id = "give-an-id",
    containerClassName = "",
    sectionClassName = "",
    sectionTitle = null,
    children
}) => {
  return (
    <section id={id} className={`section-layout ${sectionClassName}`}>
        <div className="container">
        {sectionTitle && <h2 className="section-title">{sectionTitle}</h2>}

            <div className={containerClassName}>
                {children}
            </div>
        </div>
    </section>
  )
}

export default SectionPage