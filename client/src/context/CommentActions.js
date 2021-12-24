export const CommentStart = (comments) => ({
    type: "COMMENT_START",

})

export const CommentSuccess = (comments) => ({
    type: "COMMENT_SUCCESS",
    payload: comments,
    
})

export const CommentFailure = (error) => ({
    type: "COMMENT_FAILURE",
    payload: error,
})