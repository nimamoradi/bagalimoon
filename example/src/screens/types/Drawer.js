import React from 'react';
import {StyleSheet, View, Button, Image, Text} from 'react-native';

class MyClass extends React.Component {

    onShowModal = () => {
        this.toggleDrawer();
        this.props.navigator.showModal({
            screen: 'example.Types.Modal',
            title: `Modal`
        });
    };

    onPushToFirstTab = () => {
        this.toggleDrawer();
        this.props.navigator.handleDeepLink({
            link: 'tab1/example.Types.Push'
        });
    };

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left'
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: 'red', flex: 1, width: 300,justifyContent: 'center',}}>
                    <Image source={require('../../../img/gyro_header.jpg')}/>
                    <Text>jjdfd fo</Text>
                </View>
                <View style={{backgroundColor: 'blue', flex: 3, width: 300,}}>
                    <Text>jjo</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'column'
    },
    button: {},
    image: {
        width: 300,

        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:150,
    }
    ,
});

export default MyClass;
