const initialState = {
    album: {},

}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_ALBUM":
        return {
            ...state,
            album: action.data
        }
        default: return state
    }
}

export default reducer