import React from 'react'
import './Announcements.css'
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function Announcements() {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div className="announcements">
            <ul className="announcements-list">
                <li className="announcements-list-item" onClick={handleClickOpen()}>
                    <div className="announcements-list-item-title">title title title title title title</div>
                    <div className="announcements-list-item-text">dfdsfddsfdffafdsfdfsd</div>
                    <div className="announcements-list-item-bottom">
                        <div className="announcements-list-item-faculty">Khoa Cong nghe thong tin</div>
                        <div className="announcements-list-item-date">10/8/2021</div>
                    </div>  
                </li>
                <li className="announcements-list-item" onClick={handleClickOpen()}>
                    <div className="announcements-list-item-title">title title title title title title</div>
                    <div className="announcements-list-item-text">dfdsfddsfdffafdsfdfsd</div>
                    <div className="announcements-list-item-bottom">
                        <div className="announcements-list-item-faculty">Khoa Cong nghe thong tin</div>
                        <div className="announcements-list-item-date">10/8/2021</div>
                    </div>  
                </li>
                
            </ul>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {[...new Array(50)]
                    .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                    )
                    .join('\n')}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
