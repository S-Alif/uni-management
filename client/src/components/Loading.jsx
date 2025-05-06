import { Skeleton } from "./ui/skeleton"


const Loading = ({type}) => {

    // card Skeleton
    if(type == "card"){
        return(
            <section className="section-layout">
                <div className="border shadow-sm w-[380px]">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="leading-none tracking-tight">
                            <Skeleton className="w-[104px] max-w-full" />
                        </div>
                        <div>
                            <Skeleton className="w-[216px] max-w-full" />
                        </div>
                    </div>
                    <div className="p-6 pt-0 grid gap-4">
                        <div>
                            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <span className="flex h-2 w-2 translate-y-1"></span>
                                <div className="space-y-1">
                                    <div className="leading-none">
                                        <Skeleton className="w-[184px] max-w-full" />
                                    </div>
                                    <div>
                                        <Skeleton className="w-[80px] max-w-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <span className="flex h-2 w-2 translate-y-1"></span>
                                <div className="space-y-1">
                                    <div className="leading-none">
                                        <Skeleton className="w-[280px] max-w-full" />
                                    </div>
                                    <div>
                                        <Skeleton className="w-[88px] max-w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6 pt-0">
                        <div className="inline-flex items-center justify-center transition-colors h-10 px-4 py-2 w-full">
                            <Skeleton className="w-[136px] max-w-full" />
                        </div>
                    </div>
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