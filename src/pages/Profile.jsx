import Feed from "../components/Feed/Feed"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar/Rightbar"
import Sidebar from "../components/Sidebar/Sidebar"

export default function Profile() {
    return (
        <div>
            <Navbar/>
            <div className="mainContainer">
                <Sidebar/>
                <Feed profile/>
                <Rightbar/>
            </div>
        </div>
    )
}
