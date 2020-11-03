import { combineReducers } from 'redux'
import SetUserReducer from './SetUserReducer'
import GetUserReducer from './GetUserReducer'
import AppReducer from './AppReducer'
import QueryReducer from './QueryReducer'
import NowPlaying  from './NowPlayingReducer'
import FeaturedPlaylist from './FeaturedPlaylist'
import AlbumReducer from './AlbumReducer'
import ArtistReducer from './ArtistReducer'
import ArtistTopReducer from './ArtistTopReducer'
import ArtistAlbumReducer from './ArtistAlbumReducer'
import PlaylistReducer from './PlaylistReducer'
import GetUserPlaylist from './GetUserPlaylists'
import GetRecentlyPlayed from './GetRecentlyPlayed'
import UserTrackReducer from './UserTrackReducer'

export default combineReducers({
    user: SetUserReducer,
    user_infos: GetUserReducer,
    appstate: AppReducer,
    query: QueryReducer,
    player: NowPlaying,
    featuredPlaylist: FeaturedPlaylist,
    userPlaylists: GetUserPlaylist,
    recentlyPlayed: GetRecentlyPlayed,
    album: AlbumReducer,
    artist: ArtistReducer,
    top: ArtistTopReducer,
    artistAlbum: ArtistAlbumReducer,
    playlist: PlaylistReducer,
    currentTrack: UserTrackReducer
})