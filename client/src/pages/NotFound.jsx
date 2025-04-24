import { Button } from "@/components/ui/button"
import { SearchX } from "lucide-react"
import { useNavigate } from "react-router"


const NotFound = () => {

    const navigate = useNavigate()

    return (
        <section className="w-full min-h-screen">
            <div className="container">
                <div className="flex mt-20 justify-center items-center flex-col">
                    <div className="image">
                        <SearchX size={200} color="gray" />
                    </div>
                    <h1 className="pt-10 text-destructive text-5xl">404</h1>
                    <p className="text-xl text-center py-5">Page not found</p>
                    <Button size="lg" variant="secondary" onClick={() => navigate(-1)}>Go back</Button>
                </div>
            </div>
        </section>
    )
}

export default NotFound