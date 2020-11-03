import React, { Component } from "react"
import {connect} from 'react-redux'
import '../Me/Me.css'
import * as actionContainer from '../../redux/actions/index'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { withRouter } from 'react-router-dom';

class SearchResult extends Component {

    handleClick = (album) => {
        this.props.history.push(`/album/${album.id}`)
      }
      handlePlay = (album) => {
        this.props.playSong(this.props.currentUser, album.uri)
    }
    render() {
        return (
            <div className="userProfile">
                    <h1>Result</h1>
                            <img className="artistImage "src={this.props.artist.images[0].url} alt={this.props.artist.name} onClick={() => {
                                this.props.history.push(`/artist/${this.props.artist.id}`)
                            }
                            }/>
                            <h1>{this.props.artist.name}</h1>
                    <div className="albumResult">
                    <List>
                        {this.props.albums.map((album) => (
                            <ListItem alignItems="flex-start" onClick={this.handleClick.bind(this, album)}>
                                <Card style={{display: 'flex'}} >
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent style={{flex: '1 0 auto'}}>
                                    <Typography component="h5" variant="h5">
                                    {album.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    {album.artists[0].name}
                                    </Typography>
                                </CardContent>
                                <div >
                                    <IconButton aria-label="play/pause" onClick={this.handlePlay.bind(this, album)}>
                                    <PlayArrowIcon />
                                    </IconButton>
                                </div>
                                </div>
                                <CardMedia image={album.images[0].url} style={{width: 151}}
                                    title={album.name}
                                />
                                <br />
                            </Card>
                          </ListItem>
                        ))}
                        </List>
                    </div>
                </div> 
        )
    }
}


function mapStateToProps(state){
    return {
        currentUser: state.user.currentUser,
    }
}

export default withRouter(connect(mapStateToProps, actionContainer)(SearchResult))