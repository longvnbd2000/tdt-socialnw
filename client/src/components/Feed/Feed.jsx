import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import Share from "../Share/Share";
import './Feed.css'
import { useState, useEffect } from "react";
import axios from 'axios'


export default function Feed({profile}) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    const fetchPosts = async () => {
        const res = await axios.get(process.env.REACT_APP_SV_HOST + '/posts/timeline/page/' + page + '/limit/10')
        
        const newPosts = posts.concat(res.data)
        console.log(newPosts)
        setPosts(newPosts)
    }
    useEffect(() => {
        fetchPosts()
    }, [page])
    useEffect(() => {
        window.onscroll = () => {
            let isBottom = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight
            if(isBottom){
                let p = page + 1
                setPage(p)
            }
        }
    }, [])
    

    const HomeFeed = () => {
        return(
            <>
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
                
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
