import axios from "axios";

export function getUser(user) {
    return async dispatch => {
        try {
            const getted = await axios.get("https://api.spotify.com/v1/me", {headers: {'Authorization': `Bearer ${user}`}
            }).then(res => res.data)
            dispatch(load("LOAD_USER", getted))
        } catch (err) {
          dispatch(load("LOAD_USER", err.message))
        }
    }
}

export function getQuery(user, query) {
    return async dispatch => {
        try {
            const getted = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album,track,artist`, {headers: {'Authorization': `Bearer ${user}`}
            }).then(res => res.data)
            dispatch(load("GET_QUERY", getted))
        } catch (err) {
            dispatch({
                type: "GET_QUERY",
                payload: [
                  {
                    code: 735,
                    message: err.message,
                  },
                ],
              })
        }
    }
}

export function playSong(isAlbum, user, uri) {
    return async dispatch => {
        try {
          var data;
          if (isAlbum) {
            data = {"context_uri": uri}
          } else {
            data = {"uris": [uri]}
          }
            await axios.put('https://api.spotify.com/v1/me/player/play',data, {headers: {'Authorization': `Bearer ${user}`}
            }).then(res => res.data)
            dispatch(null)
        } catch (err) {
           console.log(err.message)
        }
    }
}

export function getNowPlayer(user) {
    return async dispatch => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {headers: {'Authorization': `Bearer ${user}`}
            }).then(res => res.data)
            dispatch(load("NOW_PLAYING", response))
        } catch (err) {
            dispatch({
                type: "NOW_PLAYING",
                payload: [{
                    code: 735,
                    message: err.message,
                  },
                ],
              })
        }
    }
}

export function getFeaturedPlaylist(user) {
    return async dispatch => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists?country=FR&locale=fr_FR', {headers: {'Authorization': `Bearer ${user}`}
            }).then(res => res.data)
            dispatch(load("FEATURED_PLAYLIST", response))
        } catch (err) {
            dispatch({
                type: "FEATURED_PLAYLIST",
                payload: [
                  {
                    code: 735,
                    message: err.message,
                  },
                ],
              })
        }
    }
}

export function getUserPlaylists(user) {
  return async dispatch => {
      try {
          const response = await axios.get('https://api.spotify.com/v1/me/playlists?country=FR&locale=fr_FR', {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_USER_PLAYLISTS", response))
      } catch (err) {
          dispatch({
              type: "GET_USER_PLAYLISTS",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function getRecentlyPlayed(user) {
  return async dispatch => {
      try {
          const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?country=FR&locale=fr_FR', {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_RECENTLY_PLAYED", response))
      } catch (err) {
          dispatch({
              type: "GET_RECENTLY_PLAYED",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function getAlbum(user, id) {
  return async dispatch => {
      try {
          const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_ALBUM", response))
      } catch (err) {
          dispatch({
              type: "GET_ALBUM",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function saveAlbum(user, id) {
  return async dispatch => {
      try {
        await axios.put(`https://api.spotify.com/v1/me/albums?ids=${id}`, {id}, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(null)
      } catch (err) {
          dispatch(null)
      }
  }
}

export function setUser (userObject) {
  return async dispatch => {
    dispatch({type: "SET_USER", payload: userObject})
  }
}

export function getArtist(user, id) {
  return async dispatch => {
      try {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_ARTIST", response))
      } catch (err) {
          dispatch({
              type: "GET_ARTIST",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function getArtistsTop(user, id) {
  return async dispatch => {
      try {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=FR`, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_ARTISTSTOP", response))
      } catch (err) {
          dispatch({
              type: "GET_ARTISTSTOP",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function getArtistsAlbums(user, id) {
  return async dispatch => {
      try {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_ARTISTSALBUM", response))
      } catch (err) {
          dispatch({
              type: "GET_ARTISTSALBUM",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function getPlaylist(user, id) {
  return async dispatch => {
      try {
          const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_PLAYLIST", response))
      } catch (err) {
          dispatch({
              type: "GET_PLAYLIST",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function playPlayer(user) {
  return async dispatch => {
    try {
        await axios.put('https://api.spotify.com/v1/me/player/play',{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function stopPlayer(user) {
  return async dispatch => {
    try {
        await axios.put('https://api.spotify.com/v1/me/player/pause',{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function nextMusic(user) {
  return async dispatch => {
    try {
        await axios.post('https://api.spotify.com/v1/me/player/next',{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function previousMusic(user) {
  return async dispatch => {
    try {
        await axios.post('https://api.spotify.com/v1/me/player/previous',{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function setVolume(user, volume) {
  return async dispatch => {
    try {
        await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function getUserCurrentTrack(user) {
  return async dispatch => {
      try {
          const response = await axios.get(`https://api.spotify.com/v1/me/player`, {headers: {'Authorization': `Bearer ${user}`}
          }).then(res => res.data)
          dispatch(load("GET_UserCurrentTrack", response))
      } catch (err) {
          dispatch({
              type: "GET_UserCurrentTrack",
              payload: [
                {
                  code: 735,
                  message: err.message,
                },
              ],
            })
      }
  }
}

export function setPlayback(user, state) {
  return async dispatch => {
    try {
        await axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${state}`,{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function setShuffle(user, state) {
  return async dispatch => {
    try {
        await axios.put(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`,{}, {headers: {'Authorization': `Bearer ${user}`}
        }).then(res => res.data)
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function createPlaylist(token, userid, name, ispublic, collaborative, description) {
  return async dispatch => {
    try {
      const data = JSON.stringify({
        name: name, 
        public: ispublic, 
        collaborative: collaborative, 
        description: description
      })
        await axios.post(`https://api.spotify.com/v1/users/${userid}/playlists`,data, {headers: {'Authorization': `Bearer ${token}`}
        }).then(res => {
          console.log(res.data)
        })
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

export function addToPlaylist(token, playlistid, uris) {
  return async dispatch => {
    try {
      const data = JSON.stringify({
        uris: [uris]
      })
        await axios.post(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`,data, {headers: {'Authorization': `Bearer ${token}`}
        }).then(res => {
          console.log(res.data)
        })
        dispatch(null)
    } catch (err) {
        console.log(err.message)
    }
  }
}

function load(type, data) {
    return {
        type: type,
        data: data
    }
}