import React, {Component, PropTypes} from 'react';
import {
    Animated,
    View,
    Image
} from 'react-native';


class progressiveImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnailOpacity: new Animated.Value(0),
            ready: false
        }
    }

    onLoad() {
        Animated.timing(this.state.thumbnailOpacity, {
            toValue: 0,
            duration: 250
        }).start();

    }

    onThumbnailLoad() {
        if(!this.state.ready){
            this.setState({ready: true})
        Animated.timing(this.state.thumbnailOpacity, {
            toValue: 1,
            duration: 0
        }).start();

        }
    }

    render() {
        return (
            <View
                width={this.props.style.width}
                height={this.props.style.height}
                backgroundColor={'#ffffff'}
            >

                <Animated.Image
                    resizeMethod='scale'
                    resizeMode='stretch'
                    key={this.props.key}
                    style={[
                        {
                            opacity: this.state.thumbnailOpacity
                        },
                        this.props.style
                    ]}
                    source={this.props.thumbnail}
                    onLoad={(event) => this.onThumbnailLoad(event)}
                />
                <Animated.Image
                    resizeMethod='scale'
                    resizeMode='stretch'
                    key={this.props.key}
                    style={[
                        {
                            position: 'absolute'
                        },
                        this.props.style
                    ]}
                    source={this.props.source}
                    onLoad={(event) => this.onLoad(event)}
                />


            </View>
        )
    }
}

export default progressiveImage;