import FormLayout from "@/components/forms/FormLayout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, GET, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { formData } from "@/utils/formData"
import { errorToast } from "@/utils/toastNotification"
import { useEffect, useState } from "react"
import { z } from "zod"


const UserForm = ({userType, id = null, data = null, setUsers}) => {

    // store
    const {department} = OtherStore()

    const [resetForm, setResetForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [extraInfo, setExtraInfo] = useState({
        dept: "", // for teacher only department will go
        batch: "",
        section: ""
    })
    const [batchList, setBatchList] = useState([])
    const [sectionList, setSectionList] = useState([])
    const [image, setImage] = useState(null)


    // get batch list and section list
    useEffect(() => {

        // get batch list based on department
        if(extraInfo.dept == "" || userType != "student") return
        const getBatchList = async () => {
            if(batchList.length > 0) return
            const result = await apiHandler(
                { url: `${administrationRoutes.batch}?page=1&limit=50`, method: GET },
                {},
                false
            )
            if (!result) return
            setBatchList(result?.batch)
        }
        getBatchList()

        // get section based on dept and batch
        if(extraInfo.batch == "") return
        const getSectionList = async () => {
            if(sectionList.length > 0) return
            const result = await apiHandler(
                { url: `${administrationRoutes.sections}?dept=${extraInfo.dept}&batch=${extraInfo.batch}`, method: GET },
                {},
                false
            )
            if (!result) return
            setSectionList(result?.sections)
        }
        getSectionList()

    }, [extraInfo.dept, extraInfo.batch, extraInfo.section])

    useEffect(() => {
        if (id && userType == "student") {
            setExtraInfo({
                dept: data?.dept?._id || "",
                batch: data?.batch?._id || "",
                section: data?.section?._id || ""
            })
        }
        else if(id) {
            setExtraInfo(prev => {
                return { ...prev, ["dept"]: data?.dept?._id || "" }
            })
        }
    }, [id, data])

    // form schema
    const formSchema = z.object({
        name: z.string().min(5, "Invalid name").max(100, "Name is too long"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number"),
        image: z.any().superRefine((value, ctx) => {
            if (Array.isArray(value) && value.length > 0) {
                const file = value[0]
                if (!(file instanceof File)) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Invalid file type",
                    })
                }
                if (file.size > 5 * 1024 * 1024) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Image size exceeds 5MB",
                    })
                }
            }
        }),
        pass: z.string().optional().default(""),
        address: z.string().min(10, "Please enter address").max(300, "Address is too long"),
        teacherDesignation: userType !== "teacher" ? z.string().optional() : z.enum(["Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer"]).default("Lecturer"),
        role: z.number().optional().default(userType == "student" ? 1999 : 2022),
    })

    // default values
    let defaultValues = {
        name: id ? data?.name : "",
        email: id ? data?.email : "",
        phone: id ? data?.phone : "",
        image: id ? data?.image : "",
        address: id ? data?.address : "",
        ...(userType == "teacher" && {
            teacherDesignation: id ? data?.teacherDesignation : "Lecturer"
        }),
        ...(id && {
            pass: ""
        }),
    }

    // form fields
    const formFields = [
        {
            type: "text",
            name: "name",
            label: "Enter name",
            placeholder: "Enter user name"
        },
        {
            type: "email",
            name: "email",
            label: "Enter email",
            placeholder: "Enter email"
        },
        {
            type: "text",
            name: "phone",
            label: "Enter phone",
            placeholder: "Enter phone number"
        },
        ...(!id ? [] : 
            [
                {
                    type: "password",
                    name: "pass",
                    label: "Enter password",
                    placeholder: "Enter password"
                }
            ]
        ),
        {
            type: "file",
            name: "image",
            label: "Enter image",
            placeholder: "Enter image",
            setFile: (image) => {
                setImage(image)
            }
        },
        {
            type: "textarea",
            name: "address",
            label: "Enter address",
            placeholder: "Enter address"
        },
        ...(userType == "teacher" ? [{
            type: "select",
            name: "teacherDesignation",
            label: "Select designation",
            placeholder: "Select designation",
            selectItems: [
                {_id: "Professor", name: "Professor"},
                {_id: "Associate Professor", name: "Associate Professor"},
                {_id: "Assistant Professor", name: "Assistant Professor"},
                {_id: "Senior Lecturer", name: "Senior Lecturer"},
                {_id: "Lecturer", name: "Lecturer"},
            ]
        }] : [])
    ]

    // form submit
    const onSubmit = async (value) => {
        setLoading(true)
        setResetForm(false)
        if(extraInfo.dept.length < 24) return errorToast("Select department") 
        if(userType == "student") {
            if(extraInfo.batch.length < 24 || extraInfo.section.length < 24) return errorToast("Provide all information")
            value.batch = extraInfo.batch
            value.section = extraInfo.section
        }
        
        value.dept = extraInfo.dept
        
        const data = formData(value)
        console.log(Object.fromEntries(data))

        const result = await apiHandler(
            { url: `${administrationRoutes.user}/${id ? id : ""}`, method: id ? PATCH : POST},
            data,
            true
        )
        setLoading(false)
        if(!result) return

        if(id) {
            return setUsers(prev => {
                return prev.map(user => user?._id == id ? result : user)
            })
        }
        setUsers(prev => [...prev, result])
        setResetForm(true)
        setImage(null)
    }



    return (
        <div className="">

            {/* select other required info */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 items-end mb-10">

                {/* department list */}
                <div>
                    <label className="block text-base font-bold pb-5 text-gray-700">Select department</label>
                    <Select
                        value={extraInfo.dept}
                        onValueChange={(value) => {
                            setExtraInfo((prev) => ({ ...prev, dept: value }))
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                department?.map((item, index) => (
                                    <SelectItem
                                        key={index}
                                        value={item?._id}
                                        className="cursor-pointer"
                                    >
                                        {item?.shortName || item?.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                {/* section and batch list */}
                {
                    (userType == "student" && extraInfo.dept != "") &&
                    <>
                        <div>
                            <label className="block text-base font-bold pb-5 text-gray-700">Select Batch</label>
                            <Select
                                value={extraInfo.batch}
                                onValueChange={(value) => {
                                    setExtraInfo((prev) => ({ ...prev, batch: value }))
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Batch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        batchList?.map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={item?._id}
                                                className="cursor-pointer"
                                            >
                                                {item?.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-base font-bold pb-5 text-gray-700">Select section</label>
                            <Select
                                value={extraInfo.section}
                                onValueChange={(value) => {
                                    setExtraInfo((prev) => ({ ...prev, section: value }))
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Section" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        sectionList?.map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={item?._id}
                                                className="cursor-pointer"
                                            >
                                                {item?.section} - {item?.shift.toUpperCase()}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                }
            </div>

            {/* form and show image */}
            <div className={`flex lg:flex-row flex-col gap-10 ${extraInfo.dept != "" ? "opacity-1 visible" : "opacity-0 invisible"} transition-all duration-300`}>
                <div className="lg:sticky lg:top-0">
                    <div className="aspect-square w-[400px] h-[400px] max-w-[calc(100%)] rounded-md overflow-hidden shadow-lg">
                        <img src={image ? image : id ? data?.image : "https://placehold.co/400x400"} className="object-cover w-full h-full object-center" />
                    </div>
                </div>

                {/* form */}
                <div className="flex-grow">
                    <FormLayout 
                        formId="user-form"
                        formSchema={formSchema}
                        formFields={formFields}
                        defaultValues={defaultValues}
                        buttonText={`Save ${userType}`}
                        resetForm={resetForm}
                        onSubmit={onSubmit}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserForm