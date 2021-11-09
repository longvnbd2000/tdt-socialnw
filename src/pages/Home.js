import Feed from "../components/Feed"
import Navbar from "../components/NavBar/Navbar"
import Rightbar from "../components/Rightbar"
import Sidebar from "../components/Sidebar"

export default function Home() {
    return (
        <div>
            <Navbar/>
            <div className="mainContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    )
}
