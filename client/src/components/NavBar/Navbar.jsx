import * as React from 'react'
import {Search, Notifications, Person, Home, NotificationImportant, PersonAdd, Settings, Logout} from '@mui/icons-material'
import {Menu, MenuItem, Avatar, Divider, ListItemIcon, List, ListItemAvatar, ListItemText, Typography, ListItemButton} from '@mui/material'
import './Navbar.css'

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const openE1 = Boolean(anchorEl);
    const openE2 = Boolean(anchorE2);
    const openE3 = Boolean(anchorE3);
    const handleClickE1 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseE1 = () => {
        setAnchorEl(null);
    };

    const handleClickE2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleCloseE2 = () => {
        setAnchorE2(null);
    };

    const handleClickE3 = (event) => {
        setAnchorE3(event.currentTarget);
    };
    const handleCloseE3 = () => {
        setAnchorE3(null);
    };

    return (
        <div className="navbarContainer">
            <div className="navbar-left">
                <div className="logo">TDTU</div>
                <div className="navbar-search">
                    <Search className="navbar-search-icon"/>
                    <input placeholder="Search for people" className="navbar-search-bar" />
                </div>
            </div>
            <div className="navbar-center">
                <div className="navbar-link">
                    <Home/>
                    <div className="navbar-link-text">Homepage</div>
                </div>
                <div className="navbar-link">
                    <NotificationImportant/>
                    <div className="navbar-link-text">Announcement</div>
                </div>
            </div>
            <div className="navbar-right">
                <div className="navbar-icons">
                    <div className="navbar-icons-item" onClick={handleClickE1}>
                        <Person className="navbar-icons-item-icon"/>
                        <span className="navbar-icons-item-badge">1</span>
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        open={openE1}
                        onClose={handleCloseE1}
                        onClick={handleCloseE1}
                        
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflowY: 'scroll',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            height: '90vh',
                            width: '100%', 
                            maxWidth: 360,
                        },
                        }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    >
                        <List sx={{  bgcolor: 'background.paper' }}>
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        </List>
                    </Menu>

                    <div className="navbar-icons-item" onClick={handleClickE3}>
                        <Notifications className="navbar-icons-item-icon"/>
                        <span className="navbar-icons-item-badge">1</span>
                    </div>

                    <Menu
                        anchorEl={anchorE3}
                        open={openE3}
                        onClose={handleCloseE3}
                        onClick={handleCloseE3}
                        
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflowY: 'scroll',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            height: '90vh',
                            width: '100%', 
                            maxWidth: 360,
                        },
                        }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    >
                        <List sx={{  bgcolor: 'background.paper' }}>
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                            />
                        </ListItemButton>
                        </List>
                    </Menu>
                </div>
                <div className="navbar-user" onClick={handleClickE2}>
                    <div className="navbar-user-name">Shun Lung</div>
                    <img src="/assets/avatar/ok.jpg" alt="" className="navbar-avatar" />
                </div>
                
                <Menu
                    anchorEl={anchorE2}
                    open={openE2}
                    onClose={handleCloseE2}
                    onClick={handleCloseE2}
                    className="navbar-user-menu"
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                    <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                    <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
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
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}