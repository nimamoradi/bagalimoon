import React from 'react';
import {
    ScrollView,
    View,
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
import HockeyApp from 'react-native-hockeyapp'
import NavBar from '../components/navBar'
import dataHandeling from '../dataHandeling'
import _ from 'lodash'
import basketFile from "../basketFile";
import TimerMixin from "react-timer-mixin";
import codePush from "react-native-code-push";
let loaded = false;
let context;


class NavigationTypes extends React.Component {
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        // if (sendTOHome)
        //     this.props.navigator.pop();

    };

    static setBasket(basket) {
        context.setState({superBasket: basket})
    }

    static basketUpdater(newItems) {
        let basket = context.state.superBasket.slice();

        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < newItems.length; j++) {
                if (basket[i].id === newItems[j].id) {
                    basket[i] =
                        Object.assign({}, basket[i], newItems[j]);//upDating value of item in old basket
                    newItems[j].wasInBasket = true;
                }
            }
        }
        newItems = newItems.filter(function (item) {
            if (!item.hasOwnProperty('wasInBasket')) {////adding new  item to old basket
                return item.count > 0;

            } else {
                delete item.wasInBasket;
                return false;
            }

        });
        context.setState({superBasket: basket.concat(newItems)})

    }

    getBestSellingProducts() {

        // console.log("get data");
        fetch(server.getServerAddress() + '/api/getBestSellingProducts', {
            method: 'POST', retries: 5

        }).then((response) => response.json().then((responseData) => {

                responseData = responseData.map(function (item) {
                    item.isBestSellingProduct = true;
                    item.shouldShow = true;
                    return item;
                });
                context.setState({
                    superBasket: dataHandeling.AddBasket(responseData, this.state.superBasket),
                })

            }).catch(error => {
                console.log(error);
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


                responseData = responseData.map(function (item) {
                    item.isSpecialOffer = true;
                    item.shouldShow = true;
                    return item;
                });

                context.setState({
                    superBasket: dataHandeling.AddBasket(responseData, this.state.superBasket),
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

        const request = fetch(server.getInternetCheckAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.setState({dataReady: true});


                setTimeout(() => {
                    this.getBanners();
                }, 20);
                setTimeout(() => {
                    this.loadCategories();
                }, 20);
                setTimeout(() => {
                    this.getSpecialOffer();
                }, 20);
                setTimeout(() => {
                    this.getBestSellingProducts();
                }, 20);


            })
            .catch(error => {
                if (!loaded) {
                    server.retry(context.isAvailable, context);
                    loaded = true;
                }

            });
    };


    goToBanner = (LinkTo, Link_id, response) => {
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
        } else if (LinkTo === 'product') {
            let item;
            let index = dataHandeling.indexOfId(context.state.superBasket, response.product.id);
            if (index !== -1) {
                item = context.state.superBasket[index];
            } else {
                item = {
                    title: response.product.name,
                    imageUrl: server.getServerAddress() + response.product.photo.file,
                    des: response.product.long_description,
                    price: response.product.min_price,
                    id: response.product.id,
                    count: 0,
                    disscount: response.product.price,
                    off: response.product.off,
                    shouldShow: false
                };
                context.setState({
                    superBasket: context.state.superBasket.push(item)
                })
            }

            this.props.navigator.push({
                screen: 'example.Types.offer',
                title: response.product.name,
                passProps: {
                    title: response.product.name,
                    imageUrl: server.getServerAddress() + response.product.photo.file,
                    des: response.product.long_description,
                    price: response.product.min_price,
                    id: response.product.id,
                    myNumber: item.count,
                    disscount: response.product.price,
                    off: response.product.off,
                    onUP: this.onUp_SpecialOffer,
                    onDown: this.onDown_SpecialOffer,

                },


            });
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

    componentWillUnmount() {
        basketFile.writeBasket(context.state.superBasket)
        super.componentWillUnmount();
    }


    componentWillMount() {

        HockeyApp.configure('d1de9e5fa7984b029c084fa1ff56672e', true);
    }

    componentDidMount() {
        HockeyApp.start();
        HockeyApp.checkForUpdate(); // optional
        basketFile.readBasket().then((item) => {
            context.setState({superBasket: item}, () => {
                this.isAvailable();
            });

        });

    }

    constructor(props) {
        super(props);


        this.props.navigator.setDrawerEnabled({side: 'right', enabled: true});

        this.state = {
            dataReady: false,
            SpecialOffer: '',
            BestSellingProducts: [],
            Categories: '',
            Types: [],
            dataSourceOffer: [],
            banners: [],
            superBasket: []
        };
        context = this;

    }

    static getBasket() {
        return context.state.getBasket;
    }

    toggleDrawer = () => {

        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true,
            basket: context.getBasket,
            api_code: context.props.api_code
        });
    };
    onUp_SpecialOffer = (countNumber, id) => {
        let updatedState = context.state.superBasket;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']++;

        context.setState({superBasket: updatedState});
    };
    onDown_SpecialOffer = (countNumber, id) => {
        let updatedState = context.state.superBasket;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']--;

        context.setState({superBasket: updatedState});
    };
    onUp_BestSellingProducts = (countNumber, id) => {
        let updatedState = context.state.superBasket;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']++;

        context.setState({superBasket: updatedState});
    };
    onDown_BestSellingProducts = (countNumber, id) => {
        let updatedState = context.state.superBasket;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']--;

        context.setState({superBasket: updatedState});
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
        this.props.navigator.push({
            screen: 'example.TypePage',
            title: 'لیست محصولات',
            passProps: {
                title: title,
                UpdateBasket: NavigationTypes.basketUpdater,
                basket: this.state.superBasket,
                Categories: this.state.Categories,
                setBasket: NavigationTypes.setBasket
            },
        });
    };

    basket = () => {
        server.showLightBox('example.Types.basketLightBox', {
            basket: this.state.superBasket,
            title: this.props.title,
            onClose: this.dismissLightBox,
            UpdateBasket: NavigationTypes.basketUpdater,
            setBasket: NavigationTypes.setBasket
        }, context);

    };


    static _renderItem({item, index}) {
        return (
            <View style={{height: 35 * vh}}>
                <ImageRow className='indent' key={item.id}
                          imageUrl={server.getServerAddress() + item.photo}
                          title={item.description}
                          onPress={_.debounce(() => context.goToBanner(item.LinkTo, item.Link_id, item),
                              1000, {leading: true, trailing: false})}

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
                    <NavBar menu={() => this.toggleDrawer()} basket={this.basket}/>
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
                        loop={false}
                    />
                    <FlatList
                        style={{
                            flexDirection: 'row', height: 11 * vh,
                            margin: 1 * vh, flex: 1,
                            borderRadius: 2 * vh, borderColor: '#c495c150', borderWidth: vw / 1.75,
                        }}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Types}
                        renderItem={({item}) => <TypeButton title={item.name}
                                                            onPress={_.debounce(() => this.TypePage(item.name),
                                                                1000, {leading: true, trailing: false})}
                        />}
                    />

                    <Header style={{width: '100%', height: vh * 10}} title="پیشنهاد ویژه"/>


                    <FlatList
                        style={{flexDirection: 'row', width: 100 * vw, height: 55 * vh}}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.superBasket}
                        renderItem={({item}) => this.renderSpecialOffer(item)}
                    />
                    <Header style={{width: '100%', height: vh * 10}} title="پرفروش ترین ها"/>

                    <FlatList
                        style={{flexDirection: 'row', width: 100 * vw, height: 50 * vh}}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.superBasket}
                        renderItem={({item}) => this.renderBestSellingProducts(item)}
                    />


                </ScrollView>
            );

    }

    renderSpecialOffer(item) {

        if (item.hasOwnProperty('isSpecialOffer') && item.shouldShow === true) {//item.hasOwnProperty('isSpecialOffer')
            return <Item
                title={item.name}
                count={item.count}
                onUp={() => this.onUpSpecialOffer(item)}
                onDown={() => this.onDownSpecialOffer(item)}
                price={item.price}
                disscount={(item.off !== 0) ? item.main_price : null}
                imageUrl={server.getServerAddress() + '/' + item.photo}
                onPress={_.debounce(() => this.offerSpecialOffer(item.name, server.getServerAddress() + item.photo,
                    item.long_description, item.price, item.id, item.main_price, item.off, item.count),
                    1000, {leading: true, trailing: false})}

            />
        }
        return null;
    }

    renderBestSellingProducts(item) {

        if (item.hasOwnProperty('isBestSellingProduct') && item.shouldShow === true) {

            return <Item title={item.name}
                         count={item.count}
                         onUp={() => this.onUpBestSellingProducts(item)}
                         onDown={() => this.onDownBestSellingProducts(item)}
                         price={item.price}
                         disscount={(item.off !== 0) ? item.main_price : null}
                         imageUrl={server.getServerAddress() + '/' + item.photo}

                         onPress={_.debounce(() => this.offerBestSellingProducts(item.name, server.getServerAddress() + item.photo,
                             item.long_description, item.price, item.id, item.main_price, item.off, item.count),
                             1000, {leading: true, trailing: false})}
            />
            //Do this
        }
        return null;
    }


    onUpSpecialOffer = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        rowDataCopy.count++;
        let list = this.state.superBasket;
        let index = dataHandeling.indexOfId(list, rowdata.id);

        this.setState({
            superBasket: [...list.slice(0, index),
                rowDataCopy,
                ...list.slice(index + 1)]

        });
    };
    onDownSpecialOffer = (rowdata) => {

        let rowDataCopy = Object.assign({}, rowdata);
        if (rowDataCopy.count !== 0) {
            rowDataCopy.count--;
        }
        let list = this.state.superBasket;
        let index = dataHandeling.indexOfId(list, rowdata.id);

        this.setState({
            superBasket: [...list.slice(0, index),
                rowDataCopy,
                ...list.slice(index + 1)]

        });


    };
    onUpBestSellingProducts = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        rowDataCopy.count++;
        let list = this.state.superBasket;
        let index = dataHandeling.indexOfId(list, rowdata.id);

        this.setState({
            superBasket: [...list.slice(0, index),
                rowDataCopy,
                ...list.slice(index + 1)]

        });
    };
    onDownBestSellingProducts = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        if (rowDataCopy.count !== 0) {
            rowDataCopy.count--;
        }
        let list = this.state.superBasket;
        let index = dataHandeling.indexOfId(list, rowdata.id);

        this.setState({
            superBasket: [...list.slice(0, index),
                rowDataCopy,
                ...list.slice(index + 1)]

        });

    };
}

export default codePush(NavigationTypes);