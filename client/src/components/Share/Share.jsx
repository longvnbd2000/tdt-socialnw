import {Photo, Tag, AddReaction} from '@mui/icons-material'
import './Share.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)

    return (
        <div className="share">
            <div className="shareContainer">
                <div className="share-top">
                    <img src={PF+user.avatar} alt="" className="share-avatar" />
                    <div className="share-input">
                        <input type="text" className="share-input-box" placeholder={"What's on your mind, " + user.username + "?"} />
                    </div>
                    <div >
                        <button className="share-btn">Share</button>
                    </div>
                </div>
                
                <div className="share-bottom">
                    <div className="share-options">
                        <div className="share-option-item">
                            <Photo htmlColor="#20ab00" className="share-option-item-icon"/>
                            <span className="share-option-item-text">Photo or Video</span>
                        </div>
                        <div className="share-option-item">
                            <Tag htmlColor="#fa7500" className="share-option-item-icon"/>
                            <span className="share-option-item-text">Tag Friends</span>
                        </div>
                        <div className="share-option-item">
                            <AddReaction htmlColor="#fcba03" className="share-option-item-icon"/>
                            <span className="share-option-item-text">Feeling</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
