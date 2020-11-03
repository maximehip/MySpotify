const initialState = {
    artist: {},
}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_ARTIST":
        return {
            ...state,
            artist: action.data
        }
        default: return state
    }
}

export default reducer