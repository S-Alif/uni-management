import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"


const FilterOptions = ({options = [], filterOpen, searchBtnOnClick = null}) => {

    return (
        <div className={`mt-10 transition-all duration-300 ${filterOpen ? "max-h-[600px]" : "max-h-0"} overflow-hidden`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 items-end">
                {
                    options?.map((option, index) => (
                        <div key={index}>
                            <label className="block text-base font-bold pb-5 text-gray-700">{option?.label || "Select something"}</label>
                            <Select
                                onValueChange={(value) => {
                                    option?.onValueChange(option?.name, value)
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder={option?.placeholder || "Select something"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        option?.selectItems?.map((item, index) => {
                                            return (
                                                <SelectItem
                                                    key={index}
                                                    value={item?._id}
                                                    className="cursor-pointer"
                                                >
                                                    {item?.shortName || item?.name || `${item?.section} - ${item?.shift}`}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>

                            </Select>
                        </div>
                    ))
                }

                {/* search btn */}
                <div>
                    <Button
                        size="lg"
                        onClick={() => searchBtnOnClick ? searchBtnOnClick() : null}
                    >
                        Search <Search />
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default FilterOptions