const initialState = {
    player: {},
}

function reducer(state=initialState, action){
    switch(action.type){
        case "NOW_PLAYING":
        return {
            ...state,
            player: action.data
        }
        default: return state
    }
}

export default reducer