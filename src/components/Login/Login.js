import React, { Component } from "react"
import './Login.css'
import {connect} from 'react-redux'
import config from '../../config/config.json'

class Login extends Component {
    constructor(props) {
        super(props)
        document.title = "MySpotify | Home"
      }
    
      componentDidMount() {
        const hash = window.location.hash.substring(1).split("&").reduce(function(initial, item) {
          if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
        if (hash.access_token) {
            const user = {
                access_token: hash.access_token
            }
            this.props.setUser(user)
            localStorage.setItem('token', user.access_token)
            this.props.history.push("/me")
        }
      }
    render() {
        return (
            <div>
                <img className="spotifyLogo" src="spotify.png" alt="Logo spotify"/>
                <a
                className="btn btn--loginApp-link"
                href={`${config.authEndpoint}?client_id=${config.spotifyClientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(
                    "%20"
                )}&response_type=token&show_dialog=true`}
                >
                    <div className="login">
                        Login to Spotify
                    </div>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.user.currentUser
    }
}

function mapDispatchToProps(dispatch){
    return {
        setUser: (userObject) => {
            dispatch({type: "SET_USER", payload: userObject})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)