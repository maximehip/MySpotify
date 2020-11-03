const initialState = {
	rencently_played: {},
}

function reducer(state=initialState, action){
	switch(action.type){
		case "GET_RECENTLY_PLAYED":
		return {
			...state,
			rencently_played: action.data
		}
		default: return state
	}
}

export default reducer