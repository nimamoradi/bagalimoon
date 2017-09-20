import React from 'react';
import {StyleSheet, ScrollView, View, ListView} from 'react-native';
import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'

class NavigationTypes extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }]),
        };
    }


    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };
    offer = (title, imageUrl, des) => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: 'hot offer',
            passProps: {
                title: title,
                imageUrl: imageUrl,
                des: des
            },


        });
    };


    pushScreen = () => {
        this.props.navigator.push({
            screen: 'example.Types.test',
            title: 'list view',

        });
    };

    // pushCustomTopBarScreen = () => {
    //   this.props.navigator.push({
    //     screen: 'example.Types.CustomTopBarScreen'
    //   });
    // };

    // pushCustomButtonScreen = () => {
    //   this.props.navigator.push({
    //     screen: 'example.Types.CustomButtonScreen',
    //     title: 'Custom Buttons'
    //   });
    // };

    // pushTopTabsScreen = () => {
    //   this.props.navigator.push({
    //     screen: 'example.Types.TopTabs',
    //     title: 'Top Tabs',
    //     topTabs: [{
    //       screenId: 'example.Types.TopTabs.TabOne',
    //       title: 'Tab One',
    //     }, {
    //       screenId: 'example.Types.TopTabs.TabTwo',
    //       title: 'Tab Two',
    //     }],
    //   });
    // };

    // showModal = () => {
    //   this.props.navigator.showModal({
    //     screen: 'example.Types.Modal',
    //     title: 'Modal',
    //   });
    // };

    // showLightBox = () => {
    //     this.props.navigator.showLightBox({
    //         screen: "example.Types.LightBox",
    //         passProps: {
    //             title: 'LightBox',
    //             content: 'Hey there, I\'m a light box screen :D',
    //             onClose: this.dismissLightBox,
    //         },
    //         style: {
    //             backgroundBlur: 'dark',
    //             backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //             tapBackgroundToDismiss: true
    //         }
    //     });
    // };

    // dismissLightBox = () => {
    //   this.props.navigator.dismissLightBox();
    // };

    // showInAppNotification = () => {
    //   this.props.navigator.showInAppNotification({
    //     screen: 'example.Types.Notification',
    //   });
    // };
    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together

        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
                this.toggleDrawer()
            }
            if (event.id == 'edit') {
                // AlertIOS.alert('NavBar', 'Add button pressed');
            }
        }
    }


    render() {
        return (
            <View Style={{height: 500}}>
                <ScrollView Style={{flex: 1,flexDirection:'column'}}>
                    <View style={{flex: 1}}>

                        <ListView
                            style={{flexDirection:'row',flex:1}}
                            horizontal={true}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => <ImageRow  title={rowData.action_name} imageUrl={rowData.imageUrl}
                                                              onPress={rowData.onPress}/>}
                        />
                        <Header style={{flex: 1}} title="پیشنهاد ویژه"/>
                        <ImageRow title={'top sell'}
                                  style={{flex: 1}}
                                  imageUrl={'https://www.w3schools.com/css/paris.jpg'}
                                  onPress={this.pushScreen}/>

                        <View style={{flexDirection: 'row', flex: 1, marginTop: 20}}>
                            <ScrollView Style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>


                                <Item title={'top sell'}
                                      price={'100,000'}
                                      style={styles.item}
                                      imageUrl={'https://www.w3schools.com/css/trolltunga.jpg'}
                                      onPress={this.pushScreen}/>
                                <Item title={'top sell'}
                                      style={styles.item}
                                      price={'100,000'}
                                      imageUrl={'https://www.w3schools.com/css/lights600x400.jpg'}
                                      onPress={this.pushScreen}/>
                                <Item title={'top sell'}
                                      style={styles.item}
                                      price={'100,000'}
                                      imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                                      onPress={this.pushScreen}/>
                                <Item title={'top sell'}
                                      price={'100,000'}
                                      style={{flex: 1}}
                                      imageUrl={'https://www.w3schools.com/css/trolltunga.jpg'}
                                      onPress={this.pushScreen}/>
                                <Item title={'top sell'}
                                      price={'100,000'}
                                      style={styles.item}
                                      disscount={'150,000'}
                                      imageUrl={'https://www.w3schools.com/css/lights600x400.jpg'}
                                      onPress={this.pushScreen}/>
                                <Item title={'top sell for you and me and all '}
                                      style={styles.item}
                                      price={'50,000'}
                                      disscount={'150,000'}
                                      imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                                      onPress={this.pushScreen}/>

                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeceb'
    },
    item: {flex: 1, minWidth: 120},
    row: {

        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },

});

export default NavigationTypes;
