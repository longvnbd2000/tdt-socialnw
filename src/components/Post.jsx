import {MoreHoriz, ThumbUpAlt, Comment} from '@mui/icons-material'

export default function Post() {
    return (
        <div className="post">
            <div className="post-top">
                <div className="post-top-left">
                    <img src="/assets/avatar/ok.jpg" alt="" className="post-top-avatar" />
                    <div className="post-top-user">
                        <p className="post-top-user-name">Shun Lung</p>
                        <p className="post-top-user-time">5 mins ago</p>
                    </div>
                </div>
                <div className="post-top-right">
                    <MoreHoriz className="post-top-more"/>
                </div>
            </div>

            <div className="post-center">
                <div className="post-center-text">
                    This is my first post
                </div>
                <img src="assets/post/pointingdog.jpg" alt="" className="post-center-media" />
            </div>

            <div className="post-bottom">
                <div className="post-bottom-count">
                    <div className="post-bottom-count-like">
                        <ThumbUpAlt className="post-bottom-count-icon"/>
                        <span className="post-bottom-count-text">200</span> 
                    </div>
                    <div className="post-bottom-count-comments">
                        200 comments
                    </div>
                </div>
                <hr />
                <div className="post-bottom-item">
                    <div className="post-bottom-like-comment">
                        <ThumbUpAlt/>
                        <span className="post-bottom-like-comment-text">Like</span>
                    </div>
                    <div className="post-bottom-like-comment">
                        <Comment/>
                        <span className="post-bottom-like-comment-text">Comment</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
