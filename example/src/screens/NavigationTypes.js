import React from 'react';
import {
    ScrollView,
    View,
    Dimensions,
    FlatList,
    } from 'react-native';
import fetch from '../fetch'
import ImageRow from "../components/ImageRow";
import Header from '../components/header'
import Item from '../components/item'
import TypeButton from '../components/TypeButton'
import server from '../code'
import Loading from '../components/loadScreen'
import Carousel from 'react-native-snap-carousel';
import {vw, vh, vmin, vmax} from '../viewport'
import _ from 'lodash'
import basketFile from '../basketFile'
import HockeyApp from 'react-native-hockeyapp'
import NavBar from '../components/navBar'

let loaded = false;
let context;

class NavigationTypes extends React.Component {
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        if (sendTOHome)
            this.props.navigator.pop();

    };

    componentWillUnmount() {
        let SpecialOffer = context.state.SpecialOffer;

        let BestSellingProducts = context.state.BestSellingProducts;

        BestSellingProducts = _.unionBy(BestSellingProducts, SpecialOffer, "id");
        basketFile.writeAndUpdateAutoDec(BestSellingProducts);
    }

    getBestSellingProducts() {

        // console.log("get data");
        fetch(server.getServerAddress() + '/api/getBestSellingProducts', {
            method: 'POST', retries: 5

        }).then((response) => response.json().then((responseData) => {
                let lastBasket = basketFile.getBasket();

                for (let j = 0; j < lastBasket.length; j++) {
                    for (let i = 0; i < responseData.length; i++) {
                        if (lastBasket[j].id === responseData[i].id) {
                            responseData[i].count = lastBasket[j].count;
                        }
                    }
                }
                context.setState({
                    BestSellingProducts: responseData,
                })

            }).catch(error => {
                if (!loaded) {
                    server.retry(context.isAvailable, context);
                    loaded = true;
                }
            })
        );


    }

    getSpecialOffer() {

        // console.log("get data");
        fetch(server.getServerAddress() + '/api/getSpecialOffer', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {
                let lastBasket = basketFile.getBasket();

                for (let j = 0; j < lastBasket.length; j++) {
                    for (let i = 0; i < responseData.length; i++) {
                        if (lastBasket[j].id === responseData[i].id) {
                            responseData[i].count = lastBasket[j].count;
                        }
                    }
                }
                context.setState({
                    SpecialOffer: responseData,
                })

            }).catch(error => {
                if (!loaded) {
                    server.retry(context.isAvailable, context);
                    loaded = true;
                }

            })
        );
        context.setState({});

    }

    loadCategories() {

        // console.log("get Categories");

        fetch(server.getServerAddress() + '/api/getAllCategories', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {

                context.setState({Categories: responseData}, function () {


                    let cat = this.state.Categories.filter(function (x) {
                        return x.parent_category_id === 0;
                    });
                    context.setState({Types: cat})
                })
            }).catch(error => {
                if (!loaded) {//check that is it in retry page
                    server.retry(context.isAvailable, context);
                    loaded = true;
                }

            })
        );


    }

    isAvailable = () => {
        context.setState({dataReady: false});
        loaded = false;
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.setState({dataReady: true});
                this.getBanners();
                this.loadCategories();
                this.getSpecialOffer();
                this.getBestSellingProducts();

            })
            .catch(error => {
                if (!loaded) {
                    server.retry(context.isAvailable, context);
                    loaded = true;
                }

            });
    };

    goToBanner = (LinkTo, Link_id) => {
        let title;

        if (LinkTo === 'categories') {
            let cat = context.state.Categories;
            for (let key in cat) {
                if (cat[key].id === Link_id) {
                    title = cat[key].name;
                    break;
                }
            }
            context.TypePage(title);
        } else {

            alert('این جا رو درست کن')
            // this.props.navigator.push({
            //     screen: 'example.Types.offer',
            //     title: title,
            //     passProps: {
            //         title: title,
            //         imageUrl: imageUrl,
            //         des: des,
            //         price: price,
            //         id: id,
            //         myNumber: count,
            //         disscount: disscount,
            //         off: off,
            //         onUP: this.onUp_SpecialOffer,
            //         onDown: this.onDown_SpecialOffer,
            //     },
            //
            //
            // });
        }


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

            // console.log("get Banners" + responseData);


            context.setState({dataSourceOffer: responseData, banners: responseData})

        }).catch(error => {
            if (!loaded) {
                server.retry(context.isAvailable, context);
                loaded = true;
            }

        }));


    }

    componentWillMount() {
        HockeyApp.configure('d1de9e5fa7984b029c084fa1ff56672e', true);
    }

    componentDidMount() {
        HockeyApp.start();
        HockeyApp.checkForUpdate(); // optional
        // basketFile.setBasket(this.props.basket);
        this.isAvailable();
    }

    constructor(props) {
        super(props);


        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});

        this.state = {
            dataReady: false,
            SpecialOffer: '',
            BestSellingProducts: [],
            Categories: '',
            Types:[],
            dataSourceOffer: [],
            banners: [],
        };
        context = this;

    }


    toggleDrawer = () => {
        let SpecialOffer = context.state.SpecialOffer;//.filter(function (item) {
        //    return item.count>0;
        // });
        let BestSellingProducts = context.state.BestSellingProducts;//.filter(function (item) {
        //     return item.count>0;
        // });

        BestSellingProducts = _.unionBy(BestSellingProducts, SpecialOffer, "id");
        basketFile.writeAndUpdateAutoDec(BestSellingProducts);

        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };
    onUp_SpecialOffer = (countNumber, id) => {
        let updatedState = context.state.SpecialOffer;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']++;

        context.setState({SpecialOffer: updatedState});
    };
    onDown_SpecialOffer = (countNumber, id) => {
        let updatedState = context.state.SpecialOffer;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']--;

        context.setState({SpecialOffer: updatedState});
    };
    onUp_BestSellingProducts = (countNumber, id) => {
        let updatedState = context.state.BestSellingProducts;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']++;

        context.setState({BestSellingProducts: updatedState});
    };
    onDown_BestSellingProducts = (countNumber, id) => {
        let updatedState = context.state.BestSellingProducts;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']--;

        context.setState({BestSellingProducts: updatedState});
    };
    offerBestSellingProducts = (title, imageUrl, des, price, id, disscount, off, count) => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: title,
            passProps: {
                title: title,
                imageUrl: imageUrl,
                des: des,
                price: price,
                id: id,
                myNumber: count,
                disscount: disscount,
                off: off,
                onUP: this.onUp_BestSellingProducts,
                onDown: this.onDown_BestSellingProducts,
            },


        });
    };
    offerSpecialOffer = (title, imageUrl, des, price, id, disscount, off, count) => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: title,
            passProps: {
                title: title,
                imageUrl: imageUrl,
                des: des,
                price: price,
                id: id,
                myNumber: count,
                disscount: disscount,
                off: off,
                onUP: this.onUp_SpecialOffer,
                onDown: this.onDown_SpecialOffer,
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


        let SpecialOffer = context.state.SpecialOffer;

        let BestSellingProducts = context.state.BestSellingProducts;//.filter(function (item) {

        BestSellingProducts = _.unionBy(BestSellingProducts, SpecialOffer, "id");
        basketFile.writeAndUpdateAutoDec(BestSellingProducts);
        this.props.navigator.push({
            screen: 'example.TypePage',
            title: 'لیست محصولات',
            passProps: {
                title: title,
                basket: basketFile.getBasket(),
                Categories: this.state.Categories,
            },
        });
    };

    basket = () => {
        let SpecialOffer = context.state.SpecialOffer;

        let BestSellingProducts = context.state.BestSellingProducts;

        BestSellingProducts = _.unionBy(BestSellingProducts, SpecialOffer, "id");
        basketFile.writeAndUpdateAutoDec(BestSellingProducts);

        server.showLightBox('example.Types.basketLightBox', {
            title: this.props.title,
            onClose: this.dismissLightBox,
        }, context);

    };


    static _renderItem({item, index}) {
        return (
            <View style={{height: 35 * vh}}>
                <ImageRow className='indent' key={item.id}
                          imageUrl={server.getServerAddress() + item.photo}
                          title={item.description}
                          onPress={() => context.goToBanner(item.LinkTo, item.Link_id)}
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
                    <NavBar menu={this.toggleDrawer} basket={this.basket}/>
                    <Carousel
                        autoplayInterval={5000}
                        autoplayDelay={5000}
                        autoplay={true}
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.state.dataSourceOffer}
                        renderItem={NavigationTypes._renderItem}
                        sliderHeight={vh * 2}
                        itemHeight={vh * 35}
                        sliderWidth={100 * vw}
                        itemWidth={100 * vw}
                    />
                    <FlatList
                        style={{
                            flexDirection: 'row', height: 11 * vh,
                            margin: 1 * vh, flex: 1,
                            borderRadius: 2 * vh, borderColor: '#c495c150', borderWidth: vw / 1.75,
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Types}
                        renderItem={({item}) =><TypeButton title={item.name} onPress={() => this.TypePage(item.name)}/>}
                    />

                    <Header style={{width: '100%', height: vh * 10}} title="پیشنهاد ویژه"/>


                    <FlatList
                        style={{flexDirection: 'row', width: 100 * vw, height: 50 * vh}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.SpecialOffer}
                        renderItem={({item}) => <Item title={item.name}
                                                      count={item.count}
                                                      onUp={() => this.onUpSpecialOffer(item)}
                                                      onDown={() => this.onDownSpecialOffer(item)}
                                                      price={item.price}
                                                      disscount={(item.off !== 0) ? item.main_price : null}
                                                      imageUrl={server.getServerAddress() + '/' + item.photo}
                                                      onPress={() => this.offerSpecialOffer(item.name, server.getServerAddress() + item.photo,
                                                          item.long_description, item.price, item.id, item.main_price, item.off, item.count)}
                        />}
                    />
                    <Header style={{width: '100%', height: vh * 10}} title="پرفروش ترین ها"/>

                    <FlatList
                        style={{flexDirection: 'row', width: 100 * vw, height: 50 * vh}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.BestSellingProducts}
                        renderItem={({item}) => <Item title={item.name}
                                                      count={item.count}
                                                      onUp={() => this.onUpBestSellingProducts(item)}
                                                      onDown={() => this.onDownBestSellingProducts(item)}
                                                      price={item.price}
                                                      disscount={(item.off !== 0) ? item.main_price : null}
                                                      imageUrl={server.getServerAddress() + '/' + item.photo}
                                                      onPress={() => this.offerBestSellingProducts(item.name, server.getServerAddress() + item.photo,
                                                          item.long_description, item.price, item.id, item.main_price, item.off, item.count)}
                        />}
                    />


                </ScrollView>
            );

    }

    onUpSpecialOffer = (rowdata) => {

        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.SpecialOffer;

        updatedState[updatedState.indexOf(rowdata)]['count']++;
        // updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        // console.log(updatedState);

        this.setState({SpecialOffer: updatedState});

    };
    onDownSpecialOffer = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.SpecialOffer;

        let data = this.state.SpecialOffer;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;
            // updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        }
        // console.log(updatedState);
        this.setState({SpecialOffer: updatedState,});

    };
    onUpBestSellingProducts = (rowdata) => {

        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.BestSellingProducts;

        updatedState[updatedState.indexOf(rowdata)]['count']++;
        // updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        // console.log(updatedState);

        this.setState({BestSellingProducts: updatedState});

    };
    onDownBestSellingProducts = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.BestSellingProducts;

        let data = this.state.BestSellingProducts;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;
            // updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        }
        // console.log(updatedState);
        this.setState({BestSellingProducts: updatedState,});

    };
}


export default NavigationTypes;