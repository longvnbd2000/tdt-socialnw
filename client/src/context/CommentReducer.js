export const CommentReducer = (state, action) => {
    switch(action.type){
        case "COMMENT_START":
            return{
                comments: [],
                isFetching: true,
                error: false,
            }
        
        case "COMMENT_SUCCESS":
            return{
                comments: action.payload,
                isFetching: false,
                error: false,
            }
            
        case "COMMENT_FAILURE":
            return{
                comments: [],
                isFetching: false,
                error: action.payload,
            }    

        default:
            return state
    }
}

