import SectionPage from "@/components/SectionPage"
import PublicPageLayout from "./public/components/layouts/PublicPageLayout"
import UserStore from "@/stores/UserStore"
import DisplayDialog from "@/components/DisplayDialog"
import { useEffect, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { NavLink, useNavigate, useParams } from "react-router"
import { administrationRoutes, GET, PATCH, publicRoutes } from "@/utils/api/apiConstants"
import apiHandler from "@/utils/api/apiHandler"
import SectionDashboard from "@/components/SectionDashboard"
import { PencilLine } from "lucide-react"
import RichTextEditor from "@/components/RichTextEditor/Index"


const UserPublicProfile = ({role}) => {

    const {user} = UserStore()
    const [dialogOpen, setDialogOpen] = useState(role == 1999 && !user)
    const navigate = useNavigate()
    const params = useParams()

    const handleNotLoggedIn = () => {
        if(user) setDialogOpen(false)
        setDialogOpen(true)
    }

    // for student profiles
    if(dialogOpen){
        return (
            <DisplayDialog
                heading={"Please Login"}
                description={"You must login to access this page"}
                openState={setDialogOpen}
                setOpenstate={handleNotLoggedIn}
            >
                <div className="flex justify-end gap-4">
                    <Button
                        size="lg"
                        onClick={() => navigate(-1, {replace: true})}
                    >
                        Go Back
                    </Button>
                    <NavLink
                        to="/auth/login"
                        className={buttonVariants({size: "lg", variant: "blue"})}
                    >
                        Login
                    </NavLink>
                </div>

            </DisplayDialog>
        )
    }

    const [userData, setUserData] = useState(null)
    const [about, setAbout] = useState("") // only used when admin is viewing the profile of a user

    useEffect(() => {
        (async () => {
            let url = `${publicRoutes.teacherProfile.url}/${params.id}`
            if (role == 1999) url = `${publicRoutes.studentProfile.url}/${params.id}`

            const result = await apiHandler({ url: url, method: GET }, {})
            if(!result) return
            setUserData(result)
        })()
    }, [])

    return (
        <PublicPageLayout
            pageId="user-public-profile"
            header={false}
        >
            <SectionPage
                id="user-profile"
                sectionTitle={`${role == 2022 ? "Teacher" : "Student"} Profile`}
            >
                <div className="flex flex-col lg:flex-row gap-10 mt-10 items-center">
                    <div className="lg:sticky lg:top-0 aspect-square rounded-md overflow-hidden shadow-md shrink-0 mx-auto max-w-[450px]">
                        <img src={userData?.image} alt="user image" className="w-full h-full object-cover object-center" />
                    </div>

                    <div className="grow">
                        <h3 className="pb-4 border-b border-b-primary font-bold text-2xl">Personal Informations</h3>
                        <div className="pt-6">
                            <p className="text-base xl:text-lg pb-2"><span className="font-bold">Name:</span> {userData?.name}</p>
                            {
                                role == 1999 || user?.role == 2025 && (
                                    <p className="text-base xl:text-lg pb-2"><span className="font-bold">Personal ID:</span> {userData?.personalId}</p>
                                )
                            }
                            <p className="text-base xl:text-lg pb-2"><span className="font-bold">Email:</span> {userData?.email}</p>
                            <p className="text-base xl:text-lg pb-2"><span className="font-bold">Phone:</span> +{userData?.phone}</p>
                            <p className="text-base xl:text-lg pb-2"><span className="font-bold">Gender:</span> {userData?.gender}</p>
                            <p className="text-base xl:text-lg pb-2"><span className="font-bold">Department:</span> {userData?.dept?.name} ({userData?.dept?.shortName})</p>
                            {
                                role == 1999 && (
                                    <>
                                        <p className="text-base xl:text-lg pb-2"><span className="font-bold">Batch:</span> {userData?.batch?.name}</p>
                                        <p className="text-base xl:text-lg pb-2"><span className="font-bold">Section:</span> {userData?.section?.section}</p>
                                        <p className="text-base xl:text-lg pb-2"><span className="font-bold">Shift:</span> {userData?.section?.shift}</p>
                                    </>
                                )
                            }
                            {
                                role == 2022 && (
                                    <p className="text-base xl:text-lg pb-2"><span className="font-bold">Designation:</span> {userData?.teacherDesignation}</p>
                                )
                            }
                            <p className="text-base xl:text-lg pb-2"><span className="font-bold">Address:</span> {userData?.address}</p>
                        </div>
                    </div>
                </div>

            </SectionPage>

            {/* about */}
            {
                user?.role !== 2025 ? (
                    <SectionPage
                        sectionTitle="About"
                        id="about"
                        sectionClassName="bg-primary/25"
                    >
                        {
                            userData?.about ?
                                <div className="detail-content" dangerouslySetInnerHTML={{ __html: userData?.about }} />
                                : <p className="pt-5 text-xl">No about information found</p>
                        }

                    </SectionPage>
                ) :
                <SectionDashboard
                    sectionTitle="About"
                    id="about"
                    sectionClassName="bg-primary/25 public-section-layout"
                    wrapperClassName="container"
                    headerSideOptions={
                        <DisplayDialog
                            trigger={
                                <Button size="icon"><PencilLine /></Button>
                            }
                            heading={"About"}
                            dialogClassName="lg:max-w-[900px] lg:!max-h-[700px] xl:max-w-[1100px]"
                        >
                            <RichTextEditor 
                                defaultValue={userData?.about ? userData?.about : "Write something"}
                                onChange={setAbout}
                            />
                            <Button
                                size="lg"
                                onClick={async () => {
                                    console.log(about)
                                    const url = `${administrationRoutes.user}/${userData?._id}`
                                    const data = {
                                        ...userData,
                                        about: about,
                                        dept: userData?.dept?._id,
                                    }
                                    delete data["updatedAt"]
                                    delete data["createdAt"]
                                    delete data["personalId"]
                                    const result = await apiHandler(
                                        {url: url, method: PATCH},
                                        data,
                                        true
                                    )
                                    if(!result) return
                                    setUserData(result)
                                }}
                            >
                                Save
                            </Button>

                        </DisplayDialog>
                    }
                >
                    {
                        userData?.about ? 
                        <div className="detail-content" dangerouslySetInnerHTML={{__html: userData?.about}} /> 
                        : <p className="pt-10 text-xl">No about information found</p>
                    }

                </SectionDashboard>
            }

        </PublicPageLayout>
    )
}

export default UserPublicProfile