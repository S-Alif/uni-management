import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"


const DisplayTable = ({headings=[], children}) => {
    return(
        <div className="max-h-[60vh] overflow-y-scroll relative">
            <Table className="overflow-x-auto relative">
                <TableHeader className="sticky top-0">
                    <TableRow className="bg-primary hover:bg-primary">
                        {headings.map((heading, index) => (
                            <TableHead
                                key={index}
                                className={`font-bold text-gray-50 dark:text-gray-100 
                                ${heading?.className ? heading.className : ""}
                                ${index < headings.length - 1 ? "border-r border-r-white" : ""}
                            `}
                            >
                                {heading?.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </div>
    )
}

export default DisplayTable