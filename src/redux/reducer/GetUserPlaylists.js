const initialState = {
	user_playlist: {},
}

function reducer(state=initialState, action){
	switch(action.type){
		case "GET_USER_PLAYLISTS":
		return {
			...state,
			user_playlist: action.data
		}
		default: return state
	}
}

export default reducer