import React, { Component } from "react"
import {connect} from 'react-redux'
import './Playlist.css'
import '../../App.css'
import * as actionContainer from '../../redux/actions/index'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { StylesProvider } from "@material-ui/core/styles"
import Player from '../Player/Player'
import TopBar from '../TopBar/Topbar'
import SearchResult from '../SearchResult/SearchResult'
import SongList  from '../SongList/SongList'

class Playlist extends Component {
    constructor(props) {
        super(props)
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login")
        } 
        document.title = "MySpotify | Playlist"
        this.state = {isSearching: false, loading: true, artist: [], albums: []}
        this.refresher()
      }

      refresher(){ 
        setInterval(async () => { 
            if (!localStorage.getItem('token') || this.props.user_infos === "Request failed with status code 401") {
                this.props.history.push("/login")
            } 
          await this.props.getNowPlayer(localStorage.getItem('token'))
          await this.props.getUserCurrentTrack(localStorage.getItem('token'))
        }, 15000) 
      }
    
      async componentDidMount() {
        await this.props.getUser(localStorage.getItem('token'))
        if (this.props.user_infos === "Request failed with status code 401") {
            this.props.history.push("/login")
        }
        const { playlist } = this.props.match.params
        await this.props.getPlaylist(localStorage.getItem('token'), playlist)
        await this.props.getNowPlayer(localStorage.getItem('token'))
        await this.props.getUserPlaylists(localStorage.getItem('token'))
        this.setState({loading: false})

      }

      playAlbum = () => {
        this.props.playSong(true, localStorage.getItem('token'), this.props.playlist.uri)
      }

      playSong = (song) =>  {
        this.props.playSong(false, localStorage.getItem('token'), song.track.uri)
      }

      handleChange = async (e) => {
        if (e.target.value !== "") {
            await this.props.getQuery(localStorage.getItem('token'), e.target.value)
            if (this.props.query["artists"].items[0]) {
                this.setState({artist: this.props.query["artists"].items[0]})
                this.setState({albums: this.props.query["albums"].items})
                this.setState({isSearching: true})
              }
        } else {
            this.setState({isSearching: false})
        }
    }

    render() {
        return(
            <div>
                {!this.state.loading ? (
                <div>
                    <TopBar props={this.props.user_infos} handleChange={e => this.handleChange(e)}/>
                {!this.state.isSearching ? (
                    <div>
                        <div className="content">
                        <StylesProvider injectFirst>
                        <div className="header">
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <div className="artworkp">
                                        <img src={this.props.playlist.images[0].url} alt="Artwork"/>
                                    </div>
                                    <div className="playlistInfos">
                                        <div className="playlistTitleContainer">
                                            <h1 className="playlistTitle">{this.props.playlist.name}</h1>
                                        </div>
                                        <h2 className="playlist_author">{this.props.playlist.owner.display_name}</h2>
                                        <div className="songCount">
                                            <p>{this.props.playlist.tracks.total} songs</p>
                                        </div>
                                        <div className="buttons">
                                            <Button variant="contained" className="playButton" onClick={this.playAlbum.bind(this)}>
                                                Play
                                            </Button>
                                        </div>
                                    </div>
                            </Grid>
                        </div>
                        <SongList context={this} list={this.props.playlist}/>
                        </StylesProvider>
                        </div>
                        <div className="footer">
                        {this.props.nowPlaying.item &&
                            <Player />
                        }
                        </div>
                    </div>
                ) : (
                    <SearchResult artist={this.state.artist} albums={this.state.albums}/>
                )
                }
            </div>
            ) : (
                <div class="kabobloader">
                    <div class="bounce1" />
                    <div class="bounce2" />
                    <div class="bounce3" />
                </div>
            )}
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        currentUser: state.user.currentUser,
        user_infos: state.user_infos.user_infos,
        query: state.query.query,
        nowPlaying: state.player.player,
        playlist: state.playlist.playlist,
        urrentTrack: state.currentTrack.currentTrack,
        userPlaylists: state.userPlaylists.user_playlist
    }
}


export default connect(mapStateToProps, actionContainer)(Playlist)