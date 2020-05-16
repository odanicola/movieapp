
let defaultState = {
    sliders: []
}

const sliderReducer = (state = defaultState, action) => {
    // console.log(action.payload)
    switch (action.type) {
      case 'GET_SLIDER_IMAGES':
        return {
            ...state,
            sliders:action.sliders
        }
      default:
        return {
            ...state,
            sliders:defaultState.sliders
        }
    }
}

export default sliderReducer