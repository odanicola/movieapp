import { combineReducers } from 'redux'
import moviesNowPlayingReducer from './movieNowPlaying'
import moviesTopRatedReducer from './movieTopRated'
import moviesBannerReducer from './movieBanner'

export default combineReducers({
    moviesNowPlayingReducer,
    moviesTopRatedReducer,
    moviesBannerReducer
})