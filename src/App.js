import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router } from "react-router-dom"
import Login from './components/Login/Login'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/reducer/reducers'
import Me from './components/Me/Me'
import Album from './components/Album/Album'
import Artist from './components/Artist/Artist'
import Playlist from './components/Playlist/Playlist'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/login" component={Login} name="Login"/>
          <Route path="/me" component={Me} name="Me"/>
          <Route path="/album/:album" component={Album} name="Albums" />
          <Route path="/artist/:artist" component={Artist} name="Artist" />
          <Route path="/playlist/:playlist" component={Playlist} name="Playlist" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
