import * as React from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Image, ImageBackground, Text } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

class BannerSlider extends React.Component {
    scrollRef = React.createRef()
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: 0
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState(prev => ({
                selectedIndex: prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1
            }), () => {
                this.scrollRef.current.scrollTo({
                    animated: true,
                    y: 0,
                    x: DEVICE_WIDTH * this.state.selectedIndex
                })
            })
        },3000)
    }

    setSelectedIndex = event => {
        const contentOffset = event.nativeEvent.contentOffset
        const viewSize = event.nativeEvent.layoutMeasurement
        const selectedIndex = Math.floor(contentOffset.x / viewSize.width)
        this.setState({ selectedIndex })
    }

    _renderItem = (items) => {
        const images = []
        items.map(item => {
            images.push(
                <ImageBackground 
                    key={item.id}
                    source={{uri: item.image}}
                    style={styles.backgroundImage}
                    
                >
                    <View style={{ position: 'absolute', top: 0, left: 25, right: 0, bottom: 45, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingLeft: 5, paddingRight: 5, marginBottom: 5, borderRadius: 10}}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>most popular</Text>
                        </View>
                        
                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 5, borderRadius: 10}}>
                            <Text style={{ opacity: 1,color: 'white', letterSpacing: 3,fontSize: 28, fontWeight: '700' }}>{item.name}</Text>
                        </View>
                    </View>
                </ImageBackground>
            )
        })

        return images
    }

    _renderBullets = (items) => {
        const bullets = []
        const {selectedIndex} = this.state
        items.map((item, i) => {
            bullets.push(
                <View 
                    key={item.id}
                    style={[
                        styles.whiteCircle, {opacity: i === selectedIndex ? 0.5 : 1}
                    ]}
                />
            )
        })

        return bullets
    }
 
    render() {
        const {images} = this.props
        
        return (
            <View style={[styles.backgroundImage, {marginBottom: 15}]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled = {true}
                    onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {this._renderItem(images)}
                </ScrollView>
                <View style={styles.circleDiv}>
                    {this._renderBullets(images)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 200,
        width: DEVICE_WIDTH,
        resizeMode: 'contain'
    },
    circleDiv: {
        position: 'absolute',
        bottom: 13,
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteCircle: {
        width: 6,
        height: 6, 
        borderRadius: 3, 
        margin: 5,
        backgroundColor: 'white'
    }
})

export {BannerSlider}