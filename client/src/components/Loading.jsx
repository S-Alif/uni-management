import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"


const Loading = ({type}) => {

    // card Skeleton
    if(type == "card"){
        return(
            <section className="section-layout">
                <div className="card-grid-layout">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index} className="py-5 px-4">
                            <div className="flex flex-col space-y-1.5">
                                <div className="leading-none tracking-tight">
                                    <Skeleton className="w-full h-40 max-w-full" />
                                </div>
                                <div className="pt-5">
                                    <Skeleton className="w-[90%] h-5 max-w-full" />
                                    <Skeleton className="w-[80%] h-5 max-w-full mt-5" />
                                    <div className="flex gap-3 mt-5">
                                        <Skeleton className="w-[10%] h-3 max-w-full" />
                                        <Skeleton className="w-[10%] h-3 max-w-full" />
                                        <Skeleton className="w-[10%] h-3 max-w-full" />
                                    </div>
                                    <Skeleton className="w-[40%] h-10 max-w-full mt-5 ml-auto" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

        )
    }

    // table Skeleton
    if(type == "table"){
        return (
            <section className="section-layout">
                <div className="w-full border rounded-lg overflow-hidden">
                    {/* Table header */}
                    <div className="flex bg-muted px-4 py-2 border-b">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2 w-full">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-4" />
                            </div>
                        ))}
                    </div>

                    {/* Table body */}
                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex px-4 py-3 border-b last:border-0 items-center"
                        >
                            {Array.from({ length: 4 }).map((_, colIndex) => (
                                <div key={colIndex} className="w-full">
                                    <Skeleton className="h-4 w-[80%]" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
    )
    }
}

export default Loading