const initialState = {
    playlist: {},
}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_PLAYLIST":
        return {
            ...state,
            playlist: action.data
        }
        default: return state
    }
}

export default reducer