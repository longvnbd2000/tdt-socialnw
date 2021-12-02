import React from 'react'
import Announcements from './Announcements/Announcements'
import Pagination from '../Pagination/Pagination'
import './Announcement.css'

export default function Announcement() {
    return (
        <div className="announcement">
            <div className="announcement-top">
                
            </div>
            <div className="announcement-bottom">
                <Announcements />
                <Pagination />
            </div>
        </div>
    )
}
