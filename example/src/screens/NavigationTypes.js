import React from 'react';
import {StyleSheet, ScrollView, View, ListView, Text, Dimensions, Image,ViewPagerAndroid} from 'react-native';
import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'
import TypeButton from '../components/TypeButton'

const sliderWidth = Dimensions.get('window').width;


class NavigationTypes extends React.Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {

            dataSourceOffer:[{
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer',id:'0', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '1000', '2'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer',id:'1', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '55154', '1'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer',id:'2', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '55154', '1'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer',id:'3', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '55154', '1'))
            }],
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
            dataSourceTypes: ds.cloneWithRows(['پروتین', 'غذایی', 'تنقلات', 'شوینده', 'نان', 'لبنیات'])

        };
    }


    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };
    offer = (title, imageUrl, des, price, id) => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: 'hot offer',
            passProps: {
                title: title,
                imageUrl: imageUrl,
                des: des,
                price: price,
                id: id
            },


        });
    };


    pushScreen = () => {
        this.props.navigator.push({
            screen: 'example.Types.test',
            title: 'list view',

        });
    };

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

       let tmp=   this.state.dataSourceOffer;
        // for (var i = 0; i < this.state.dataSourceOffer.length; i++) {
        //     tmp.push(i);
        // }
        let indents = tmp.map(function (i) {
            return (
                <View>
                    <ImageRow className='indent'  key={i.id}  imageUrl={ i.imageUrl } title={i.action_name} onPress={i.onPress}/>
                </View>
            );
        });
        return (
            <ScrollView>
                <ViewPagerAndroid
                    style={{width:400,height:400}}
                    initialPage={0}>
                    {indents}
                </ViewPagerAndroid>


                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '10%'}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.dataSourceTypes}
                    renderRow={(rowData) =>
                        <TypeButton title={rowData}/>}
                />
                <Header style={{width: '100%', height: '10'}} title="پیشنهاد ویژه"/>
                {/*<ImageRow title={'top sell'}*/}
                {/*style={{flex: 1}}*/}
                {/*imageUrl={'https://www.w3schools.com/css/paris.jpg'}*/}
                {/*onPress={this.pushScreen}/>*/}


                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
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
                    showsHorizontalScrollIndicator={false}
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
