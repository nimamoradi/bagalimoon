import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions,
    ViewPagerAndroid
} from 'react-native';

import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'
import TypeButton from '../components/TypeButton'
import server from '../code'
import Loading from '../components/loadScreen'
import Carousel from 'react-native-snap-carousel';
import {vw, vh, vmin, vmax} from '../viewport'


let maunal = false;
let context;
class NavigationTypes extends React.Component {
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        if (sendTOHome)
            this.props.navigator.pop();

    };

    getBestSellingProducts() {

        console.log("get data");
        fetch(server.getServerAddress() + '/api/getBestSellingProducts', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {

                context.setState({BestSellingProducts: responseData}, () => {
                    maunal = true;
                    context.setState({dataSourceBestSellingProducts: this.state.ds.cloneWithRows(this.state.BestSellingProducts),})

                })
            }).catch(error => {
                console.log(error);

            })
        );


    }

    getSpecialOffer() {

        console.log("get data");
        fetch(server.getServerAddress() + '/api/getSpecialOffer', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {

                context.setState({SpecialOffer: responseData}, () => {
                    maunal = true;
                    context.setState({dataSourceSpecialOffer: this.state.ds.cloneWithRows(this.state.SpecialOffer),})
                })
            }).catch(error => {
                server.retry(context.isAvailable, context)
            })
        );
        context.setState({});

    }

    loadCategories() {

        console.log("get Categories");

        fetch(server.getServerAddress() + '/api/getAllCategories', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {

                context.setState({Categories: responseData}, function () {

                    maunal = true;
                    let cat = this.state.Categories.filter(function (x) {
                        return x.parent_category_id === 0;
                    });
                    context.setState({dataSourceTypes: this.state.ds.cloneWithRows(cat),})
                })
            }).catch(error => {
                server.retry(context.isAvailable, context)
            })
        );


    }

    isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.setState({dataReady: true});
                this.loadCategories();
                this.getBestSellingProducts();
                this.getSpecialOffer();
                this.getBanners();
            })
            .catch(error => {
                server.retry(this.isAvailable, context)
            });
    };


    getBanners() {


        fetch(server.getServerAddress() + '/api/getBanners', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: context.props.api_code,
            })
        }).then((response) => response.json().then((responseData) => {
            context.setState({banners: responseData}, function () {
                console.log("get Banners" + responseData);
                maunal = true;

                context.setState({dataSourceOffer: this.state.banners})
            })
        }).catch(error => {
            server.retry(context.isAvailable, context)
        }));


    }

    componentDidMount() {

        this.isAvailable();
    }

    constructor(props) {
        super(props);


        this.props.navigator.setDrawerEnabled({side: 'right', enabled: true});
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            ds: ds,
            dataReady: false,
            SpecialOffer: '',
            BestSellingProducts: '',
            Categories: '',
            dataSourceBestSellingProducts: ds.cloneWithRows({}),
            dataSourceSpecialOffer: ds.cloneWithRows({}),
            dataSourceTypes: ds.cloneWithRows({}),
            dataSourceOffer: [],
            banners: [],
            viewport: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 2.5
            }
        };
        context = this;

    }


    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };
    offer = (title, imageUrl, des, price, id, disscount, off) => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: title,
            passProps: {
                title: title,
                imageUrl: imageUrl,
                des: des,
                price: price,
                id: id,
                myNumber:0,
                disscount: disscount,
                off: off
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
            title: 'لیست محصولات',
            passProps: {
                title: title,
                Categories: this.state.Categories,
            },
        });
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together

        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'back') { // this is the same id field from the static navigatorButtons definition
                this.toggleDrawer()
            }
            if (event.id === 'ShoppingBasket') {
                server.showLightBox('example.Types.basketLightBox', {
                    title: this.props.title,

                    onClose: this.dismissLightBox,
                },context);
            }
        }
    }

    _renderItem({item, index}) {
        return (
            <View style={{height:35*vh}}>
                <ImageRow className='indent' key={item.id}
                          imageUrl={server.getServerAddress() + item.photo}
                          title={item.description}
                />
            </View>
        );
    }

    render() {
        if (!this.state.dataReady) return <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Loading/>
        </View>;
        else
            return (
                <ScrollView>


                    <Carousel

                        autoplayInterval={5000}
                        autoplayDelay={5000}
                        autoplay={true}
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.state.dataSourceOffer}
                        renderItem={this._renderItem}
                        sliderHeight={vh * 2}
                        itemHeight={vh * 35}
                        sliderWidth={100*vw}
                        itemWidth={100*vw}
                    />

                    <ListView
                        style={{

                            flexDirection: 'row', height:11*vh,
                            margin: 1*vh, flex: 1,
                            borderRadius: 2 * vh, borderColor: '#c495c150', borderWidth: vw / 1.75,
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        dataSource={this.state.dataSourceTypes}
                        renderRow={(rowData) => {
                            return <TypeButton title={rowData.name} onPress={() => this.TypePage(rowData.name)}/>
                        }
                        }
                    />
                    <Header style={{width: '100%', height: vh * 10}} title="پیشنهاد ویژه"/>


                    <ListView
                        style={{flexDirection: 'row', width: 100*vw, height:50*vh}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        dataSource={this.state.dataSourceSpecialOffer}
                        renderRow={(rowData) =>

                            <Item title={rowData.name}

                                  price={rowData.price}
                                  disscount={(rowData.off !== 0) ? rowData.main_price : null}
                                  imageUrl={server.getServerAddress()+'/' + rowData.photo}
                                  onPress={() => this.offer(rowData.name, server.getServerAddress() + rowData.photo,
                                      rowData.long_description, rowData.price, rowData.id, rowData.main_price, rowData.off)}
                            />}
                    />

                    <Header style={{width: '100%', height: vh * 10}} title="پرفروش ترین ها"/>

                    <ListView
                        style={{flexDirection: 'row', width: 100*vw, height:50*vh}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        dataSource={this.state.dataSourceBestSellingProducts}
                        renderRow={(rowData) =>

                            <Item title={rowData.name}
                                  price={rowData.price}
                                  disscount={(rowData.off !== 0) ? rowData.main_price : null}
                                  imageUrl={server.getServerAddress()+'/' + rowData.photo}
                                  onPress={() => this.offer(rowData.name, server.getServerAddress() + rowData.photo,
                                      rowData.long_description, rowData.price, rowData.id, rowData.main_price, rowData.off)}
                            />}
                    />

                </ScrollView>
            );

    }
    onUp = (rowdata) => {

        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.viewDate;
        let updatedbasket = this.state.basket;
        updatedState[updatedState.indexOf(rowdata)]['count']++;
        updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        console.log(updatedState);

        this.setState({viewDate: updatedState, basket: updatedbasket});

    };
    onDown = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.viewDate;
        let updatedbasket = this.state.basket;
        let data = this.state.viewDate;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;
            updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        }
        console.log(updatedState);
        this.setState({viewDate: updatedState, basket: updatedbasket});

    };

}



export default NavigationTypes;