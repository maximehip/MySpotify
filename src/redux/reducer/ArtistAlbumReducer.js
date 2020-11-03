const initialState = {
    albums: {},
}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_ARTISTSALBUM":
        return {
            ...state,
            albums: action.data
        }
        default: return state
    }
}

export default reducer