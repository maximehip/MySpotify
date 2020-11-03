const initialState = {
    top: {},
}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_ARTISTSTOP":
        return {
            ...state,
            top: action.data
        }
        default: return state
    }
}

export default reducer