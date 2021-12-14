import * as React from 'react'
import { MoreVert, ThumbUpAlt, Comment, Settings} from '@mui/icons-material'
import { IconButton, MenuItem, Menu, ListItemIcon, Divider, CircularProgress} from '@mui/material'
import './Post.css'
import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js'
import { PostContext } from '../../context/PostContext';


export default function Post({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const SV = process.env.REACT_APP_SV_HOST

    const { user } = useContext(AuthContext)
    const { posts, dispatch } = useContext(PostContext)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [userPost, setUserPost] = useState({})
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id))
    }, [user._id, post.likes])

    useEffect(() => {
        let isActive = true
        const fetchUser = async () => {
            const res = await axios.get(SV + '/users?userId=' + post.userId)
            if (isActive) {
                setUserPost(res.data)
                setLikes(post.likes.length)
            }
        }
        fetchUser()
        return () => isActive = false
    }, [post.userId])


    const likeClickHandle = async () => {
        try{
            await axios.put(SV + '/posts/' + post._id + '/like', {userId: user._id})
        }
        catch(err){

        }
        setLikes(!isLiked ? likes + 1 : likes - 1)
        setIsLiked(!isLiked)
    }

    const deleteHandle = async () => {
        try{
            await axios.post(SV + '/posts/' + post._id, {userId: user._id})
            dispatch({type: "POST_SUCCESS", payload: posts.filter(p => p._id !== post._id)})
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="post">
            <div className="post-top">
                <Link to={'/profile/' + userPost.emailname}>
                <div className="post-top-left">
                    {userPost.avatar ? <img src={PF+userPost.avatar} alt="" className="post-top-avatar" /> : <CircularProgress />}
                    <div className="post-top-user">
                        <p className="post-top-user-name">{userPost.username}</p>
                        <p className="post-top-user-time">{format(post.createdAt)}</p>
                    </div>
                </div>
                </Link>
                <div className="post-top-right">
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: 60 * 4.5,
                        width: '30ch',
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {user._id === post.userId 
                    ?<MenuItem onClick={deleteHandle}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Delete post
                    </MenuItem>
                    : null
                    }
                    
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                    </MenuItem>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>
                    <Divider/>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Add another account
                    </MenuItem>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                    </MenuItem>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>

                </Menu>
                </div>
            </div>

            <div className="post-center">
                <div className="post-center-text">
                    {post.text}
                </div>
                {post.img ? <img src={PF+post.img} alt="" className="post-center-media" /> : null}
                
            </div>

            <div className="post-bottom">
                <div className="post-bottom-count">
                    <div className="post-bottom-count-like">
                        <ThumbUpAlt className="post-bottom-count-icon"/>
                        <span className="post-bottom-count-text">{likes}</span> 
                    </div>
                    <div className="post-bottom-count-comments">
                    20 comments
                    </div>
                </div>
                <hr />
                <div className="post-bottom-item">
                    <div className="post-bottom-like-comment" onClick={likeClickHandle}>
                        <ThumbUpAlt/>
                        <span className="post-bottom-like-comment-text">Like</span>
                    </div>
                    <div className="post-bottom-like-comment">
                        <Comment/>
                        <span className="post-bottom-like-comment-text">Comment</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
