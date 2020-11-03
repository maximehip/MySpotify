import React from "react"
import '../Album/Album.css'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'

function convertMS( milliseconds ) {
    var minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minute = minute % 60;
    return {
        minute: minute,
        seconds: seconds
    };
}

function closeDialog (context) {
    context.setState({openDialog: false})
}

async function playSong(context, song)  {
    if (song.track) {
        context.props.playSong(false, localStorage.getItem('token'), song.track.uri)
    } else {
        context.props.playSong(false, localStorage.getItem('token'), song.uri)
    }
}

function addToPlaylist(context) {
    context.setState({openDialog: true})
}

const SongList = ({
	context, list
}) => {
  return(
	<List component="nav" aria-label="Album songs list" className="listSong">
        {list.tracks.items.map((track) => (
            <div className="trackInfoContainer">
                <ListItem button onClick={playSong.bind(this, context, track)} className={`trackItem ${context.props.nowPlaying.item !== undefined && context.props.nowPlaying.item.id === track.id ? "isPlaying" : ""}`} >
                    <ListItemIcon className="trackNumber">
                    {track.track ? (
                        <Avatar>
                            {track.track.album.images[0] &&<Avatar alt={track.track.name} src={track.track.album.images[0].url} /> }
                        </Avatar>
                    ) : (
                        <p>{track.track_number}</p>
                    )}
                    </ListItemIcon>
                    {track.track ? (
                        <ListItemText primary={track.track.name} />
                    ) : (
                        <ListItemText primary={track.name} />
                    )}
                        {track.track ? (
                        <p className="timeCode">{convertMS(track.track.duration_ms).minute} : {convertMS(track.track.duration_ms).seconds}</p>
                        ) : (
                            <p className="timeCode">{convertMS(track.duration_ms).minute} : {convertMS(track.duration_ms).seconds}</p>
                        )}
                    </ListItem>
                    <IconButton onClick={addToPlaylist.bind(this, context)} style={{flex: '1 1 auto'}}>
                        <AddCircleIcon/>
                    </IconButton>
                    <Divider />
                    <Dialog onClose={closeDialog.bind(this, context)} aria-labelledby="simple-dialog-title" open={context.state.openDialog}>
                        <DialogTitle id="simple-dialog-title">Select a playlist</DialogTitle>
                        <List>
                            {context.props.userPlaylists.items.map((playlist) => (
                            <ListItem button onClick={() =>  {
                                if (track.track) {
                                    context.props.addToPlaylist(localStorage.getItem('token'), playlist.id, track.track.uri)
                                } else {
                                    context.props.addToPlaylist(localStorage.getItem('token'), playlist.id, track.uri)
                                }
                                context.setState({openDialog: false})
                            }} key={playlist}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {playlist.images[0] &&<Avatar alt={playlist.name} src={playlist.images[0].url} /> }
                                    </Avatar>
                                    </ListItemAvatar>
                                        <ListItemText primary={playlist.name} />
                                    </ListItem>
                                ))}
                            </List>
                            </Dialog>
                            </div>
                            ))}
                            </List>
  )
};

export default SongList;