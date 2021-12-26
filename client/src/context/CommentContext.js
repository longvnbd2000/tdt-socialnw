import { createContext, useReducer } from "react";
import { CommentReducer } from "./CommentReducer";

const initialState = {
    comments: [],
    isFetching: false,
    error: false
}

export const CommentContext = createContext(initialState)

export const CommentContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CommentReducer, initialState)

    return (
        <CommentContext.Provider value={{comments: state.comments, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </CommentContext.Provider>
    )
}