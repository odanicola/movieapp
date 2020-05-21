
let defaultState = {
    movies_detail: []
}

const moviesDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'GET_MOVIES_DETAIL':
        return {
            ...state,
            movies_detail:action.movies_detail
        }
      default:
        return {
            ...state
        }
    }
}

export default moviesDetailReducer