import {Home} from '@mui/icons-material'
import './Sidebar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)

    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <div className="sidebar-user"> 
                    <img src={PF+user.avatar} alt="" className="sidebar-user-avatar" />
                    <div className="sidebar-user-name">{user.username}</div>
                </div>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item-icon"/>
                        <span className="sidebar-list-item-text">item 1</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item-icon"/>
                        <span className="sidebar-list-item-text">item 1</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item-icon"/>
                        <span className="sidebar-list-item-text">item 1</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item-icon"/>
                        <span className="sidebar-list-item-text">item 1</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item-icon"/>
                        <span className="sidebar-list-item-text">item 1</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Home className="sidebar-list-item-icon"/>
                        <span className="sidebar-list-item-text">item 1</span>
                    </li>
                </ul>
                <hr className="sidebar-line" />
                <div className="rightbar-title">Faculty</div>
                <ul className="sidebar-group">
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Khoa học xã hội và nhân văn</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                    <li className="sidebar-group-item">
                        <img src="assets/avatar/ok.jpg" alt="" className="sidebar-group-item-avatar" />
                        <span className="sidebar-group-item-user">Khoa Công nghệ thông tin</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
