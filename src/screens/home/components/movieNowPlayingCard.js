import * as React from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Card, CardItem, Body, Text } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faStar)

class MovieNowPlayingCard extends React.Component {
    constructor(props) {
        super(props)
    }

    _renderMovieCard = (movies) => {
        
        const moviesCard = []
        
        movies.map(item => {
            moviesCard.push(
                <Card transparent key={item.id}>
                    <CardItem style={{width: 180, backgroundColor: 'none'}}>
                        <Body>
                            <Image
                                style={{width:150, height: 221, borderRadius: 10}}
                                source={{
                                    uri: item.image,
                                }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <FontAwesomeIcon icon="star" style={{alignSelf:  'center', color: '#EBC288'}}/>
                                <Text style={{
                                    fontSize: 14,
                                    color: "grey",
                                    fontWeight: 'bold',
                                    marginLeft: 5
                                }}>{item.vote_average}</Text>
                            </View>

                            <Text style={{
                                fontSize: 18,
                                color: "#0C0846",
                                fontWeight: "bold",
                                marginTop: 5,
                                alignSelf: 'flex-start',
                                flex: 1,
                                flexWrap: 'wrap'
                            }}>
                                {item.name}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            )
        })

        return moviesCard
    }
    
    render() {
        const {movies} = this.props
        return(
           <View>
                <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {this._renderMovieCard(movies)}
                </ScrollView>
           </View>
        )
    }
}

export {MovieNowPlayingCard}