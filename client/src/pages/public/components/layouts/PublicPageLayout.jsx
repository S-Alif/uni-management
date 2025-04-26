import Loading from "@/components/Loading"
import { Separator } from "@/components/ui/separator"
import { ArrowUp } from "lucide-react"

const PublicPageLayout = ({
    pageImg = "https://tinyurl.com/mrx7udcr",
    pageTitle = "",
    pageDescription = "",
    pageId = "give-an-id",
    loading = false,
    children
}) => {
    return (
        <section className="w-full min-h-screen block" id={pageId}>
            {
                loading ?
                    <Loading type={"card"} />
                    :
                    <>
                        {/* page header */}
                        <div className="w-full h-[50vh] lg:h-[60vh] relative overflow-hidden">
                            <img src={pageImg} alt="faculty-and-dept" className="w-full h-full object-cover object-center" />
                            {/* overlay text */}
                            <div className="absolute top-0 left-0 w-full h-full bg-black/75 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <h1 className="public-page-title">{pageTitle}</h1>
                                    <Separator className="my-4 xl:my-8 max-w-[200px] mx-auto" />
                                    <p className="text-white text-base lg:text-xl w-full max-w-[600px] xl:max-w-[950px] mx-auto">{pageDescription}</p>
                                </div>
                            </div>
                        </div>

                        {/* page content */}
                        <div>
                            {children}
                        </div>
                    </>
            }

            <div className="fixed bottom-10 right-10">
                <a href={`#${pageId}`} className="w-10 h-10 rounded-md bg-primary z-20 flex justify-center items-center text-white shadow-md"><ArrowUp /></a>
            </div>
        </section>
    )
}

export default PublicPageLayout