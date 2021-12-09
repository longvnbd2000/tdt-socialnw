import Feed from "../components/Feed/Feed"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar/Rightbar"
import Sidebar from "../components/Sidebar/Sidebar"
import { useParams } from "react-router"

export default function Profile() {
    const emailname = useParams().emailname

    return (
        <div>
            <Navbar/>
            <div className="mainContainer">
                <Sidebar/>
                <Feed emailname={emailname} />
                <Rightbar/>
            </div>
        </div>
    )
}
