

import React from "react"
import './RecentlyPlayed.css'

const RecentlyPlayed = ({
	playlist,
}) => {
  const href = `/album/${playlist.track.album.id}`
  
  return(
	<a className='recentcardLink' href={href}>
		<div className='recentcards'>
			<div className='recenttitleContainer'>
		  		<h3 className='recentcardTitle'>{playlist.track.artists[0].name}</h3>
			</div>
			 <div className="recentcard">
		  		<img className="recentplaylistImage" src={playlist.track.album.images[0].url} alt="PlaylistImage"></img>
			</div> 
			<div className='recentDescriptionContainer'>
				<p className='descriptionCard'>{playlist.track.name}</p>
			</div>
	  	</div>
	</a>
  )
};

export default RecentlyPlayed;