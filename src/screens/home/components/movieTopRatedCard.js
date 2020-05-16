import * as React from 'react'
import { Image, View } from 'react-native'
import { Card, CardItem, Body, Text, Grid, Col, Row } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faStar)

class MovieTopRatedCard extends React.Component {
    constructor(props) {
        super(props)
    }

    _renderTopRatedCard = (movies) => {
        const moviesTopRatedCard = []

        movies.map(item => {
            moviesTopRatedCard.push(
                <Card transparent key={item.image}>
                    <CardItem style={{ backgroundColor: 'none'}}>
                        <Grid>
                            <Col style={{ width: 90 }}>
                                <Image
                                    style={{width:90, height: 113, borderRadius: 10}}
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                            </Col>
                            <Col>
                                <Body>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "#0C0846",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}>
                                        {item.name}
                                    </Text>
                                    <Row>
                                    <FontAwesomeIcon icon="star" style={{marginLeft: 10, color: '#EBC288'}}/>
                                    <Text style={{
                                        fontSize: 14,
                                        color: "grey",
                                        fontWeight: 'bold',
                                        marginLeft: 5
                                    }}>{item.vote_average}</Text>
                                    </Row>
                                    <Text style={{
                                        fontSize: 12,
                                        color: "grey",
                                        marginLeft: 10,
                                        flex:1,
                                        alignSelf: 'flex-start'
                                    }}>
                                        {item.overview}
                                    </Text>
                                </Body>
                            </Col>
                        </Grid>
                        
                        
                    </CardItem>
                </Card>
            )
        })

        return moviesTopRatedCard
    }

    render() {
        const { movies } = this.props

        return(
            <View>
                {this._renderTopRatedCard(movies)}
            </View>
        )
    }
}

export {MovieTopRatedCard}