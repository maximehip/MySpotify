import React, { Component } from "react"
import {connect} from 'react-redux'
import './Me.css'
import '../../App.css'
import CardPlaylist from './Card/Card'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import TopBar from '../TopBar/Topbar'
import SearchResult from '../SearchResult/SearchResult'
import * as actionContainer from '../../redux/actions/index'
import Player from '../Player/Player'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class Me extends Component {
    constructor(props) {
        super(props)
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login")
        } 
        document.title = "MySpotify | Me"
        this.state = {isSearching: false, artist: [], albums: [], loading: true, playlistDialog: false, playlistPublic: true,  playlistCollab: true, playlistTitle: "", playlistDes: ""}
        this.refresher()
      }

      refresher() {
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
        await this.props.getFeaturedPlaylist(localStorage.getItem('token'))
        await this.props.getUserPlaylists(localStorage.getItem('token'))
        await this.props.getNowPlayer(localStorage.getItem('token'))
        await this.props.getUserCurrentTrack(localStorage.getItem('token'))
        await this.props.getRecentlyPlayed(localStorage.getItem('token'))
        this.setState({loading: false})
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

    handlePlaylistDialog = () => {
        this.setState({playlistDialog: true})
    }

    handleClose = () => {
        this.setState({playlistDialog: false})
    }

    handleSwich = (event) => {
          this.setState({playlistPublic: event.target.checked})
    }

    handleCollab = (event) => {
        this.setState({playlistCollab: event.target.checked})
    }

    setPlaylistTitle = (event) => {
        this.setState({playlistTitle: event.target.value})
    }
    setPlaylistDes = (event) => {
        this.setState({playlistDes: event.target.value})
    }

    createNewPlaylist() {
        this.props.createPlaylist(localStorage.getItem('token'), this.props.user_infos.id, this.state.playlistTitle, this.state.playlistPublic,this.state.playlistCollab, this.state.playlistDes)
    }

    render() {
        return(
            <div>
                <div className="meContent">
                {this.props.user_infos.display_name &&
                    <TopBar props={this.props.user_infos} handleChange={e => this.handleChange(e)}/>
                }
                {!this.state.isSearching ? (
                    <div className="userProfile">
                        <div className="welcomeContainer">
                            <h1 className="welcome">Welcome {this.props.user_infos.display_name}</h1>
                        </div>
                        {!this.state.loading && this.props.userPlaylists ? (
                            <div>
                                <h2 className='titlePlaylistMap'>
                                    Vos playlists 
                                    <IconButton aria-label="upload picture" component="span" onClick={this.handlePlaylistDialog}>
                                        <AddCircleIcon/>
                                    </IconButton>
                                </h2>
                                <div className="cardContainer">
                                    { this.props.userPlaylists.items &&
                                        this.props.userPlaylists.items.map((item) => (
                                            <CardPlaylist playlist={item}></CardPlaylist>
                                        ))
                                    }
                                </div>
                                <Dialog open={this.state.playlistDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Create playlist</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Créer votre playlist
                                    </DialogContentText>
                                    <TextField autoFocus margin="dense"
                                        id="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        onChange={this.setPlaylistTitle}
                                        />
                                    <TextField autoFocus margin="dense"
                                        id="description"
                                        label="description"
                                        type="text"
                                        fullWidth
                                        onChange={this.setPlaylistDes}
                                        />
                                     <FormControlLabel
                                        control={
                                        <Switch
                                            checked={this.state.playlistPublic}
                                            onChange={this.handleSwich}
                                            name="checkedB"
                                            color="primary"/>
                                        }
                                        label="Public"/>
                                        <FormControlLabel
                                        control={
                                        <Switch
                                            checked={this.state.playlistCollab}
                                            onChange={this.handleCollab}
                                            name="checkedB"
                                            color="primary"/>
                                        }
                                        label="Collaborative"/>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Annuler
                                    </Button>
                                    <Button onClick={this.createNewPlaylist.bind(this)} color="primary">
                                        Créer
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                        </div>
                    ) : (
                        <div class="kabobloader">
                            <div class="bounce1" />
                            <div class="bounce2" />
                            <div class="bounce3" />
                        </div>
                    )
                    }
                    {!this.state.loading && this.props.recentlyPlayed &&
                        <div>
                            <h2 className='titlePlaylistMap'>Ecoutés récement</h2>
                        <div className="cardContainer">
                            { this.props.recentlyPlayed &&
                                this.props.recentlyPlayed.items.map((item) => (
                                    <RecentlyPlayed playlist={item}></RecentlyPlayed>
                                ))
                            }
                        </div>
                        </div>
                    }
                    {!this.state.loading && this.props.recentlyPlayed &&
                        <div>
                            <h2 className='titlePlaylistMap'>{this.props.featuredPlaylist.message}</h2>
                        <div className="cardContainer">
                            { this.props.featuredPlaylist.playlists.items &&
                                this.props.featuredPlaylist.playlists.items.map((item) => (
                                    <CardPlaylist playlist={item}></CardPlaylist>
                                ))
                            }
                        </div>
                        </div>
                    }

                </div> 
                ) : (
                    <SearchResult artist={this.state.artist} albums={this.state.albums}/>
                )}
                </div>
                
                {this.props.nowPlaying.item &&
                    <Player />
                }
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
        featuredPlaylist: state.featuredPlaylist.playlist,
        currentTrack: state.currentTrack.currentTrack,
        userPlaylists: state.userPlaylists.user_playlist,
        recentlyPlayed: state.recentlyPlayed.rencently_played,
    }
}

export default connect(mapStateToProps, actionContainer)(Me)