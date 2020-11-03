import React, { Component } from "react"
import {connect} from 'react-redux'
import './Album.css'
import '../../App.css'
import * as actionContainer from '../../redux/actions/index'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { StylesProvider } from "@material-ui/core/styles"
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import Player from '../Player/Player'
import SearchResult from '../SearchResult/SearchResult'
import TopBar from '../TopBar/Topbar'
import SongList  from '../SongList/SongList'

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

class Album extends Component {
    constructor(props) {
        super(props)
        document.title = "MySpotify | Album"
        this.state = {isSearching: false, loading: true, artist: [], albums: [], allArtist: [], playlist: "", openDialog: false}
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login")
        }
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
            return
        }
        const { album } = this.props.match.params
        await this.props.getAlbum(localStorage.getItem('token'), album)
        await this.props.getNowPlayer(localStorage.getItem('token'))
        await this.props.getUserCurrentTrack(localStorage.getItem('token'))
        await this.props.getUserPlaylists(localStorage.getItem('token'))
        var artists = []
        const requests = this.props.album.artists.map(async (artist) => {
            var getted = await axios.get(artist.href, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            artists.push(getted.data)
        })
        Promise.all(requests).then(() => {
            this.setState({allArtist: artists});
        });
        this.setState({loading: false})
      }

      playAlbum = () => {
        this.props.playSong(true, localStorage.getItem('token'), this.props.album.uri)
      }

      playSong = (song) =>  {
        this.props.playSong(false, localStorage.getItem('token'), song.uri)
      }

      saveAlbum = () => {
          this.props.saveAlbum(localStorage.getItem('token'), this.props.match.params.album)
      }

      addToPlaylist = async (track) => {
          this.setState({openDialog: true})
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
                        <div className="albumContent">
                            <StylesProvider injectFirst>
                            <div className="header">
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <div className="AlbumImageContainer">
                                        <img className="AlbumImage"src={this.props.album.images[1].url} alt="Artwork"/>
                                    </div>
                                    <div className="albumInfosContainer">
                                        <div className="AlbumTitleContainer">
                                            <h1 className="AlbumTitle">{this.props.album.name}</h1>
                                        </div>
                                        <h2 className="AlbumArtistName">{this.props.album.artists[0].name}</h2>
                                        <div className="releaseDateContainer">
                                            <p className="releaseDate">{this.props.album.release_date}</p>
                                        </div>
                                        <div className="AlbumSongCountContainer">
                                            <p className="AlbumSongCount">{this.props.album.total_tracks} songs</p>
                                        </div>
                                        <div className="albumButtonsContainer">
                                            <Button className="playButton" onClick={this.playAlbum.bind(this)}>
                                                Play
                                            </Button>
                                            <Button  className="saveButton" onClick={this.saveAlbum.bind(this)}>
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                            <SongList context={this} list={this.props.album}/>
                            <div className="AlbumArtistList">
                            <Grid container spacing={6}>
                                {this.state.allArtist.map((artist) => (
                                    <div>
                                        <Grid item xs={4}>
                                            {this.props.nowPlaying.item !== undefined && this.props.nowPlaying.item.artists[0].id === artist.id ? (
                                                <StyledBadge overlap="circle" anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                variant="dot">
                                                    <Avatar alt="Remy Sharp" src={artist.images[2].url} className="ArtistAvatar" onClick={() => {
                                                        this.props.history.push(`/artist/${artist.id}`)
                                                    }}/>
                                                </StyledBadge>
                                            ) : (
                                                <Avatar alt="Remy Sharp" src={artist.images[2].url} className="ArtistAvatar" onClick={() => {
                                                    this.props.history.push(`/artist/${artist.id}`)
                                                }}/>
                                            )
                                        }
                                        </Grid>
                                    </div>
                                ))}
                                </Grid>
                            </div>
                            </StylesProvider>
                            <div className="AlbumCopyrights">
                                {this.props.album &&
                                    <p>{this.props.album.copyrights[0].text}</p>
                                }
                            </div>
                            </div>
                            {this.props.nowPlaying.item &&
                                    <Player />
                            }
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
        album: state.album.album,
        currentTrack: state.currentTrack.currentTrack,
        userPlaylists: state.userPlaylists.user_playlist
    }
}


export default connect(mapStateToProps, actionContainer)(Album)