import { Card, CardContent } from "../ui/card"


const GalleryCard = ({item}) => {
    return (
        <Card>
            <CardContent>
                <div className="mt-5 aspect-video">
                    <img src={item?.imageUrl} alt="gallery image" className="object-cover object-center w-full h-full rounded-md shadow-md" />
                </div>
                <div className="pt-10">
                    <h4 className="text-lg font-semibold">{item?.title}</h4>
                    <p className="text-base">{item?.description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default GalleryCard