import Profile from "../Profile/Profile";
import Post from "../Post/Post";
import Share from "../Share/Share";
import './Feed.css'
import { useState, useEffect } from "react";
import axios from 'axios'
import { CircularProgress, Fade } from '@mui/material'


export default function Feed({emailname}) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false)

    const SV = process.env.REACT_APP_SV_HOST
    

    const fetchPosts = async () => {
        const res = emailname 
        ? await axios.get(SV + '/posts/profile/emailname/' + emailname + '/page/' + page + '/limit/10') 
        : await axios.get(SV + '/posts/timeline/page/' + page + '/limit/10') 
        const newPosts = posts.concat(res.data)
        if (newPosts.length == posts.length){
            setIsEnd(true)
        }else setPosts(newPosts)
    }


    useEffect(() => {
        
        fetchPosts()
        
    }, [page])

    useEffect(() => {
        window.onscroll = () => {
            let isBottom = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight
            if(isBottom && !isEnd){ 
                setPage(page + 1)
            }
        }
    }, [posts])
    

    const HomeFeed = () => {
        return(
            <>
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
                <Fade
                    in={loading}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </> 
        )
    }

    const ProfileFeed = () => {
        return(
            <>
                <Profile emailname={emailname}/>
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </> 
        )
    }

    return (
        
        <div className="feed">
            <div className="feed-items">
                {emailname ? <ProfileFeed/> : <HomeFeed/>}          
            </div>
        </div>
    )
}
