const initialState = {
    query: {},

}

function reducer(state=initialState, action){
    switch(action.type){
        case "GET_QUERY":
        return {
            ...state,
            query: action.data
        }
        default: return state
    }
}

export default reducer