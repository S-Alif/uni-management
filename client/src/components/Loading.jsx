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
            <div className="border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom">
                        <thead className="[&amp;_tr]:border-b">
                            <tr className="border-b transition-colors">
                                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <Skeleton className="w-[48px] max-w-full" />
                                </th>
                                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="inline-flex items-center justify-center transition-colors h-10 px-4 py-2">
                                        <Skeleton className="w-[40px] max-w-full" />
                                        <Skeleton className="lucide-arrow-up-down ml-2 w-[24px] h-[24px]" />
                                    </div>
                                </th>
                                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="text-right">
                                        <Skeleton className="w-[48px] max-w-full" />
                                    </div>
                                </th>
                                <th className="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0"></th>
                            </tr>
                        </thead>
                        <tbody className="[&amp;_tr:last-child]:border-0">
                            <tr className="border-b transition-colors">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="h-4 w-4 shrink-0 border border-primary"></div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div>
                                        <Skeleton className="w-[56px] max-w-full" />
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div>
                                        <Skeleton className="w-[120px] max-w-full" />
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="text-right">
                                        <Skeleton className="w-[56px] max-w-full" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b transition-colors">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="h-4 w-4 shrink-0 border border-primary"></div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div>
                                        <Skeleton className="w-[56px] max-w-full" />
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div>
                                        <Skeleton className="w-[120px] max-w-full" />
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="text-right">
                                        <Skeleton className="w-[56px] max-w-full" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b transition-colors">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="h-4 w-4 shrink-0 border border-primary"></div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div>
                                        <Skeleton className="w-[80px] max-w-full" />
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div>
                                        <Skeleton className="w-[168px] max-w-full" />
                                    </div>
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="text-right">
                                        <Skeleton className="w-[56px] max-w-full" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
    }
}

export default Loading