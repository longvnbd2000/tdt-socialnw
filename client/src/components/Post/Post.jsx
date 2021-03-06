import * as React from 'react'
import { MoreVert, ThumbUpAlt, Comment, Settings, Send, Replay} from '@mui/icons-material'
import { IconButton, MenuItem, Menu, ListItemIcon, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField} from '@mui/material'
import './Post.css'
import { useState, useEffect, useContext, useRef } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'timeago.js'
import { PostContext } from '../../context/PostContext';
import Comments from '../Comment/Comments'


export default function Post({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const SV = process.env.REACT_APP_SV_HOST

    const { user } = useContext(AuthContext)
    const { posts, dispatch } = useContext(PostContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [openDelConfirm, setOpenDelConfirm] = useState(false);
    const handleClickOpenDelConfirm = () => {
        setOpenDelConfirm(true);
    };
    
    const handleCloseDelConfirm = () => {
        setOpenDelConfirm(false);
    };

    const [openUpdatePost, setOpenUpdatePost] = useState(false);
    const handleClickOpenUpdatePost = () => {
        setOpenUpdatePost(true);
    };
    
    const handleCloseUpdatePost = () => {
        setOpenUpdatePost(false);
    };

    const [userPost, setUserPost] = useState({})
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(0)
    const [isActive, setIsActive] = useState(false)

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
            const cmts = await axios.get(SV + '/comments/' + post._id)
            console.log(cmts.data)
            cmts.data.map(async (cmt) => {
                const user = await axios.get(SV + '/users?userId=' + cmt.userId)
                
                await axios.post(SV + '/comments/' + cmt._id, {userId: user.data._id})
            })
            await axios.post(SV + '/posts/' + post._id, {userId: user._id})
            dispatch({type: "POST_SUCCESS", payload: posts.filter(p => p._id !== post._id)})
        }
        catch(err){
            console.log(err)
        }
    }

    const [postText, setPostText] = useState("")
    const updateHandle = async () => {
        try{   
            const postToUpdate = post
            
            postToUpdate.text = postText
            
            const updatedPost = await axios.put(SV + '/posts/' + post._id, postToUpdate)
            console.log(updatedPost.data)
            const payload = posts.map(p => {
                if(p._id === updatedPost.data._id){
                    return updatedPost.data
                }
                else return p
            })
            console.log(payload)
            dispatch({type: "POST_SUCCESS", payload: payload})
        }
        catch(err){
            console.log(err)
        }
    }
    

    const fetchComment = async () => {
        if(page === 0){
            return () => console.log('No cmts')
        }
        try{
            const res = await axios.get(SV + '/comments/pid/' + post._id + '/page/' + page)
            res.data.sort((a, b) => a.createdAt - b.createdAt ? 1 : -1)
            const ps = [ ...res.data, ...comments]
            const payload = ps.filter((object,index) => index === ps.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))
            setComments(payload)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        fetchComment()
    }, [page])

    const loadCmtHanlde = () => {
        if(comments.length < post.comments.length || comments.length > post.comments.length){
            setPage(page + 1)
        }
    }
    const reloadCmtHanlde = () => {
        if(page > 1){
            setComments([])
            setPage(1)
        }
        else if(page === 1){
            setComments([])
            fetchComment()
        }
    }

    const openCmtHandle = () => {
        setIsActive(true)
        loadCmtHanlde()
        document.getElementById(post._id).focus()
    }

    const commentRef = useRef('')
    const commentHandle = async (e) => {
        e.preventDefault()
        if(commentRef.current.value !== ''){
            const newCmt = {
                userId: user._id,
                postId: post._id,
                text: commentRef.current.value
            }

            try{
                const res = await axios.post(SV + '/comments/', newCmt)
                console.log(res.data)
                setComments([...comments, res.data])
            }
            catch(err){

            }
            commentRef.current.value = ''
        }
        else{
           
        }
    }

    return (

        <div className="post">
            <Dialog open={openDelConfirm} onClose={handleCloseDelConfirm}>
                <DialogTitle>X??c nh???n x??a b??i vi???t</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        B??i vi???t sau khi x??a s??? kh??ng th??? kh??i ph???c. B???n c?? ch???c ch???n mu???n x??a b??i vi???t n??y? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteHandle}>X??c nh???n</Button>
                    <Button onClick={handleCloseDelConfirm}>H???y</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openUpdatePost} onClose={handleCloseUpdatePost}>
                <DialogTitle>C???p nh???t th??ng tin</DialogTitle>

                <DialogContent>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: 500, maxWidth: '100%', },
                    }}
                    autoComplete="off"
                    >
                        <TextField required id="outlined-required" defaultValue={post.text}  onChange={e => setPostText(e.target.value)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateHandle} type='submit'>C???p nh???t</Button>
                    <Button onClick={handleCloseUpdatePost} >H???y</Button>
                </DialogActions>
            </Dialog>

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
                    onClick={handleClose}
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
                    ?
                    <MenuItem onClick={handleClickOpenDelConfirm}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    X??a b??i vi???t
                    </MenuItem>     
                    : null
                    }
                    
                    {user._id === post.userId 
                    ?
                    <MenuItem onClick={handleClickOpenUpdatePost}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    S???a b??i vi???t
                    </MenuItem>
                    
                    : null
                    }
            
                    
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    B??o c??o
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
                        {post.comments.length + ' comments'} 
                    </div>
                </div>
                <hr />
                <div className="post-bottom-item">
                    <div className="post-bottom-like-comment" onClick={likeClickHandle}>
                        <ThumbUpAlt style={{ fill: 'rgb(58, 174, 252)' }}/>
                        <span className="post-bottom-like-comment-text">Th??ch</span>
                    </div>
                    <div className="post-bottom-like-comment" onClick={openCmtHandle}>
                        <Comment/>
                        <span className="post-bottom-like-comment-text">B??nh lu???n</span>
                    </div>
                </div>
                <hr />
            </div>
            <div className="post-comments">
                <div className="post-load-comments">
                    <p className='post-load-comments-text' onClick={reloadCmtHanlde}>T???i l???i <Replay className='load-comments-icon' /></p>
                    <p className='post-load-comments-text' onClick={loadCmtHanlde}><Replay className='load-comments-icon' /> T???i</p>
                </div>
                {comments.map((comment) => (
                    <Comments key={comment._id} comment={comment} />
                ))}
                

                <form className={'post-send-comment ' + (isActive ? 'active' : '')} onSubmit={commentHandle}>
                    <img src={PF+user.avatar} alt="" className="comment-avatar" />
                    <div className="comment-input">
                        <input type="text" placeholder='Nh???p b??nh lu???n' id={post._id} ref={commentRef} />
                    </div>
                    
                    <button type='submit' className='comment-input-btn'><Send /></button>
                </form>
            </div>


        </div>

        
    )
}
