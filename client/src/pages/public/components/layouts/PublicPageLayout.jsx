
const PublicPageLayout = ({
    pageImg = "https://tinyurl.com/mrx7udcr",
    pageTitle = "",
    pageDescription = "",
    pageId="give-an-id",
    children
}) => {
  return (
    <section className="w-full min-h-screen block" id={pageId}>
        {/* page header */}
          <div className="w-full h-[50vh] lg:h-[60vh] relative overflow-hidden">
              <img src={pageImg} alt="faculty-and-dept" className="w-full h-full object-cover object-center" />
              {/* overlay text */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/65 flex items-center justify-center">
                  <div className="text-center text-white">
                      <h1 className="public-page-title">{pageTitle}</h1>
                      <p className="text-white text-base lg:text-xl w-full max-w-[600px] mx-auto">{pageDescription}</p>
                  </div>
              </div>
          </div>

          {/* page content */}
          <div>
              {children}
          </div>
    </section>
  )
}

export default PublicPageLayout