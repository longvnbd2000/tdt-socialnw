import './Comments.css'
import { MoreHoriz, Settings } from '@mui/icons-material'
import { IconButton, MenuItem, Menu, ListItemIcon, Divider } from '@mui/material'
import { AuthContext } from '../../context/AuthContext';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

export default function Comments({ comment }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const SV = process.env.REACT_APP_SV_HOST

    const { user } = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [userComment, setUserComment] = useState({})

    useEffect(() => {
        let isActive = true
        const fetchUser = async () => {
            const res = await axios.get(SV + '/users?userId=' + comment.userId)
            if (isActive) {
                setUserComment(res.data)
            }
        }
        fetchUser()
        return () => isActive = false
    }, [comment.userId])

    return (
        <>
            <div className="comment-container">
                <div className="comment">
                    <div className="comment-left">
                        <img src={PF+userComment.avatar} alt="" className="comment-avatar" />
                    </div>
                    <div className="comment-center">
                        <div className="comment-name">
                            {userComment.username}
                        </div>
                        <div className="comment-text">{comment.text}</div>
                    </div>
                    <div className="comment-right">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHoriz />
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
                        {user._id === comment.userId 
                        ?
                        <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Delete comment
                        </MenuItem>     
                        : null
                        }
                        
                        {user._id === comment.userId 
                        ?
                        <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Edit comment
                        </MenuItem>
                        
                        : null
                        }
                        <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Report
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
            </div>
        </>
    )
}
