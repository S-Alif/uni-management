import useQueryParams from "@/hooks/useQueryParams"
import { useState } from "react"
import UserForm from "../forms/UserForm"
import DisplayDialog from "@/components/DisplayDialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


const ActorPage = ({userType = ""}) => {
    const { values: { page = 1, limit = 20, dept = "all", batch = "all", section = "all" }, updateParams } = useQueryParams(["page", "limit", "dept", "batch", "section"])
    const [totalPage, setTotalPage] = useState(0)

    return (
        <section className="section-layout">
            {/* controls */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="page-title"><span className="capitalize">{userType}</span> list</h1>
                <DisplayDialog
                    trigger={
                        <Button size="lg">
                            <span className="hidden md:block">Add <span className="capitalize">{userType}</span></span> <span className="!text-2xl"><Plus size={50} /></span>
                        </Button>
                    }
                    heading={`Add new ${userType}`}
                    dialogClassName="lg:max-w-[900px]"
                >
                    {/* place student form here */}
                    <div className="pt-10">
                        <UserForm userType={userType} />
                    </div>
                </DisplayDialog>
            </div>
        </section>
    )
}

export default ActorPage