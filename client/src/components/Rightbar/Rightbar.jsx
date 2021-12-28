import './Rightbar.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { io } from 'socket.io-client'
import axios from 'axios'

export default function Rightbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)
    const socket = useRef()
    const ENDPOINT = 'ws://localhost:8080'
    const [onlineUsers, setOnlineUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [onlineUsersInfo, setOnlineUsersInfo] = useState([])

    useEffect(() => {
        socket.current = io(ENDPOINT)
    }, [])

    useEffect(() => {
        const fetchUser = async () =>{
            const res = await axios.get(process.env.REACT_APP_SV_HOST + '/users/all')
            setAllUsers(res.data)
        }
        fetchUser()

        socket.current.emit('addUser', user._id)
        socket.current.on('getUsers', users => {
            setOnlineUsers(users.filter(u => u.userId !== user._id))
        })
    }, [user])

    useEffect(() => {
        setOnlineUsersInfo(allUsers.filter(a => onlineUsers.some(o => o.userId === a._id)))
    }, [allUsers, onlineUsers])

    console.log(allUsers)
    console.log(onlineUsers)
    

    return (
        <div className="rightbar">
            <div className="rightbar-title">User Online ({onlineUsersInfo.length})</div>
            <ul className="rightbar-online-list">
                {onlineUsersInfo.map(o => (
                    <li className="rightbar-online-list-items">
                        <div className="rightbar-online-list-item-avatar">
                            <img src={PF+o.avatar} alt="" />
                            <span className="rightbar-online-tick"></span>
                        </div>
                        <span className="rightbar-online-list-item-user">{o.username}</span>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}
