import CustomSheet from "@/components/CustomSheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { administrationRoutes, GET } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, useSearchParams } from "react-router"
import { z } from "zod"

// form schema
const formSchema = z.object({
	name: z.string().min(1).max(3).superRefine(({name}, ctx) => {
		if(isNaN(name)) ctx.addIssue({
			code: "custom",
            message: "Batch number must be a number",
            path: ["name"]
		})
	})
})

let defaultValues = {name: ""}

// form fields
const formFields = [
	{
		type: "text",
		name: "name",
		label: "Enter new batch no",
		placeholder: "Enter your new batch no (e.g: 27)"
	}
]

const BatchSection = () => {

	const [resetForm, setResetForm] = useState(false)
	const [batch, setBatch] = useState([])

	// setting url params
	const [params, setParams] = useSearchParams()
	let page = parseInt(params.get("page") || "1", 10)
	let limit = parseInt(params.get("limit") || "20", 10)
	

	// save batch
	const onSubmit = async (value) => {
		console.log(value)
	}

	// fetch list
	useEffect(() => {
		(async () => {
			const result = await apiHandler(
				{ url: `${administrationRoutes.batch}?page=${page}&limit=${limit}`, method: GET },
				{},
				true
			)
			if (!result) return
			setBatch(result?.batch)
		})()
	}, [page, limit])
	

	return (
		<section className="section-layout">
			{/* batch list sort options */}
			<div className="flex justify-between items-end">
				<div className="control">
					<label className="block text-base font-bold pb-5 text-gray-700">Limit</label>
					<Select
						onValueChange={(value) => {
							setParams({...params, limit: value })
                            page = 1
						}}
					>
						<SelectTrigger className="w-[180px] lg:w-[300px]">
							<SelectValue placeholder="Select limit" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="20" className="cursor-pointer">20</SelectItem>
							<SelectItem value="40" className="cursor-pointer">40</SelectItem>
							<SelectItem value="60" className="cursor-pointer">60</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="">
					<Button size="lg"><span className="hidden md:block">Create batch</span> <span className="!text-2xl"><Plus size={50} /></span></Button>
				</div>
			</div>


			{/* batch list */}
			<div className="pt-14">
				<div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-12 gap-2">
					{
						batch.length > 0 &&
						batch.map((e, index) => (
							<CustomSheet
								trigger={
									<Card key={index} className="cursor-pointer">
										<NavLink to={`/admin/sections?batch=${e?._id}&no=${e?.name}`} state={{batchNo: e?.name}}>
											<CardHeader>
												<CardTitle className="text-center">Batch</CardTitle>
											</CardHeader>
											<CardContent>
												<h2 className="text-center text-5xl">{e?.name < 10 ? "0" + e?.name : e?.name}</h2>
											</CardContent>
										</NavLink>
									</Card>
								}
								title="Update batch"
							>
								<div className="pt-4">
									
								</div>
							</CustomSheet>
						))
					}
					
				</div>
				{
					batch.length == 0 && <h3 className="text-lg font-bold text-black/55">No batch found</h3>
				} 
			</div>
		</section>
	)
}

export default BatchSection