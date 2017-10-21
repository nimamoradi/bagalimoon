import React from 'react';
import {StyleSheet, ScrollView, View, ListView, Dimensions, ViewPagerAndroid} from 'react-native';
import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'
import TypeButton from '../components/TypeButton'
import server from '../code'
import Loading from '../components/loadScreen'
import Carousel from 'react-native-snap-carousel';
import {vw, vh, vmin, vmax} from '../viewport'

let context;
let maunal = false;
let isFirstTime = true;

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
                    context.setState({dataSourceTypes: this.state.ds.cloneWithRows(this.state.Categories),})
                })
            }).catch(error => {
                server.retry(context.isAvailable, context)
            })
        );


    }

    isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 4000, 'Request timed out');
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
                this.showLightBox('example.Types.basketLightBox', {
                    title: this.props.title,

                    onClose: this.dismissLightBox,
                },);
            }
        }
    }

    _renderItem({item, index}) {
        return (
            <View>
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
                <ScrollView
                    onLayout={() => {
                        this.setState({
                            viewport: {
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height / 2.25
                            }
                        });
                    }}>


                    <Carousel
                        autoplayInterval={5000}
                        autoplayDelay={5000}
                        autoplay={true}
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.state.dataSourceOffer}
                        renderItem={this._renderItem}
                        sliderHeight={vh * 40}
                        itemHeight={vh * 40}
                        sliderWidth={this.state.viewport.width}
                        itemWidth={this.state.viewport.width}
                    />

                    <ListView
                        style={{
                            flexDirection: 'row', width: '100%', height: vh * 22,
                            margin: 5,
                            borderRadius: 2 * vh, borderColor: '#c495c1', borderWidth: vw / 1.75,
                        }}
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
                    <Header style={{width: '100%', height: vh * 10}} title="پیشنهاد ویژه"/>


                    <ListView
                        style={{flexDirection: 'row', width: '100%', height: '35%'}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        dataSource={this.state.dataSourceSpecialOffer}
                        renderRow={(rowData) =>
                            <Item title={rowData.name}
                                  style={styles.item}
                                  price={rowData.price}
                                  disscount={(rowData.off !== 0) ? rowData.main_price : null}
                                  imageUrl={server.getServerAddress() + rowData.photo.file}
                                  onPress={() => this.offer(rowData.name, server.getServerAddress() + rowData.photo.file,
                                      rowData.long_description, rowData.price, rowData.id, rowData.main_price, rowData.off)}
                            />}
                    />

                    <Header style={{width: '100%', height: vh * 10}} title="پرفروش ترین ها"/>
                    <ListView
                        style={{flexDirection: 'row', width: '100%', height: '35%'}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        dataSource={this.state.dataSourceBestSellingProducts}
                        renderRow={(rowData) =>
                            <Item title={rowData.name}
                                  style={styles.item}
                                  price={rowData.price}
                                  disscount={(rowData.off !== 0) ? rowData.main_price : null}
                                  onPress={() => this.offer(rowData.name, 'http://10.0.2.2/superserver/public' + rowData.photo.file,
                                      rowData.long_description, rowData.price, rowData.id, rowData.main_price, rowData.off)}

                                  imageUrl={server.getServerAddress() + rowData.photo.file}
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