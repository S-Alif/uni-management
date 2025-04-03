import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"


const DisplayTable = ({headings=[], children}) => {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    {headings.map((heading, index) => (
                        <TableHead 
                            key={index} 
                            className={`font-bold text-gray-700 dark:text-gray-200 
                                ${heading?.className ? heading.className : ""}
                                ${index < headings.length - 1 ? "border-r" : ""}
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
    )
}

export default DisplayTable