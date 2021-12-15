import * as React from 'react'
import {useState, useEffect} from 'react'
import './Profile.css'
import axios from 'axios'

// Dialog
import {Edit} from '@mui/icons-material';
import {Avatar, Button, TextField, Dialog,
    IconButton, DialogActions,DialogContent,DialogContentText,
    DialogTitle,Tooltip,Box, InputLabel, MenuItem, FormControl, 
    Select,} from '@mui/material/'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
export default function Profile({emailname}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false)
    const [avt, setAvt] = useState({ profileImage:PF+user.avatar})
    const [major, setMajor] = useState('')
    const [date, setDate] = useState(null)
    const {profileImage} = avt

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
          },
        },
    };

    useEffect(() => {
        let isActive = true
        const fetchUser = async () => {
            const res = await axios.get(process.env.REACT_APP_SV_HOST + '/users?emailname=' + emailname)
            if (isActive) {
                setUser(res.data)
            }
        }
        fetchUser()
        return () => isActive = false
    }, [emailname])

    const clickOpen = () => {
        setOpen(true)
    }
    const clickClose = () => {
        setOpen(false)
    }

    const fileSelected = event => {
        console.log(event.target.files[0]);
    }

    const imageHandler = event => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvt({profileImage: reader.result})
            }else{
                setAvt({profileImage: PF+user.avatar})
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }

    const handleChangeMajor = (event) => {
        setMajor(event.target.value);
      };
    return (
        <div>
            <div className="profile">
                <div className="profile-cover">
                    <img src={PF+user.background} alt="" className="profile-cover-background" />
                    <img src={PF+user.avatar} alt="" className="profile-cover-avatar" />
                </div>
                <div className="profile-user">
                    <h2 className="profile-user-name">{user.username}</h2>
                    <Tooltip title="Click to update profile">
                        <IconButton onClick={clickOpen}>
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={clickOpen}>
                        <DialogTitle>Cập nhật thông tin</DialogTitle>
                          
                            <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={imageHandler} />
                            <label htmlFor="icon-button-file" style={{ width: '100%', textAlign: 'center' }}>
                                <IconButton component="span" >
                                    <Avatar
                                        src={profileImage} 
                                        style={{ margin: "10px", width: "200px", height: "200px",}} 
                                    />
                                </IconButton>
                            </label>
                            <DialogContent>
                                <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                                }}
                                autoComplete="off"
                                >
                                    <div>
                                        <TextField required id="outlined-required" label="Tên" defaultValue={user.username}/>
                                        <TextField id="outlined-required" label="Lớp" defaultValue="18050402"/>
                                        <FormControl sx={{m: 2, width: '25ch'}}>
                                            <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={major}
                                                label="Khoa"
                                                onChange={handleChangeMajor}
                                                MenuProps={MenuProps}
                                                >
                                                    <MenuItem value={'CNTT'}>CNTT</MenuItem>
                                                    <MenuItem value={'duoc'}>Dược</MenuItem>
                                                    <MenuItem value={'dientu'}>Điện - điện tử</MenuItem>
                                                    <MenuItem value={'giaoducquocte'}>Giáo dục quốc tế</MenuItem>
                                                    <MenuItem value={'ketoan'}>Kế toán</MenuItem>
                                                    <MenuItem value={'khthethao'}>Khoa học thể thao</MenuItem>
                                                    <MenuItem value={'khungdung'}>Khoa học ứng dụng</MenuItem>
                                                    <MenuItem value={'khxhvnv'}>Khoa học xã hội và nhân văn</MenuItem>
                                                    <MenuItem value={'kythuatcongtrinh'}>Kỹ thuật công trình</MenuItem>
                                                    <MenuItem value={'laodongvacongdoan'}>Lao động và công đoàn</MenuItem>
                                                    <MenuItem value={'luat'}>Luật</MenuItem>
                                                    <MenuItem value={'moitruong'}>Môi trường và bảo hộ lao động</MenuItem>
                                                    <MenuItem value={'mythuat'}>Mỹ thuật công nghiệp</MenuItem>
                                                    <MenuItem value={'ngoaingu'}>Ngoại ngữ</MenuItem>
                                                    <MenuItem value={'qtkd'}>Quản trị kinh doanh</MenuItem>
                                                    <MenuItem value={'tcnh'}>Tài chính - ngân hàng</MenuItem>
                                                    <MenuItem value={'toanthongke'}>Toán - thống kê</MenuItem>
                                                </Select>
                                        </FormControl>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Ngày/Tháng/Năm sinh"
                                                value={date}
                                                onChange={(newValue) => {
                                                setDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={clickClose}>Hủy</Button>
                                <Button onClick={clickClose} type='submit'  >Cập nhật</Button>
                            </DialogActions>
                        </Dialog>
                    <div className="profile-user-email">{user.email}</div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-left">
                        <div className="profile-info-text">Khoa Công nghệ thông tin</div>
                        <div className="profile-info-text">Lớp: 18050203</div>
                    </div>
                    <div className="profile-info-right">
                        <div className="profile-info-text">Ngay sinh</div>
                        <div className="profile-info-text">Noi o</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

                           
                            
                    