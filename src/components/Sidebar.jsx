import {Home} from '@mui/icons-material'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <div className="sidebar-user"> 
                    <img src="/assets/avatar/ok.jpg" alt="" className="sidebar-user-avatar" />
                    <div className="sidebar-user-name">Yu Shun Lung</div>
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
            </div>
        </div>
    )
}
