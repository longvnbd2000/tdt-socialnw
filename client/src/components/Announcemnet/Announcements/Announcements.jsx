import React from 'react'
import './Announcements.css'

export default function Announcements() {
    return (
        <div className="announcements">
            <ul className="announcements-list">
                <li className="announcements-list-item">
                    <div className="announcements-list-item-title">title title title title title title</div>
                    <div className="announcements-list-item-text">dfdsfddsfdffafdsfdfsd</div>
                    <div className="announcements-list-item-bottom">
                        <div className="announcements-list-item-faculty">Khoa Cong nghe thong tin</div>
                        <div className="announcements-list-item-date">10/8/2021</div>
                    </div>  
                </li>
                <li className="announcements-list-item">
                    <div className="announcements-list-item-title">title title title title title title</div>
                    <div className="announcements-list-item-text">dfdsfddsfdffafdsfdfsd</div>
                    <div className="announcements-list-item-bottom">
                        <div className="announcements-list-item-faculty">Khoa Cong nghe thong tin</div>
                        <div className="announcements-list-item-date">10/8/2021</div>
                    </div>  
                </li>
                
            </ul>
        </div>
    )
}
