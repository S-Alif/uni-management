import { NavLink } from "react-router"
import logo2 from "../assets/images/logo2.jpg"

const DisplayLogo = () => {
    return (
        <NavLink to={"/"} className={"flex justify-between items-center gap-2"}>
            <span><img src={logo2} className="w-11 h-11 rounded-md" /></span>
            <span className="text-xl font-bold text-white">Helix. U</span>
        </NavLink>
    )
}

export default DisplayLogo