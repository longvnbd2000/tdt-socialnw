import {Search, Notifications, Person} from '@mui/icons-material'

export default function Navbar() {
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
                    Homepage
                </div>
                <div className="navbar-link">
                    Homepage
                </div>
            </div>
            <div className="navbar-right">
                <div className="navbar-icons">
                    <div className="navbar-icons-item">
                        <Person className="navbar-icons-item-icon"/>
                        <span className="navbar-icons-item-badge">1</span>
                    </div>
                    <div className="navbar-icons-item">
                        <Notifications className="navbar-icons-item-icon"/>
                        <span className="navbar-icons-item-badge">1</span>
                    </div>
                </div>
                <div className="navbar-user">
                    <div className="navbar-user-name">Shun Lung</div>
                    <img src="/assets/avatar/ok.jpg" alt="" className="navbar-avatar" />
                </div>
                
            </div>
        </div>
    )
}
