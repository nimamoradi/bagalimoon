import React from 'react';
import {StyleSheet, ScrollView, View, ListView, Text, Dimensions, Image} from 'react-native';
import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'


const sliderWidth = Dimensions.get('window').width;


class NavigationTypes extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSourceOffer: ds.cloneWithRows([{
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }]),


            dataSourceItem: ds.cloneWithRows([{
                imageUrl: 'https://www.w3schools.com/css/lights600x400.jpg',
                title: 'light',
                disscount: 'توضیحات', price: '100'
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                title: 'offer', price: '100', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                title: 'offer', price: '100', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                title: 'ofsadasdad asdsadfer', price: '100', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات'))
            }
            ]),

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
            <ScrollView>


                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '30%'}}
                    horizontal={true}
                    dataSource={this.state.dataSourceOffer}
                    renderRow={(rowData) => <ImageRow title={rowData.action_name} imageUrl={rowData.imageUrl}
                                                      onPress={rowData.onPress}/>}
                />
                <Header style={{width: '100%', height: '10'}} title="پیشنهاد ویژه"/>
                {/*<ImageRow title={'top sell'}*/}
                {/*style={{flex: 1}}*/}
                {/*imageUrl={'https://www.w3schools.com/css/paris.jpg'}*/}
                {/*onPress={this.pushScreen}/>*/}


                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />
                <Header style={{width: '100%', height: '10'}} title="پرفروش ترین ها"/>
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}

                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.title}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.disscount}
                              imageUrl={'https://www.w3schools.com/css/img_forest.jpg'}
                              onPress={this.pushScreen}/>}
                />


            </ScrollView>
        );

    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeceb'
    },


    item: {
        width: 380,
        height: 150,
    },
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
