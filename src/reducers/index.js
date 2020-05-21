import { combineReducers } from 'redux'
import moviesNowPlayingReducer from './movieNowPlaying'
import moviesTopRatedReducer from './movieTopRated'
import moviesBannerReducer from './movieBanner'
import moviesUpComingReducer from './movieUpComing'
import moviesDetailReducer from './movieDetail'

export default combineReducers({
    moviesNowPlayingReducer,
    moviesTopRatedReducer,
    moviesBannerReducer,
    moviesUpComingReducer,
    moviesDetailReducer
})