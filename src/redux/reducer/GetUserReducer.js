const initialState = {
    user_infos: {},

}

function reducer(state=initialState, action){
    switch(action.type){
        case "LOAD_USER":
        return {
            ...state,
            user_infos: action.data
        }
        default: return state
    }
}

export default reducer