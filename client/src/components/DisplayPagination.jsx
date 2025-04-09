import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"


const DisplayPagination = ({onPageChange, totalPage, currentPage}) => {

    if(!totalPage || totalPage <= 1) return null

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1)

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if(currentPage > 1) onPageChange("page", currentPage - 1)
                        }}
                        disabled={currentPage <= 1}
                    />
                </PaginationItem>
                {
                    pages.map((page) => 
                        page == currentPage ? (
                            <PaginationItem key={page}>
                                <PaginationLink 
                                    isActive={true}
                                    onClick={() => onPageChange("page", page)}
                                    disabled={currentPage == page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => onPageChange("page", page)}
                                    disabled={currentPage == page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )
                }
                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            if(currentPage < totalPage) onPageChange("page", currentPage + 1)
                        }}
                        disabled={currentPage >= totalPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default DisplayPagination