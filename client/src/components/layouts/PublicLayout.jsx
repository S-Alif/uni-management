import Navbar from "../navs/Navbar"


const PublicLayout = ({children}) => {
    return (
        <div className="w-full min-h-screen">

            {/* public navbar */}
            <Navbar />

            <main>
                {children}
            </main>
        </div>
    )
}

export default PublicLayout