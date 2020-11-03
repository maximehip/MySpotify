import React, { Component } from "react"
import {connect} from 'react-redux'
import * as actionContainer from '../../redux/actions/index'
import './Artist.css'
import '../../App.css'
import Grid from '@material-ui/core/Grid'
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'   
import Player from '../Player/Player'
import TopBar from '../TopBar/Topbar'
import SearchResult from '../SearchResult/SearchResult'

class Artist extends Component {

    constructor(props) {
        super(props)
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login")
        } 
        document.title = "MySpotify | Artist"
        this.state = {isSearching: false, loading: true, artist: [], albums: []}
        this.refresher()
      }

      refresher(){ 
        setInterval(async () => { 
            if (!localStorage.getItem('token')) {
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
            return
        }
        const { artist } = this.props.match.params
        await this.props.getArtist(localStorage.getItem('token'), artist)
        await this.props.getArtistsTop(localStorage.getItem('token'), artist)
        await this.props.getArtistsAlbums(localStorage.getItem('token'), artist)
        await this.props.getNowPlayer(localStorage.getItem('token'))
        await this.props.getUserCurrentTrack(localStorage.getItem('token'))
        this.setState({loading: false})
      }

      playSong = (song) =>  {
       this.props.playSong(false, localStorage.getItem('token'), song.uri)
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
                                <div className="acontent">
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                            <div className="headerArtistContainer">
                                <img className="headerArtist" src={this.props.artist.images[1].url} alt="Artwork"/>
                            </div>
                            <div className="artistInfos">
                                <div className="ArtistTitleContainer">
                                    <h1 className="ArtistTitle">{this.props.artist.name}</h1>
                                </div>
                                <Grid container spacing={1}>
                                    {this.props.artist.genres.map((genre) => (
                                        // <Grid item xs={12} sm={5}>
                                            <div className="artistGenre">
                                                <p className="artistTextGenre">{genre}</p>
                                            </div>
                                        // </Grid>
                                    ))}
                                </Grid>
                                <div className="playArtist">
                                    <PlayCircleFilledOutlinedIcon style={{ fontSize: 90 }}/>
                                </div>
                            </div>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <List component="nav" aria-label="Album songs list" className="topSongs">
                            <h1 className="topSong">Top songs</h1>
                            {this.props.top.tracks.slice(0, 5).map((track) => (
                                <div>
                                    <ListItem button onClick={this.playSong.bind(this, track)} className={`trackItem ${this.props.nowPlaying.item !== undefined && this.props.nowPlaying.item.id === track.id ? "isPlaying" : ""}`} >
                                        <ListItemIcon className="albumsImage">
                                            <img src={track.album.images[2].url} alt="albums"/>
                                        </ListItemIcon>
                                        <ListItemText primary={track.name} className="song" />
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <List component="nav" aria-label="Album songs list" className="topSongs">
                            <h1 className="topSong">Albums</h1>
                            {this.props.albums.items.slice(0, 4).map((album) => (
                                <div>
                                    <ListItem button onClick={() => {
                                        this.props.history.push(`/album/${album.id}`)
                                    }} className={`trackItem`} >
                                        <ListItemIcon className="albumsImage">
                                            <img src={album.images[2].url} alt="albums"/>
                                        </ListItemIcon>
                                        <ListItemText primary={album.name} className="song" />
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                            </List>
                        </Grid>
                        
                    </Grid>
                    </div>
                    {this.props.nowPlaying.item &&
                            <Player />
                    }
                            </div>
                    
                        ) : (
                            <SearchResult artist={this.state.artist} albums={this.state.albums}/>
                        )}
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
        nowPlaying: state.player.player,
        artist: state.artist.artist,
        top: state.top.top,
        query: state.query.query,
        albums: state.artistAlbum.albums,
        currentTrack: state.currentTrack.currentTrack
    }
}


export default connect(mapStateToProps, actionContainer)(Artist)