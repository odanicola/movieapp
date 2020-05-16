
let defaultState = {
    movies_top_rated: []
}

const moviesTopRatedReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'GET_MOVIES_TOP_RATED':
        return {
            ...state,
            movies_top_rated:action.movies_top_rated
        }
      default:
        return {
            ...state,
        }
    }
}

export default moviesTopRatedReducer