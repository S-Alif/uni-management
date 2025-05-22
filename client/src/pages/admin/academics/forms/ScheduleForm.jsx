import OtherStore from "@/stores/OtherStore"
import { administrationRoutes, GET, PATCH, POST } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import { errorToast } from "@/utils/toastNotification"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DisplayAvatar from "@/components/DisplayAvatar"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const objectId = z
    .string()
    .length(24, { message: "Invalid ObjectId (must be 24 characters)" })

// schedule schema
const scheduleSchema = z.object({
    courseTeacher: objectId,
    dept: objectId,
    batchSection: objectId,
    subject: objectId,
    semester: objectId,
    weekday: z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]),
    timeSlot: z.array(objectId).min(1, { message: "At least one time slot must be selected" }).max(2, { message: "At most three time slots can be selected" }),
    room: z
        .string()
        .min(3, { message: "Room must be at least 3 characters" })
        .max(24, { message: "Room must be at most 24 characters" }),
})

const defaultValues = {
    courseTeacher: "",
    dept: "",
    batchSection: "",
    subject: "",
    semester: "",
    weekday: "",
    timeSlot: [],
    room: "",
}

const ScheduleSaveSelects = ({ children, placeholder, label, value, onValueChange, name, displayInfo }) => {
    return (
        <div>
            <label className="block text-base font-bold pb-5">{label}</label>
            <Select
                onValueChange={(value) => onValueChange(value, name)}
                defaultValue={value}
                className="capitalize"
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {children}
                </SelectContent>
            </Select>
            {displayInfo && displayInfo}
        </div>
    )
}

const ScheduleForm = ({semesterId, id, data}) => {

    const { department } = OtherStore()

    const [subjects, setSubjects] = useState([])
    const [teachers, setTeachers] = useState([])
    const [batches, setBatches] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [batchSections, setBatchSections] = useState([])

    // extra info
    const [info, setInfo] = useState({
        scheduleOfBatch: null,
        subjectOfWhichDept: null,
    })
    const [schedule, setSchedule] = useState({ ...defaultValues })


    // set default values when id is not null
    useEffect(() => {
        if (!id) return
        setInfo({
            scheduleOfBatch: data?.batchSection?.batch?._id,
            subjectOfWhichDept: data?.subject?.dept?._id,
        })
        setSchedule({
            courseTeacher: data?.courseTeacher?._id,
            dept: data?.dept?._id,
            batchSection: data?.batchSection?._id,
            subject: data?.subject?._id,
            semester: data?.semester?._id,
            weekday: data?.weekday,
            timeSlot: data?.timeSlot?.map(slot => slot._id),
            room: data?.room || "",
        })
    }, [])

    // get form options to create a schedule
    useEffect(() => {
        // get batches
        const fetchBatches = async () => {
            if (batches.length > 0) return
            const result = await apiHandler(
                { url: `${administrationRoutes.batch}?limit=80`, method: GET }
            )
            if (!result) return
            setBatches(result?.batch)
        }
        fetchBatches()

        // get sections
        if (!info.scheduleOfBatch || !schedule.dept) return
        const fetchBatchSections = async () => {
            const result = await apiHandler(
                { url: `${administrationRoutes.sections}?dept=${schedule.dept}&batch=${info.scheduleOfBatch}`, method: GET }
            )
            if (!result) return
            setBatchSections(result?.sections)
        }
        fetchBatchSections()

        // get teachers
        if (!info.subjectOfWhichDept) return
        const fetchTeachers = async () => {
            const result = await apiHandler(
                { url: `${administrationRoutes.teachers}?dept=${info.subjectOfWhichDept}`, method: GET }
            )
            if (!result) return
            setTeachers(result?.users)
        }
        fetchTeachers()

        // get subjects
        const fetchSubjects = async () => {
            const result = await apiHandler(
                { url: `${administrationRoutes.subjects}?dept=${info.subjectOfWhichDept}`, method: GET }
            )
            if (!result) return
            setSubjects(result?.subjects)
        }
        fetchSubjects()

        // get time slots
        const fetchTimeSlots = async () => {
            const result = await apiHandler(
                { url: `${administrationRoutes.timeSlot}`, method: GET }
            )
            if (!result) return
            setTimeSlots(result?.timeSlots)
        }
        fetchTimeSlots()
    }, [schedule.dept, info.scheduleOfBatch, info.subjectOfWhichDept])

    // only for schedule state
    const handleOptionChange = (value, name) => {
        setSchedule(prev => ({ ...prev, [name]: value }))
    }

    // dept options
    const deptOptions = department?.map((dept, index) => {
        return (
            <SelectItem key={index} value={dept._id}>
                {dept.shortName}
            </SelectItem>
        )
    })


    return (
        <div className="card-grid-layout">

            {/* department for schedule */}
            <ScheduleSaveSelects
                placeholder={"Select Department"}
                label={"Department"}
                name={"dept"}
                value={schedule.dept}
                onValueChange={handleOptionChange}
            >
                {deptOptions}
            </ScheduleSaveSelects>
            {/* batch for schedule */}
            <ScheduleSaveSelects
                placeholder={"Select Batch"}
                label={"Batch"}
                value={info.scheduleOfBatch}
                onValueChange={(value) => {
                    setInfo(prev => ({ ...prev, scheduleOfBatch: value }))
                }}
            >
                {
                    batches?.map((batch, index) => (
                        <SelectItem key={index} value={batch._id}>
                            {batch.name}
                        </SelectItem>
                    ))
                }
            </ScheduleSaveSelects>
            {/* sections */}
            <ScheduleSaveSelects
                placeholder={"Select Section"}
                label={"Section"}
                name={"batchSection"}
                value={schedule.batchSection}
                onValueChange={handleOptionChange}
            >
                {
                    batchSections?.map((section, index) => (
                        <SelectItem key={index} value={section._id}>
                            {section.section} - {section.shift}
                        </SelectItem>
                    ))
                }
            </ScheduleSaveSelects>
            {/* department of subject */}
            <ScheduleSaveSelects
                placeholder={"Select Department of Subject"}
                label={"Department of Subject"}
                value={info.subjectOfWhichDept}
                onValueChange={(value) => {
                    setInfo(prev => ({ ...prev, subjectOfWhichDept: value }))
                }}
            >
                {deptOptions}
            </ScheduleSaveSelects>
            {/* subjects */}
            <ScheduleSaveSelects
                placeholder={"Select Subject"}
                label={"Subject"}
                name={"subject"}
                value={schedule.subject}
                onValueChange={handleOptionChange}
            >
                {
                    subjects?.map((subject, index) => (
                        <SelectItem key={index} value={subject._id}>
                            {subject.name} - {subject.code}
                        </SelectItem>
                    ))
                }
            </ScheduleSaveSelects>
            {/* teacher */}
            <ScheduleSaveSelects
                placeholder={"Select Teacher"}
                label={"Teacher"}
                name={"courseTeacher"}
                value={schedule.courseTeacher}
                onValueChange={handleOptionChange}
                displayInfo={(() => {
                    const teacherInfo = teachers?.find((teacher) => teacher._id === schedule.courseTeacher)
                    return teacherInfo ? (
                        <div className="my-2">
                            <DisplayAvatar
                                img={teacherInfo?.image}
                                alt="User image"
                            >
                                <h3 className="text-base">{teacherInfo?.name}</h3>
                                <p className="text-sm text-gray-400">{teacherInfo?.personalId}</p>

                            </DisplayAvatar>
                        </div>
                    ) : null
                })()}
            >
                {
                    teachers?.map((teacher, index) => (
                        <SelectItem key={index} value={teacher._id}>
                            {teacher.name} - {teacher.personalId}
                        </SelectItem>
                    ))
                }
            </ScheduleSaveSelects>
            {/* weekday */}
            <ScheduleSaveSelects
                placeholder={"Select Weekday"}
                label={"Weekday"}
                name={"weekday"}
                value={schedule.weekday}
                onValueChange={handleOptionChange}
            >
                <SelectItem value={"Monday"}>Monday</SelectItem>
                <SelectItem value={"Tuesday"}>Tuesday</SelectItem>
                <SelectItem value={"Wednesday"}>Wednesday</SelectItem>
                <SelectItem value={"Thursday"}>Thursday</SelectItem>
                <SelectItem value={"Friday"}>Friday</SelectItem>
                <SelectItem value={"Saturday"}>Saturday</SelectItem>
                <SelectItem value={"Sunday"}>Sunday</SelectItem>
            </ScheduleSaveSelects>
            {/* time slot */}
            <ScheduleSaveSelects
                placeholder={"Select Time Slot"}
                label={"Time Slot"}
                name={"timeSlot"}
                value={schedule.timeSlot[0]}
                onValueChange={(value) => {
                    setSchedule(prev => {
                        if (prev.timeSlot.includes(value)) {
                            return {
                                ...prev,
                                timeSlot: prev.timeSlot.filter((timeSlot) => timeSlot !== value)
                            }
                        }

                        if (prev.timeSlot.length < 3) {
                            return {
                                ...prev,
                                timeSlot: [...prev.timeSlot, value]
                            }
                        }
                    })
                }}

                displayInfo={
                    schedule.timeSlot.map((timeSlot, index) => {
                        const match = timeSlots.find((t) => t._id === timeSlot);
                        return match ? <p key={index} className="text-center bg-primary text-white rounded-md py-2 my-2">{match.slot}</p> : null;
                    })
                }
            >
                {
                    timeSlots?.map((timeSlot, index) => (
                        <SelectItem key={index} value={timeSlot._id}>
                            {timeSlot.slot}
                        </SelectItem>
                    ))
                }
            </ScheduleSaveSelects>
            {/* room */}
            <div>
                <label className="block text-base font-bold pb-5">Room</label>
                <Input
                    type="text"
                    placeholder="Room"
                    className="capitalize"
                    value={schedule.room}
                    onChange={(e) => {
                        setSchedule(prev => ({ ...prev, room: e.target.value }))
                    }}
                />
            </div>

            {/* submit button */}
            <Button
                size="lg"
                className="mt-10"
                onClick={async () => {
                    const scheduleFormData = { ...schedule, semester: semesterId }
                    const data = scheduleSchema.safeParse(scheduleFormData)
                    if (!data.success) {
                        return data?.error.issues.map((issue) => errorToast(issue.message))
                    }
                    const result = await apiHandler(
                        { url: `${administrationRoutes.schedule}/${id ? id : ""}`, method: id ? PATCH : POST },
                        data.data,
                        true
                    )
                    if (!result) return
                    setSchedule({ ...defaultValues })
                }}
            >
                Save
            </Button>

        </div>
    )
}

export default ScheduleForm