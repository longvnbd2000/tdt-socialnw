import Profile from "./Profile";
import Post from "./Post";
import Share from "./Share";


export default function Feed({profile}) {
    const HomeFeed = () => {
        return(
            <div>
                <Share/>
                <Post/>
            </div> 
        )
    }

    const ProfileFeed = () => {
        return(
            <div>
                <Profile/>
                <Share/>
                <Post/>
                <Post/>
            </div> 
        )
    }

    return (
        <div className="feed">
            <div className="feed-items">
                <ProfileFeed/>          
            </div>
        </div>
    )
}
