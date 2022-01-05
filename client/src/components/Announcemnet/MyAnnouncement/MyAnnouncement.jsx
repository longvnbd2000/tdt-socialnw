import {React, useState, useEffect, useContext, useTheme} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Paper, Fab} from '@mui/material';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import parse from 'html-react-parser'
import { format } from 'timeago.js'
import './MyAnnouncement.css'


export default function UserAnnouncement({ announce, index }) {
    const [announcements, setAnnouncements] = useState({})
    const {user} = useContext(AuthContext)
    const SV = process.env.REACT_APP_SV_HOST

    const [openDelConfirm, setOpenDelConfirm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);

    const handleClickOpenDelConfirm = () => {
        setOpenDelConfirm(true);
    };
    
    const handleCloseDelConfirm = () => {
        setOpenDelConfirm(false);
    };

    const handleClickOpenDetail = () => {
        setOpenDetail(true);
    };
    
    const handleCloseDetail = () => {
        setOpenDetail(false);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    useEffect(() => {
        let isActive = true
        const fetchUser = async () => {
            const res = await axios.get(SV + '/users?userId=' + announce.userId)
            if (isActive) {
                setAnnouncements(res.data)
            }
        }
        fetchUser()
        return () => isActive = false
    }, [announce.userId])

    const deleteHandle = async () => {
        try{
            await axios.post(SV + '/announcements/' + announce._id, {userId: user._id})
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>     
            <StyledTableRow
            key={announce._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope="row">
                    {index}
                </StyledTableCell>
                <StyledTableCell sx={{ maxWidth:250}} component="th" scope="row">
                    {announce.title}
                </StyledTableCell>
                <StyledTableCell align="left">{announce.type}</StyledTableCell>
                <StyledTableCell align="left">{announce.faculty}</StyledTableCell>
                <StyledTableCell align="left">{format(announce.updatedAt)}</StyledTableCell>
                <StyledTableCell align="left">
                    <Button onClick={handleClickOpenDetail} variant="outlined" >Detail</Button>
                    <Button variant="outlined" sx={{ml: 2}} color="error" onClick = {handleClickOpenDelConfirm}>Delete</Button>
                </StyledTableCell>
            </StyledTableRow>

            {/* Delete Dialog */}
            <Dialog open={openDelConfirm} onClose={handleCloseDelConfirm}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            Do you want to delete this announcement?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteHandle}>Confirm</Button>
                    <Button onClick={handleCloseDelConfirm}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Detail Dialog */}
            <Dialog open={openDetail} onClose={handleCloseDetail}>
                <DialogTitle>{announce.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            {parse(announce.text)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Confirm</Button>
                    <Button onClick={handleCloseDetail}>Cancel</Button>
                </DialogActions>
            </Dialog>    
        </>
    )
}

