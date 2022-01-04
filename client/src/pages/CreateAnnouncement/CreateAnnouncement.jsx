import {React, useState, useRef, useContext, useEffect} from 'react'
import Navbar from '../../components/NavBar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import {useDropzone} from 'react-dropzone'
import './CreateAnnouncement.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext';
import {Alert, IconButton, Collapse} from '@mui/material';
import { SocketContext } from '../../context/SocketContext'
import {CloseIcon, ArrowBack} from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function CreateAnnouncement() {
    const SV = process.env.REACT_APP_SV_HOST;
    const {user} = useContext(AuthContext);
    const {socket} = useContext(SocketContext)

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const [text, setText] = useState('');
    const [multipleFiles, setMultipleFiles] = useState('');
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    
    const titleRef = useRef()
    const detailRef = useRef()
    const typeRef = useRef()
    const facultyRef = useRef()
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        console.log(errorMessage)
    }, [errorMessage])

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    
    const richText = (event, editor) => {
        const data = editor.getData();
        setText(data)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const detail = text
        const type = typeRef.current.value;
        const faculty = facultyRef.current.value;

         // console.log({title, detail, type, faculty});
        if(title === "" || title === null){
            setErrorMessage("Enter the title");
            setFail(true)
            return false
        }

        if(detail === "" || detail === null){
            setErrorMessage("Enter your announcement's detail");
            setFail(true)
            return false
        }

        if(type === "" || type === null){
            setErrorMessage("Enter your announcement's type");
            setFail(true)
            return false
        }

        if(faculty === "" || faculty === null){
            setErrorMessage("Enter your announcement's faculty");
            setFail(true)
            return false
        }
        
        else{
            try{
                const NewAnnouncement = {
                    userId: user._id,
                    title: title,
                    text: detail, 
                    type: type,
                    faculty: faculty,
                }
                
                if(acceptedFiles){
                    let filesReq = []
                    acceptedFiles.map(file => {
                        const data = new FormData()
                        const fileName = Date.now() + "_" + file.name
                        data.append("name", fileName)
                        data.append("file", file)
                        filesReq.push("announcement/" + fileName)
                        try{
                            axios.post(SV + "/upload/announcement", data)
                        }
                        catch(err){
                            console.log(err)
                        }
                    })
                    NewAnnouncement.file = filesReq
                }

                const res = await axios.post(SV + "/announcements/", NewAnnouncement)
                if(res.status === 200){
                    document.getElementById('announce-title').value = ''
                    document.getElementById('announce-type').value = ''
                    document.getElementById('announce-faculty').value = ''
                    setText('')
                    setSuccess(true)
                    
                    socket.emit("createNewAnnouncement", {sendName: user.username, avatar: user.avatar, data: res.data})

                }else{
                    setFail(true)
                }

                /*fetch(SV + "/announcements/", {
                    method: 'POST',
                    body: JSON.stringify(NewAnnouncement),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(res => { 
                    res.json()
                    if(res.status === 200){
                        document.getElementById('announce-title').value = ''
                        document.getElementById('announce-type').value = ''
                        document.getElementById('announce-faculty').value = ''
                        setText('')
                        setSuccess(true)
                        
                        socket.emit("createNewAnnouncement", {sendName: user.username, data: res.data})

                    }else{
                        setFail(true)
                    }
                }
                )
                .then(data => console.log(data)); */
            }
            catch{
            }
            
        }
    }

    return (
        <div>
        <Navbar />
        
        <div className='mainContainer'>
            <Sidebar />
            <div className="CA-container">
                <h1>THÔNG BÁO</h1>
                <form className='announce-form' onSubmit={handleSubmit}>
                    <table className='announce-table'>
                        <tr>
                            <td colspan='2'>
                                <IconButton variant="outlined" color="error">
                                    <Link to="/announcement/list"><ArrowBack/></Link>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <label htmlFor="announce-title"><h3>Tiêu đề</h3></label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <input ref={titleRef} type="text" name="announce-title" id="announce-title" className='announce-input-text'/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="announce-detail"><h3>Chi tiết</h3> </label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                {/* <textarea name="announce-detail" id="announce-detail" cols="110" rows="10" className='announce-input-text'></textarea> */}
                                <div className="rich">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={text}
                                        onChange={richText}
                                    />
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <label htmlFor="announce-type"></label><h3>Chủ đề</h3>
                            </td>
                            <td>
                                <label htmlFor="announce-faculty"></label><h3>Phòng ban</h3>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <select name="announce-type" id="announce-type" ref={typeRef}>
                                    <option value='' selected="selected" disabled>Chủ đề</option>
                                    <option value="huongdan">Hướng dẫn</option>
                                    <option value="kehoach">Kế hoạch</option>
                                    <option value="sukien">Sự kiện</option>
                                </select>
                            </td>
                            <td>
                                <select name="announce-faculty" id="announce-faculty" ref={facultyRef}>
                                    <option value='' selected="selected" disabled>Khoa</option>
                                    {user.permissions.map(p => <option value={p}>{p}</option>)}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="announce-file"><h3>Tệp tin đính kèm</h3></label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <div className="files-form">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <p>Kéo thả files hoặc nhấn để chọn file</p>
                                    </div>
                                    <aside>
                                        <h4>Files</h4>
                                        <ul>{files}</ul>
                                    </aside>
                                </div>
                            </td>
                        </tr>
                    </table>
                    {success ? (
                        <div><Alert severity="success">Đăng thành công</Alert></div>
                    ) : (
                        <div style={{display: 'none'}}><h1 style={{display: 'none'}}>Not Good</h1></div>
                    )
                    }
                     {fail ? 
                        (
                            <div><Alert severity="error">{errorMessage}</Alert></div>

                        ) : (
                            <div><h1 style={{display: 'none'}}>Not Good</h1></div>
                        )
                    }

                    
                    <div className="btn-group">
                        <button className="announce-btn-submit" type="submit" >Đăng</button>
                        <button className="announce-btn-reset" type="reset" >Nhập lại</button>
                    </div>
                </form>
               
            </div>
            <Rightbar/>
        </div>
        </div>
    )
}
