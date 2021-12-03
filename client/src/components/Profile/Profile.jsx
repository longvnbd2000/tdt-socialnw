import React from 'react'
import './Profile.css'

export default function Profile() {
    return (
        <div>
            <div className="profile">
                <div className="profile-cover">
                    <img src="assets/post/nodejs.png" alt="" className="profile-cover-background" />
                    <img src="assets/avatar/ok.jpg" alt="" className="profile-cover-avatar" />
                </div>
                <div className="profile-user">
                    <h2 className="profile-user-name">Yu Shun Lung</h2>
                    <div className="profile-user-email">51800429@student.tdtu.edu.vn</div>
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