import React, { Component } from "react"
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import VolumeDownIcon from "@material-ui/icons/VolumeDown"
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline"
import "./Player.css"
import { Grid, Slider } from "@material-ui/core"
import {connect} from 'react-redux'
import * as actionContainer from '../../redux/actions/index'

class Player extends Component {

    constructor(props) {
        super(props)
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login")
        } 
        this.state = {playing: false, volume: 0, shuffle: false, repeat: "off"}
        this.refresher()
    }

    refresher(){ 
        if (!localStorage.getItem('token')) {
            this.props.history.push("/login")
        } 
        setInterval(async () => { 
            this.setState({playing: this.props.nowPlaying.is_playing})
            this.setState({shuffle: this.props.currentTrack.shuffle_state})
            this.setState({repeat: this.props.currentTrack.repeat_state})
            if (this.props.currentTrack.device) {
                this.setState({volume: this.props.currentTrack.device.volume_percent})
            }
        }, 15000) 
      } 

    async componentDidMount() {
        this.setState({playing: this.props.nowPlaying.is_playing})
        this.setState({shuffle: this.props.currentTrack.shuffle_state})
        this.setState({repeat: this.props.currentTrack.repeat_state})
        if (this.props.currentTrack.device) {
            this.setState({volume: this.props.currentTrack.device.volume_percent})
        }
    }

    changePlayingState() {
        if (this.state.playing) {
            this.props.stopPlayer(localStorage.getItem('token'))
        } else {
            this.props.playPlayer(localStorage.getItem('token'))
        }
        this.setState({playing: !this.props.nowPlaying.is_playing})
    }

    nextMusic() {
         this.props.nextMusic(localStorage.getItem('token'))
    }

    previousMusic() {
         this.props.previousMusic(localStorage.getItem('token'))
    }

    changeVolume = (e, value) => {
        this.setState({volume: value})
        this.props.setVolume(localStorage.getItem('token'), value)
    }

    setRepeatMode() {
        if (this.state.repeat === "off") {
            this.props.setPlayback(localStorage.getItem('token'), "track")
            this.setState({repeat: "track"})
        } else {
            this.props.setPlayback(localStorage.getItem('token'), "off")
            this.setState({repeat: "off"})
        }
    }

    setShuffleMode() {
        if (this.state.shuffle) {
            this.setState({shuffle: false})
            this.props.setShuffle(localStorage.getItem('token'), false)
        } else {
            this.setState({shuffle: true})
            this.props.setShuffle(localStorage.getItem('token'), true)
        }
    }

    render() {
        return(
            <div className="nowPlaying">
                <div className="nowPlaying__left">
                <ShuffleIcon className={`${this.state.shuffle ? "nowPlaying__green" : "nowPlaying__icon"}`} onClick={this.setShuffleMode.bind(this)} />
                    <SkipPreviousIcon className="nowPlaying__icon" onClick={this.previousMusic.bind(this)} />
                    {this.state.playing ? (
                        <PauseCircleOutlineIcon fontSize="large" className="nowPlaying__icon" onClick={this.changePlayingState.bind(this)}/>
                    ) : (
                        <PlayCircleOutlineIcon fontSize="large" className="nowPlaying__icon" onClick={this.changePlayingState.bind(this)}/>
                    )}
                    <SkipNextIcon className="nowPlaying__icon" onClick={this.nextMusic.bind(this)}/>
                    <RepeatIcon className={`${this.state.repeat === "off" ? "nowPlaying__icon" : "nowPlaying__green"}`} onClick={this.setRepeatMode.bind(this)}/>
                </div>
                <div className="nowPlaying__center">
                <img src={this.props.nowPlaying.item.album.images[2].url} alt="album" className="playerImage"/>
                    <div className="nowPlaying__songInfo">
                        <a href={`/album/${this.props.nowPlaying.item.album.id}`} className="noLink"><h4 className="nowPlayingName">{this.props.nowPlaying.item.name}</h4></a>
                        <div className="nowPlayingArtistsContainer">
                            {this.props.nowPlaying.item.artists.map((artist) => (
                            <a href={`/artist/${artist.id}`} className="noLink"><p className="nowPlayingArtists" style={{display: 'inline'}}> {artist.name} </p></a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="nowPlaying__right">
                    <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" value={this.state.volume} onChange={this.changeVolume}/>
                    </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        nowPlaying: state.player.player,
        currentTrack: state.currentTrack.currentTrack
    }
}


export default connect(mapStateToProps, actionContainer)(Player)
