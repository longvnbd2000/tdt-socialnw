import Post from "./Post";
import Share from "./Share";


export default function Feed() {
    return (
        <div className="feed">
            <div className="feed-items">
                <Share/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}
