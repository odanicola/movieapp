
let defaultState = {
    movies_now_playing: []
}

const moviesNowPlayingReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'GET_MOVIES_NOW_PLAYING':
        return {
            ...state,
            movies_now_playing:action.movies_now_playing
        }
      default:
        return {
            ...state
        }
    }
}

export default moviesNowPlayingReducer