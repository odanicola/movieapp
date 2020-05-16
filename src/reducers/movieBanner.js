
let defaultState = {
    movies_banner: []
}

const moviesBannerReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'GET_MOVIES_BANNER':
        return {
            ...state,
            movies_banner:action.movies_banner
        }
      default:
        return {
            ...state
        }
    }
}

export default moviesBannerReducer