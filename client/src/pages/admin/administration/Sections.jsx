import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useQueryParams from "@/hooks/useQueryParams"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { ListFilter, Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"


const Sections = () => {

    const { department } = OtherStore()
    const navigate = useNavigate()
    const { updateParams, values: { batch, no, page = 1, limit = 40, dept = "all", shift = "all" }} = useQueryParams(["batch", "page", "limit", "dept", "shift", "no"])

    const [section, setSection] = useState([])
    const [controlOpen, setControlOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // if no batch
    if(!batch){
        return (
            <div className="section-layout">
                <h1 className="text-3xl font-bold pb-5">Batch not found</h1>
                <Button
                    size="lg"
                    onClick={() => {
                        navigate(-1) 
                    }}
                >Go back</Button>
            </div>
        )
    }

    // get the list of sections
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await apiHandler(
                { url: `${administrationRoutes.sections}?page=${page}&limit=${limit}&dept=${dept}&shift=${shift}`, method: GET },
                {},
                true
            )
            if (!result) return
            setSection(result?.sections)
            setLoading(false)
        })()

    }, [page])

    return (
        <section className="section-layout">
            {/* filters */}
            <div className="pb-5">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <h1 className="page-title pb-8 md:pb-0">Batch - {no < 10 ? "0"+no : no} Sections</h1>
                    <div className="flex gap-2">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                setControlOpen((prev) => !prev)
                            }}
                        >
                            filter <span className="ml-1"><ListFilter /></span>
                        </Button>
                        <Button
                            size="lg"
                        >
                            Create Section <span className="ml-1"><Plus /></span>
                        </Button>
                    </div>
                </div>

                {/* filter options */}
                <div className={`mt-10 transition-all duration-300 ${controlOpen ? "max-h-[600px]" : "max-h-0"} overflow-hidden`}>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 items-end">
                        {/* limit */}
                        <div>
                            <label className="block text-base font-bold pb-5 text-gray-700">Limit</label>
                            <Select
                                onValueChange={(value) => {
                                    updateParams("limit", value)
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select limit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30" className="cursor-pointer">30</SelectItem>
                                    <SelectItem value="50" className="cursor-pointer">50</SelectItem>
                                    <SelectItem value="70" className="cursor-pointer">70</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* department */}
                        <div>
                            <label className="block text-base font-bold pb-5 text-gray-700">Department</label>
                            <Select
                                onValueChange={(value) => {
                                    updateParams("dept", value)
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select limit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        department?.map((e, index) => (
                                            <SelectItem key={index} value={e?._id} className="cursor-pointer">{e?.shortName}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        {/* shift */}
                        <div>
                            <label className="block text-base font-bold pb-5 text-gray-700">Shift</label>
                            <Select
                                onValueChange={(value) => {
                                    updateParams("shift", value)
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select limit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"day"} className="cursor-pointer">Day</SelectItem>
                                    <SelectItem value={"evening"} className="cursor-pointer">Evening</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* search btn */}
                        <div>
                            <Button
                                size="lg"
                                onClick={() => updateParams("page", 1)}
                            >
                                Search <Search />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Sections