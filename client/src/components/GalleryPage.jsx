import { galleryData } from "@/data/data"
import PublicPageLayout from "@/pages/public/components/layouts/PublicPageLayout"
import GalleryCard from "./cards/GalleryCard"
import SectionPage from "./SectionPage"


const GalleryPage = () => {
    return (
        <PublicPageLayout
            pageId="gallery"
            pageTitle="Gallery"
        >
            <SectionPage
                id="gallery-section"
                sectionTitle={"Our Gallery"}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        galleryData.map((item, index) => (
                            <GalleryCard key={index} item={item} />
                        ))
                    }
                </div>
            </SectionPage>

        </PublicPageLayout>
    )
}

export default GalleryPage