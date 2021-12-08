import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import Share from "../Share/Share";
import './Feed.css'


export default function Feed({profile}) {
    const HomeFeed = () => {
        return(
            <>
                <Share/>
                <Post/>
            </> 
        )
    }

    const ProfileFeed = () => {
        return(
            <>
                <Profile/>
                <Share/>
                <Post/>
                <Post/>
            </> 
        )
    }

    return (
        
        <div className="feed">
            <div className="feed-items">
                {profile ? <ProfileFeed/> : <HomeFeed/>}          
            </div>
        </div>
    )
}
