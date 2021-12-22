import React from 'react'
import Navbar from '../../components/NavBar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import {useDropzone} from 'react-dropzone'
import './CreateAnnouncement.css'

export default function CreateAnnouncement() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    console.log(acceptedFiles);

    return (
        <div>
        <Navbar />
        
        <div className='mainContainer'>
            <Sidebar />
            <div className="CA-container">
                <h1>THÔNG BÁO</h1>
                <form className='announce-form' action="">
                    <table className='announce-table'>
                        <tr><label htmlFor="announce-title"><h3>Tiêu đề</h3></label></tr>
                        <tr><input type="text" name="announce-title" id="announce-title" className='announce-input-text'/></tr>

                        <tr><label htmlFor="announce-detail"><h3>Chi tiết</h3> </label></tr>
                        <tr><textarea name="announce-detail" id="announce-detail" cols="110" rows="10" className='announce-input-text'></textarea></tr>

                        <tr><label htmlFor="announce-file"><h3>Tệp tin đính kèm</h3></label></tr>
                        <tr>
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
                        </tr>
                        
                    </table>
                    <div className="btn-group">
                        <input className="announce-btn-submit" type="submit" value="Đăng"/>
                        <input className="announce-btn-reset" type="reset" value="Nhập lại"/>
                    </div>
                        
                </form>
            </div>
            <Rightbar/>
        </div>
        </div>
    )
}
