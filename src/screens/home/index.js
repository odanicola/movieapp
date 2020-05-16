import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faCaretRight, faHome, faTheaterMasks, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { loadMoviesNowPlaying, loadMoviesTopRated, loadMoviesBanner } from '../../actions'
import { Text, Footer, FooterTab, Button, Content, Container } from 'native-base'
import GLOBAL from '../../utils/constants' 
import {BannerSlider} from './components/bannerSlider'
import {MovieNowPlayingCard} from './components/movieNowPlayingCard'
import {MovieTopRatedCard} from './components/movieTopRatedCard'
 
library.add(faSearch, faCaretRight, faHome, faTheaterMasks, faTicketAlt)

class Home extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadElement() 
    }

    render() {
        const {movies_banner, movies_now_playing, movies_top_rated} = this.props
        return (
            <Container>
                <StatusBar barStyle="dark-content" backgroundColor="white"/>
                <Content>     
                    <View style={{ flex: 1, padding: 20, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                        <View style={{width: '90%'}}>
                            <Text style={{ fontSize: 30, color: "#0C0846", fontWeight: "bold", flex: 1 }}>
                                Movie
                            </Text>
                        </View>
                        <View style={{ flexGrow: 1, alignSelf: 'center', justifyContent: 'center'}}>
                            <FontAwesomeIcon icon="search" style={{alignSelf:  'center'}}/>
                        </View>
                    </View>
                    <View>
                        <BannerSlider images={movies_banner}/>
                    </View>
                    <View style={{ marginTop: 5, marginBottom: 5}}>
                        <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 22, color: "#0C0846", fontWeight: "bold", flex: 1, alignSelf: 'flex-start'}}>
                                Now Playing
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 18,color: "#0C0846",alignSelf: 'flex-end'}}>
                                    More 
                                </Text>
                                <FontAwesomeIcon icon="caret-right" style={{alignSelf:  'center'}}/>
                            </View>
                        </View>
                        <View>
                            <MovieNowPlayingCard movies={movies_now_playing} />
                        </View>
                    </View>
                    <View style={{marginTop: 5,marginBottom: 5}}>
                        <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 22, color: "#0C0846", fontWeight: "bold", flex: 1, alignSelf: 'flex-start'}}>
                                Top Rated
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 18,color: "#0C0846",alignSelf: 'flex-end'}}>
                                    More 
                                </Text>
                                <FontAwesomeIcon icon="caret-right" style={{alignSelf:  'center'}}/>
                            </View>
                            
                        </View>
                        <View>
                            <MovieTopRatedCard movies={movies_top_rated} />
                        </View>
                    </View>
                </Content>
                <Footer>
                <FooterTab>
                    <Button vertical active>
                        <FontAwesomeIcon icon="home" style={{alignSelf:  'center'}}/>
                        <Text>Beranda</Text>
                    </Button>
                    <Button vertical>
                        <FontAwesomeIcon icon="theater-masks" style={{alignSelf:  'center'}}/>
                        <Text>Bioskop</Text>
                    </Button>
                    <Button vertical>
                        <FontAwesomeIcon icon="ticket-alt" style={{alignSelf:  'center'}}/>
                        <Text>Tiket</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    const { moviesNowPlayingReducer,  moviesTopRatedReducer, moviesBannerReducer } = state
    return {
        movies_now_playing: moviesNowPlayingReducer.movies_now_playing,
        movies_top_rated: moviesTopRatedReducer.movies_top_rated,
        movies_banner: moviesBannerReducer.movies_banner,
    }
}

const mapDispatchToProps = dispatch => ({
    loadElement: () => {
        dispatch(loadMoviesNowPlaying())
        dispatch(loadMoviesTopRated())
        dispatch(loadMoviesBanner())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);