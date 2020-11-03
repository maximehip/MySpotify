const initialState = {
    state: {},

}

function reducer(state=initialState, action){
    switch(action.type){
        case "LOAD_APP":
        return {
            ...state,
            state: action.data
        }
        default: return state
    }
}

export default reducer