
let defaultState = {
    movies_upcoming: []
}

const moviesUpComingReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'GET_MOVIES_UPCOMING':
        return {
            ...state,
            movies_upcoming:action.movies_upcoming
        }
      default:
        return {
            ...state
        }
    }
}

export default moviesUpComingReducer