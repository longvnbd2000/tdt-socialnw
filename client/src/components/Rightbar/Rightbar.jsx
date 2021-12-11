import './Rightbar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Rightbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)

    return (
        <div className="rightbar">
            <div className="rightbar-title">User Online</div>
            <ul className="rightbar-online-list">
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>

                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
                <li className="rightbar-online-list-items">
                    <div className="rightbar-online-list-item-avatar">
                        <img src="assets/avatar/ok.jpg" alt="" />
                        <span className="rightbar-online-tick"></span>
                    </div>
                    <span className="rightbar-online-list-item-user">Ducky</span>
                </li>
            </ul>
        </div>
    )
}
