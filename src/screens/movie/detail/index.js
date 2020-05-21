import React, { Component } from 'react';
import { Animated, StyleSheet, View, ScrollView, Dimensions, Image, ImageBackground, Text, StatusBar, TouchableOpacity } from 'react-native'
import { Header, Body, Card, CardItem, Left, Button } from 'native-base'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { loadMoviesDetail } from '../../../actions'

library.add(faArrowLeft)
const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 123;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const scrollRangeForAnimation = 10;
class MovieDetail extends Component {
    constructor(props) {
        super(props)
        scrollRef = React.createRef()
        this.state = {
            movieId: this.props.navigation.getParam('id'),
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
        }
        
    }

    componentDidMount() {
       this.props.getDetail(this.state.movieId)
    }

    _renderGenres = (data) => {
        const genres = []

        data.map(item => {
            genres.push(
                <View style={{ backgroundColor: '#0C0846', borderRadius: 5, padding: 5, marginRight: 2, marginBottom: 2 }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '500' }}>{item.name}</Text>
                </View>
            )
        })

        return genres
    }

    onScrollEndSnapToEdge = event => {
        const y = event.nativeEvent.contentOffset.y;
        console.log(y)
        if (y == 300) {
            console.log(_scrollView)
            _scrollView.scrollTo({y: 300});
        }  
    };

    render() {
        
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? 0 : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
    
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, 250, 300],
            outputRange: [1, 0, 0.4],
            extrapolate: 'clamp',
        });

        const headerOpacity = scrollY.interpolate({
            inputRange: [0, 250, 300],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
        });

        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const cardOpacity = scrollY.interpolate({
            inputRange: [0, 250, 300],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const cardTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
    
        const overView = scrollY.interpolate({
            inputRange: [213, 215],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });

        const titleOpacity = scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
        });

        const { navigation, movies_detail } = this.props
        
        return (
            <View style={styles.fill}>
                <StatusBar translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"/>
                
                <Animated.ScrollView
                    overScrollMode={'never'}
                    bounces={false}
                    ref={this.scrollRef}
                    onScrollEndDrag={this.onScrollEndSnapToEdge}
                    onMomentumScrollEnd={this.onScrollEndSnapToEdge}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                      { useNativeDriver: true },
                    )}

                >
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.header1,
                            {
                                opacity: cardOpacity,
                                transform: [{ translateY: cardTranslate }],
                            }
                        ]}
                    >
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],
                                },
                            ]}
                            source={{ uri: movies_detail.backdrop_path}}
                        />
                    </Animated.View>
                    <View style={styles.scrollViewContent}>
                    
                    <Card transparent>
                        <CardItem>
                            <Animated.View
                                style={
                                    [
                                        {
                                            flexDirection: 'row'
                                        },
                                        {
                                            opacity: cardOpacity,
                                            transform: [{ translateY: cardTranslate }],
                                        }
                                    ]
                                }
                            >
                                <View style={{ flexDirection: 'column', width: '30%', }}>
                                    <Image
                                        style={{width:100, height: 147, borderRadius: 10, position: 'absolute', top: -50}}
                                        source={{
                                            uri: movies_detail.poster_path,
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start',  alignItems: 'baseline'}}>
                                    <Body>
                                        <Text style={{ marginBottom: 10, color: '#0C0846', fontSize: 18, fontWeight: '700', letterSpacing: 3, textTransform: 'uppercase' }}>{movies_detail.title}</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 3}}>
                                            <View style={{ width: '30%'}}>
                                                <Text style={{ color: 'grey' }}>Rating</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                                <FontAwesomeIcon icon="star" style={{ color: '#EBC288'}}/>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: "grey",
                                                    fontWeight: 'bold',
                                                    marginLeft: 5
                                                }}>{movies_detail.vote_average}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 3}}>
                                            <View style={{ width: '30%'}}>
                                                <Text style={{ color: 'grey' }}>Status</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                                <Text style={{ color: 'grey' }}>{movies_detail.status}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 3}}>
                                            <View style={{ width: '30%'}}>
                                                <Text style={{ color: 'grey' }}>Genres</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                                                
                                            </View>
                                        </View>
                                        
                                    </Body>
                                </View>
                            </Animated.View>
                            
                        </CardItem>
                        <CardItem>
                            <Animated.View
                                style={this.state.scrollY === 300 ? {position: 'absolute'} : null}
                            >
                                <Text style={{ fontSize: 22, color: "#0C0846", fontWeight: "bold", marginBottom: 10}}>
                                    Overview
                                </Text>
                            </Animated.View>
                        </CardItem>
                        <CardItem>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                            
                            <View>
                                
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                <Text style={{}}>{movies_detail.overview}</Text>
                                
                            </View>
                            </View>
                        </CardItem>
                    </Card>
                    </View>
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                        { opacity: headerOpacity }
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage1,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{ uri: movies_detail.backdrop_path}}
                    />
                </Animated.View>
                <Animated.View
                    style={this.state.scrollY === 300 ? {position: 'absolute'} : null}
                >
                    <Text style={{ fontSize: 22, color: "#0C0846", fontWeight: "bold", marginBottom: 10}}>
                        Overview
                    </Text>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                        transform: [
                            { translateY: titleTranslate },
                        ],
                        },
                    ]}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.View
                            style={[{ marginLeft: 15, borderRadius: 20, padding: 5, backgroundColor: '#0C0846',},
                            
                            ]}>
                            <TouchableOpacity activeOpacity={1} onPress={() => { this.props.navigation.goBack() }}>
                                <FontAwesomeIcon icon="arrow-left" size={20} style={{alignSelf: 'center', color: 'white'}}/>
                            </TouchableOpacity>
                        
                        </Animated.View>
                        <View style={{flex: 1}}>
                            <Animated.Text style={[styles.title, {opacity: titleOpacity}]}>{movies_detail.title}</Animated.Text>
                        </View>
                        </View>
                        
                </Animated.View>
                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    
    backButton: {
        color: "#0C0846", 
        alignSelf:  'center',
        position: 'absolute',
        top: DEVICE_WIDTH / 8,
        left: 25,
    },
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0C0846',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        opacity: 0,
    },
    header1: {
        backgroundColor: '#0C0846',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    backgroundImage1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    overview: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 38 : 48,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 38 : 48,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 3,
        alignSelf: 'flex-start', 
        marginLeft: 20
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const mapStateToProps = (state) => {
    const { moviesDetailReducer } = state 
    return {
        movies_detail: moviesDetailReducer.movies_detail
    }
}

const mapDispatchToProps = dispatch => ({
    getDetail: (movieId) => {
        dispatch(loadMoviesDetail(movieId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)