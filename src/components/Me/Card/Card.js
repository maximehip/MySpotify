import React from "react"
import './Card.css'

const Card = ({
	playlist,
}) => {
  const href = `/playlist/${playlist.id}`
  return(
	<a className='cardLink' href={href}>
		<div className='cards'>
			<div className='titleContainer'>
		  		<h3 className='cardTitle'>{playlist.name}</h3>
			</div>
			<div className="card">
				{playlist.images[0] && <img className="playlistImage" src={playlist.images[0].url} alt="PlaylistImage" />}
			</div> 
			<div className='descriptionContainer'>
				<p className='descriptionCard'>{playlist.description}</p>
			</div>
	  	</div>
	</a>
  )
};

export default Card;