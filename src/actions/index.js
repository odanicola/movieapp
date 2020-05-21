import {
    GET_MOVIES_NOW_PLAYING,
    GET_MOVIES_TOP_RATED,
    GET_MOVIES_BANNER,
    GET_MOVIES_UPCOMING,
    GET_MOVIES_DETAIL
} from './actionTypes'
import axios from 'axios'
import GLOBAL from '../utils/constants' 

const api_key = GLOBAL.MOVIDB_API_KEY

// Now Playing
export const loadMoviesNowPlaying = () => {
    return async (dispatch) => {
        return await axios.get(GLOBAL.MOVIEDB_URL + '3/movie/now_playing?api_key='+api_key+'&language=en-US&page=1').then(({data}) => {
            const movies = []
            if (data.results != undefined) {
                if (data.results.length > 0) {
                    var i = 0
                    data.results.map((item) => {
                        if (i < 10) {
                            movies[i] = {
                                id: item.id,
                                name: item.title,
                                vote_average: item.vote_average,
                                image: GLOBAL.MOVIEDB_IMAGE_BASE_URL + "w154" + item.poster_path
                            }
                        }
                        i++
                    })
                }
            }
            dispatch(setMoviesNowPlaying(movies))
        }).catch(function (error) {
            console.log(error)
        })
    }
}

export const setMoviesNowPlaying = (data) => ({
    type: GET_MOVIES_NOW_PLAYING,
    movies_now_playing: data
})

// Top Rated
export const loadMoviesTopRated = () => {
    return async (dispatch) => {
        return await axios.get(GLOBAL.MOVIEDB_URL + '3/movie/top_rated?api_key='+api_key+'&language=en-US&page=1').then(({data}) => {
            const movies = []
            if (data.results != undefined) {
                if (data.results.length > 0) {
                    var i = 0
                    data.results.map((item) => {
                        if (i < 3) {
                            movies[i] = {
                                id: item.id,
                                name: item.title,
                                vote_average: item.vote_average,
                                image: GLOBAL.MOVIEDB_IMAGE_BASE_URL + "w154" + item.poster_path,
                                overview: item.overview.substring(0,100) + '...'
                            }
                        }
                        i++
                    })
                }
            }
            dispatch(setMoviesTopRated(movies))
        }).catch(function (error) {

        })
    }
}

export const setMoviesTopRated = (data) => ({
    type: GET_MOVIES_TOP_RATED,
    movies_top_rated: data
})

// Movie Banner
export const loadMoviesBanner = () => {
    return async (dispatch) => {
        return await axios.get(GLOBAL.MOVIEDB_URL + '3/movie/popular?api_key='+api_key+'&language=en-US&page=1').then(({data}) => {
            const movies = []
            if (data.results != undefined) {
                if (data.results.length > 0) {
                    var i = 0
                    data.results.map((item) => {
                        if (i < 5) {
                            movies[i] = {
                                id: item.id,
                                name: item.title,
                                image: GLOBAL.MOVIEDB_IMAGE_BASE_URL + "w500" + item.backdrop_path,
                            }
                        }
                        i++
                    })
                }
            }
            dispatch(setMoviesBanner(movies))
        }).catch(function (error) {

        })
    }
}

export const setMoviesBanner = (data) => ({
    type: GET_MOVIES_BANNER,
    movies_banner: data
})

// Up Coming
export const loadMoviesUpComing = () => {
    return async (dispatch) => {
        return await axios.get(GLOBAL.MOVIEDB_URL + '3/movie/upcoming?api_key='+api_key+'&language=en-US&page=1').then(({data}) => {
            const movies = []
            if (data.results != undefined) {
                if (data.results.length > 0) {
                    var i = 0
                    data.results.map((item) => {
                        if (i < 10) {
                            movies[i] = {
                                id: item.id,
                                name: item.title,
                                vote_average: item.vote_average,
                                image: GLOBAL.MOVIEDB_IMAGE_BASE_URL + "w154" + item.poster_path
                            }
                        }
                        i++
                    })
                }
            }
            dispatch(setMoviesUpComing(movies))
        }).catch(function (error) {
            console.log(error)
        })
    }
}

export const setMoviesUpComing = (data) => ({
    type: GET_MOVIES_UPCOMING,
    movies_upcoming: data
})

// Movie Detail
export const loadMoviesDetail = (movieId) => {
    return async (dispatch) => {
        return await axios.get(GLOBAL.MOVIEDB_URL + '3/movie/'+movieId+'?api_key='+api_key+'&language=en-US&page=1').then(({data}) => {
            let movies = []
            movies = {
                id: data.id,
                overview: data.overview,
                title: data.title,
                backdrop_path: GLOBAL.MOVIEDB_IMAGE_BASE_URL + "w500" + data.backdrop_path,
                poster_path: GLOBAL.MOVIEDB_IMAGE_BASE_URL + "w154" + data.poster_path,
                status: data.status,
                tagline: data.tagline,
                vote_average: data.vote_average,
                genres: data.genres,
                overview: data.overview
            }
            
            dispatch(setMoviesDetail(movies))
        }).catch(function (error) {
            console.log(error)
        })
    }
}

export const setMoviesDetail = (data) => ({
    type: GET_MOVIES_DETAIL,
    movies_detail: data
})