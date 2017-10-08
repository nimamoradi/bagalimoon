import React from 'react';
import {StyleSheet, ScrollView, View, ListView, Dimensions, ViewPagerAndroid} from 'react-native';
import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'
import TypeButton from '../components/TypeButton'
import server from '../code'
import Loading from '../components/loadScreen'

let context;

class NavigationTypes extends React.Component {
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        if (sendTOHome)
            this.props.navigator.pop();

    };

    loadData() {

        console.log("get data");
        fetch(server.getServerAddress() + '/app', {
            method: 'GET',

        }).then((response) => response.json().then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);

                context.setState({Items: responseData})
                context.componentDidMount();
            }).catch(error => {
                console.log(error);
                alert('اینترنت قطع است')
            })
        );


    }

    loadCategories() {

        console.log("get Categories");

        fetch(server.getServerAddress() + '/api/getAllCategories', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);
                context.setState({Categories: responseData})
                context.componentDidMount();
            }).catch(error => {
                alert('اینترنت قطع است')
            })
        );


    }

    showLightBox = (screen, passProps) => (
        this.props.navigator.showLightBox({
            screen: screen,
            passProps: passProps,
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        }));

    componentDidMount() {
        this.setState({
            dataSourceItem: this.state.ds.cloneWithRows(this.state.Items),
            dataSourceTypes: this.state.ds.cloneWithRows(this.state.Categories),
        });
    }

    constructor(props) {
        super(props);


        this.props.navigator.setDrawerEnabled({side: 'right', enabled: true});
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            ds: ds,
            dataReady: false,
            Items: '',
            Categories: '',
            dataSourceItem: ds.cloneWithRows([]),
            dataSourceTypes: ds.cloneWithRows([]),
            dataSourceOffer: [{
                imageUrl: 'https://file.digi-kala.com/digikala/Image/Webstore/Product/P_117401/Original/Persil-Millions-For-Colored-Clothes-Automatic-Washing-Liquid-2-7-Liter-43cfc2.JPG',
                action_name: 'offer', id: '0', onPress: (() => this.offer('تنقلات',
                    'https://file.digi-kala.com/digikala/Image/Webstore/Product/P_117401/Original/Persil-Millions-For-Colored-Clothes-Automatic-Washing-Liquid-2-7-Liter-43cfc2.JPG', 'توضیحات', '1000', '0'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', id: '1', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '55154', '1'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', id: '2', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '55154', '2'))
            }, {
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                action_name: 'offer', id: '3', onPress: (() => this.offer('تنقلات',
                    'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg', 'توضیحات', '55154', '3'))
            }],
        };
        context = this;
        this.loadCategories();
        this.loadData();

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


    pushScreen = (screen, title, passProps) => {
        this.props.navigator.push({
            screen: screen,
            title: title,
            passProps: passProps,
        });
    };

    TypePage = (title) => {
        this.props.navigator.push({
            screen: 'example.TypePage',
            title: 'hi',
            passProps: {
                title: title,
                Categories: this.props.Categories,
            },
        });
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together

        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'back') { // this is the same id field from the static navigatorButtons definition
                this.toggleDrawer()
            }
            if (event.id === 'ShoppingBasket') {
                this.showLightBox('example.Types.basketLightBox', {
                    title: this.props.title,

                    onClose: this.dismissLightBox,
                },);
            }
        }
    }


    render() {

        let tmp = this.state.dataSourceOffer;
        // for (var i = 0; i < this.state.dataSourceOffer.length; i++) {
        //     tmp.push(i);
        // }
        let indents = tmp.map(function (i) {
            return (
                <View>
                    <ImageRow className='indent' key={i.id} imageUrl={i.imageUrl} title={i.action_name}
                              onPress={i.onPress}/>
                </View>
            );
        });
        return (
            <ScrollView>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {(this.state.dataReady === true) ? <Loading/> : null}
                </View>
                <ViewPagerAndroid
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width / 2}}
                    initialPage={0}>
                    {indents}
                </ViewPagerAndroid>


                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '10%'}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.dataSourceTypes}
                    renderRow={(rowData) => {
                        if (rowData.parent_category_id === 0)
                            return <TypeButton title={rowData.name} onPress={() => this.TypePage(rowData.name)}/>
                        else return null;
                    }
                    }
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
                        <Item title={rowData.name}
                              style={styles.item}
                              price={rowData.price}
                              disscount={rowData.off}
                              imageUrl={server.getServerAddress() + rowData.photo.file}
                              onPress={() => this.offer(rowData.name, server.getServerAddress() + rowData.photo.file,
                                  rowData.long_description, rowData.price, rowData.id)}
                        />}
                />
                <Header style={{width: '100%', height: '10'}} title="پرفروش ترین ها"/>
                <ListView
                    style={{flexDirection: 'row', width: '100%', height: '35%'}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.dataSourceItem}
                    renderRow={(rowData) =>
                        <Item title={rowData.name}
                              style={styles.item}
                              price={rowData.price}
                              onPress={() => this.offer(rowData.name, 'http://10.0.2.2/superserver/public' + rowData.photo.file,
                                  rowData.long_description, rowData.price, rowData.id)}
                              disscount={rowData.off}
                              imageUrl={'http://10.0.2.2/superserver/public' + rowData.photo.file}
                        />}
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