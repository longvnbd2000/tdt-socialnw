import React from 'react'
import Announcements from './Announcements/Announcements'
import Pagination from '../Pagination/Pagination'
import './Announcement.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Announcement() {
    const SV = process.env.REACT_APP_SV_HOST;

    const [announcements, setAnnouncements] = useState([])
    const [display, setDisplay] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [lastPos, setLastPos] = useState(5)
    const limit = 10

    const fetchAnnouncement = async () => {
        try{
            const res = await axios.get(SV + '/announcements/')
            setAnnouncements(res.data)
        }
        catch(err){

        }
    }

    const displayCalc = () => {
        setLastPos(page * limit)
        setDisplay(announcements.slice((page - 1) * limit, lastPos))
    }

    useEffect(() => {
        fetchAnnouncement()
        
    }, [])

    useEffect(() => {
        setTotalPage(Math.ceil(announcements.length/limit))
        
        displayCalc()
        console.log(page)
    }, [page])

    const nextPage =() =>{
        if(page === totalPage) return
        setPage(page+1)

    }
    const prevPage =() =>{
        if(page === 1) return
        setPage(page-1)
        
    }

    return (
        <div className="announcement">
            <div className="announcement-top">
                
            </div>
            <div className="announcement-bottom">
                {display.map(a => <Announcements key={a._id} announcement={a} />)}
                
                <Pagination />
                <button onClick={nextPage}>next</button>
                <button onClick={prevPage}>prev</button>
            </div>
        </div>
    )
}
