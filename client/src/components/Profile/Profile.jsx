import {useState, useEffect} from 'react'
import './Profile.css'
import axios from 'axios'

export default function Profile({emailname}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
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

    return (
        <div>
            <div className="profile">
                <div className="profile-cover">
                    <img src={PF+user.background} alt="" className="profile-cover-background" />
                    <img src={PF+user.avatar} alt="" className="profile-cover-avatar" />
                </div>
                <div className="profile-user">
                    <h2 className="profile-user-name">{user.username}</h2>
                    <div className="profile-user-email">{user.email}</div>
                </div>
                <div className="profile-info">
                    <div className="profile-info-left">
                        <div className="profile-info-text">Khoa Công nghệ thông tin dssadf sdfsdf sdafsdf</div>
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
