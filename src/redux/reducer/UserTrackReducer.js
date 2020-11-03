const initialState = {
    currentTrack: {}
}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_UserCurrentTrack":
        return {
            ...state,
            currentTrack: action.data
        }
        default: return state
    }
}

export default reducer