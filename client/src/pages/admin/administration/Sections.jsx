import CustomSheet from "@/components/CustomSheet"
import FilterOptions from "@/components/FilterOptions"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useQueryParams from "@/hooks/useQueryParams"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { ListFilter, Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import SectionForm from "./forms/SectionForm"


const Sections = () => {

    const { department } = OtherStore()
    const navigate = useNavigate()
    const { updateParams, values: { batch, no, page = 1, limit = 40, dept = "all", shift = "all" }} = useQueryParams(["batch", "page", "limit", "dept", "shift", "no"])

    const [section, setSection] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)
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
    const getSections = async () => {
        setLoading(true)
        const result = await apiHandler(
            { url: `${administrationRoutes.sections}?page=${page}&limit=${limit}&dept=${dept}&shift=${shift}`, method: GET },
            {},
            true
        )
        if (!result) return
        setSection(result?.sections)
        setLoading(false)
    }
    useEffect(() => {
        getSections()
    }, [page])

    // filter options
    const filterOptions = [
        {
            label: "Limit",
            name: "limit",
            placeholder: "Select limit",
            selectItems: [
                { _id: 30, name: "30" },
                { _id: 50, name: "50" },
                { _id: 70, name: "70" },
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        },
        {
            label: "Department",
            name: "dept",
            placeholder: "Select department",
            selectItems: department,
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        },
        {
            label: "Shift",
            name: "shift",
            placeholder: "Select shift",
            selectItems: [
                { _id: "day", name: "Day" },
                { _id: "evening", name: "Evening" },
            ],
            onValueChange: (name, value) => {
                updateParams(name, value)
            }
        }
    ]

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
                                setFilterOpen((prev) => !prev)
                            }}
                        >
                            filter <span className="ml-1"><ListFilter /></span>
                        </Button>
                        {/* section form */}
                        <CustomSheet 
                            trigger={
                                <Button
                                    size="lg"
                                >
                                    Create Section <span className="ml-1"><Plus /></span>
                                </Button>
                            }
                            title="Create a new section"
                        >
                            <SectionForm batch={batch} setSection={setSection} />
                        </CustomSheet>
                    </div>
                </div>

                {/* filter options */}
                <FilterOptions 
                    options={filterOptions}
                    filterOpen={filterOpen}
                    searchBtnOnClick={() => {
                        updateParams("page", 1)
                        getSections()
                    }}
                />
                
            </div>

        </section>
    )
}

export default Sections