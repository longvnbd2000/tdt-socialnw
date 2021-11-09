import {Photo, Tag, AddReaction} from '@mui/icons-material'

export default function Share() {
    return (
        <div className="share">
            <div className="shareContainer">
                <div className="share-top">
                    <img src="/assets/avatar/ok.jpg" alt="" className="share-avatar" />
                    <div className="share-input">
                        <input type="text" className="share-input-box" placeholder="What's on your mind, Shun Lung?" />
                    </div>
                </div>
                
                <div className="share-bottom">
                    <div className="share-options">
                        <div className="share-option-item">
                            <Photo className="share-option-item-icon"/>
                            <span className="share-option-item-text">Photo or Video</span>
                        </div>
                        <div className="share-option-item">
                            <Tag className="share-option-item-icon"/>
                            <span className="share-option-item-text">Tag Friends</span>
                        </div>
                        <div className="share-option-item">
                            <AddReaction className="share-option-item-icon"/>
                            <span className="share-option-item-text">Feeling</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
