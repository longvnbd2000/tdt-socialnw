import * as React from 'react'
import { MoreVert, ThumbUpAlt, Comment, Settings} from '@mui/icons-material'
import { IconButton, MenuItem, Menu, ListItemIcon, Divider} from '@mui/material'
import './Post.css'
import { useState, useEffect } from "react";
import axios from 'axios'


export default function Post({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(process.env.REACT_APP_SV_HOST + '/users/' + post.userId)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    return (
        <div className="post">
            <div className="post-top">
                <div className="post-top-left">
                    <img src={PF+user.avatar} alt="" className="post-top-avatar" />
                    <div className="post-top-user">
                        <p className="post-top-user-name">{user.username}</p>
                        <p className="post-top-user-time">5 mins ago</p>
                    </div>
                </div>
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
                        <span className="post-bottom-count-text">200</span> 
                    </div>
                    <div className="post-bottom-count-comments">
                        200 comments
                    </div>
                </div>
                <hr />
                <div className="post-bottom-item">
                    <div className="post-bottom-like-comment">
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
