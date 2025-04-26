import { Card, CardContent } from "@/components/ui/card"


const TeacherCard = ({item}) => {
    return (
        <Card className="overflow-hidden relative">
            <div className="overflow-hidden aspect-square max-w-[450px] mx-auto">
                <img src={item?.image} alt="teacher profile image" className="w-full h-full object-cover object-center" />
            </div>

            {/* info */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] bg-primary/65 z-10 backdrop-blur-lg">
                <CardContent className="py-4">
                    <h3 className="text-white text-2xl font-bold">{item?.name}</h3>
                    <p className="pt-2 text-white">
                        {item?.teacherDesignation}
                        {item?.dept && <span>({item?.dept?.name})</span>}
                    </p>
                </CardContent>
            </div>
        </Card>
    )
}

export default TeacherCard