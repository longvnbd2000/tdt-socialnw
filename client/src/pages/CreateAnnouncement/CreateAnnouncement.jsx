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

export default function CreateAnnouncement() {
    const SV = process.env.REACT_APP_SV_HOST;
    const {user} = useContext(AuthContext);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [text, setText] = useState('');

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
    console.log(acceptedFiles);
    
    const richText = (event, editor) => {
        const data = editor.getData();
        setText(data)
    }
    
    const handleSubmit = async (e, res, req) => {
        e.preventDefault();

        const title = titleRef.current.value;
        const detail = text
        const type = typeRef.current.value;
        const faculty = facultyRef.current.value;

         // console.log({title, detail, type, faculty});
        if(title === "" || title === null){
            setErrorMessage("Enter the title");
            return false
        }

        if(detail === "" || detail === null){
            setErrorMessage("Enter your announcement's detail");
            return false
        }

        if(type === "" || type === null){
            setErrorMessage("Enter your announcement's type");
            return false
        }

        if(faculty === "" || faculty === null){
            setErrorMessage("Enter your announcement's faculty");
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
    
                // await axios.post(SV + "/announcements/", {NewAnnouncement})
                console.log(e);
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
                            <td >
                                <label htmlFor="announce-title"><h3>Tiêu đề</h3></label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2'>
                                <input ref={titleRef} type="text" name="announce-title" id="announce-title" className='announce-input-text'/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="announce-detail"><h3>Chi tiết</h3> </label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2'>
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
                                    <option value='CNTT'>CNTT</option>
                                    <option value='duoc'>Dược</option>
                                    <option value='dientu'>Điện - điện tử</option>
                                    <option value='giaoducquocte'>Giáo dục quốc tế</option>
                                    <option value='ketoan'>Kế toán</option>
                                    <option value='khthethao'>Khoa học thể thao</option>
                                    <option value='khungdung'>Khoa học ứng dụng</option>
                                    <option value='khxhvnv'>Khoa học xã hội và nhân văn</option>
                                    <option value='kythuatcongtrinh'>Kỹ thuật công trình</option>
                                    <option value='laodongvacongdoan'>Lao động và công đoàn</option>
                                    <option value='luat'>Luật</option>
                                    <option value='moitruong'>Môi trường và bảo hộ lao động</option>
                                    <option value='mythuat'>Mỹ thuật công nghiệp</option>
                                    <option value='ngoaingu'>Ngoại ngữ</option>
                                    <option value='qtkd'>Quản trị kinh doanh</option>
                                    <option value='tcnh'>Tài chính - ngân hàng</option>
                                    <option value='toanthongke'>Toán - thống kê</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="announce-file"><h3>Tệp tin đính kèm</h3></label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2'>
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
