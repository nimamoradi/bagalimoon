import React from 'react';
import {
    ScrollView,
    View,
    FlatList,
    AsyncStorage,
    AppState, Image, TextInput,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';

import fetch from '../../fetch'
import ImageRow from "./ImageRow";
import Header from './header'
import Item from './item'
import server from '../../code'

import Carousel from 'react-native-snap-carousel';
import {vw, vh} from '../../viewport'
import HockeyApp from 'react-native-hockeyapp'
import NavBar from '../../navBars/navBar'
import dataHandeling from '../../dataHandeling'
import _ from 'lodash'
import basketFile from "../../basketFile";
import ListViewCustum from "../../components/listViewCustum";


let context;


class NavigationTypes extends React.Component {
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
    };

    static setBasket(basket) {
        context.setState({superBasket: basket, basketSize: 0})
    }

    static basketUpdaterNoConcat(newItems) {//won't remove zero index and don't have concat
        let basket = context.state.superBasket.slice();
        let count = 0;
        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < newItems.length; j++) {
                if (basket[i].id === newItems[j].id) {
                    if (newItems[j].count === 0 && basket[i].count !== 0)
                        count--;//item removed
                    basket[i] =
                        Object.assign({}, basket[i], newItems[j]);//upDating value of item in old basket
                }
            }
        }

        context.setState({
            superBasket: basket,
            basketSize: context.state.basketSize + count
        });
        return basket;
    }

    static basketUpdater(newItems) {//won't remove zero index
        let basket = context.state.superBasket.slice();
        let count = 0;
        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < newItems.length; j++) {
                if (basket[i].id === newItems[j].id) {
                    if (newItems[j].count === 0 && basket[i].count !== 0)
                        count--;//item removed
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
        let bas = basket.concat(newItems);
        context.setState({
            superBasket: bas,
            basketSize: context.state.basketSize + count + newItems.length
        });
        return bas;

    }

    static basketUpdaterForTypePage(newItems) {//won't remove zero index
        let basket = context.state.superBasket.slice();
        let count = 0;
        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < newItems.length; j++) {
                if (basket[i].id === newItems[j].id) {
                    if (newItems[j].count === 0 && basket[i].count !== 0)
                        count--;//item removed
                    basket[i] =
                        Object.assign({}, basket[i], newItems[j]);//upDating value of item in old basket
                    newItems[j] = Object.assign({}, newItems[j], {wasInBasket: true});
                }
            }
        }
        newItems = newItems.filter(function (item) {
            if (!item.hasOwnProperty('wasInBasket')) {////adding new  item to old basket
                return item.count > 0;
            } else {
                // delete item.wasInBasket;
                return false;
            }

        });
        let bas = basket.concat(newItems);
        context.setState({
            superBasket: bas,
            basketSize: context.state.basketSize + count + newItems.length
        });
        return bas;

    }

    getBestSellingProducts(responseData) {

        responseData = responseData.map(function (item) {
            item.isBestSellingProduct = true;
            item.shouldShow = true;
            return item;
        });
        context.setState({
            superBasket: dataHandeling.AddBasket(responseData, this.state.superBasket),
        })
    }

    getSpecialOffer(responseData) {
        responseData = responseData.map(function (item) {
            item.isSpecialOffer = true;
            item.shouldShow = true;
            return item;
        });

        context.setState({
            superBasket: dataHandeling.AddBasket(responseData, this.state.superBasket),
        })


    }

    loadMainPage() {        // console.log("get Categories");

        context.setState({dataReady: false});
        (fetch(server.getServerAddress() + '/api/getMainPage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
            },
            body: JSON.stringify({
                api_code: context.props.api_code,
            })
        }).then((response) => response.json().then((responseData) => {

            this.getBanners(responseData.Banners);
            this.loadCategories(JSON.parse(responseData.AllCategories));
            this.getSpecialOffer(JSON.parse(responseData.SpecialOffer));
            this.getBestSellingProducts(JSON.parse(responseData.BestSellingProducts));

        }))
            .catch(ignored => {
                server.retryParam(context.loadMainPage, context);
            }).catch(ignored => {
                server.retryParam(context.loadMainPage, context);
            })).catch(ignored => {
            server.retryParam(this.loadRenderRowData, context,)
        });

    }

    loadCategories(responseData) {

        let cat = responseData.filter(function (x) {
            return x.parent_category_id === 0;
        });
        context.setState({
            Categories: responseData,
            Types: cat
        });

    }


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
        } else if (LinkTo === 'product' || LinkTo === 'products') {
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
                });
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
    onDown_SpecialOffer = (countNumber, id) => {
        let updatedState = context.state.superBasket;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']--;

        context.setState({superBasket: updatedState});
    };
    onUp_SpecialOffer = (countNumber, id) => {
        let updatedState = context.state.superBasket;

        let index = server.getIndex(id, updatedState, 'id');

        updatedState[index]['count']++;

        context.setState({superBasket: updatedState});
    };

    getBanners(responseData) {
        context.setState({dataSourceOffer: responseData, dataReady: true})
    }


    componentWillMount() {
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
         AsyncStorage.setItem('minimum_cart_price', this.props.minimum_cart_price.toString());
        HockeyApp.configure('d1de9e5fa7984b029c084fa1ff56672e', true);
    }

    componentDidMount() {
        HockeyApp.start();
        // if (Platform.OS !== 'ios')
        //     HockeyApp.checkForUpdate(); // optional
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
            superBasket: [],
            basketSize: 0,
            clickCount: 1

        };
        basketFile.readBasket().then((item) => {

            if (item === null) {
                this.loadMainPage();
            }
            else
                context.setState({superBasket: item, basketSize: item.length}, () => {
                    this.loadMainPage();
                });

        });

        context = this;
        AppState.addEventListener('change', state => {
            if (state === 'background') {
                basketFile.writeBasket(context.state.superBasket)
            } else if (state === 'inactive') {
                basketFile.writeBasket(context.state.superBasket)
            }
        });
    }

    numberFormat = (x) => {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };


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
            },
        });
    };

    pushScreen = (screen, title, passProps) => {
        this.props.navigator.push({
            screen: screen,
            navigatorStyle: {
                navBarHidden: true,
                navBarTitleTextCentered: true,
            },
            title: title,
            passProps: passProps,
        });

    };

    dummyTypePage = (item) => {
        this.props.navigator.push({
            screen: 'example.TypePage',
            title: 'لیست محصولات',
            passProps: {
                title: item.name,
                UpdateBasket: NavigationTypes.basketUpdaterForTypePage,
                basket: context.state.superBasket,
                Categories: context.state.Categories,
                setBasket: NavigationTypes.setBasket,
                basketSize: context.state.basketSize
            },
            navigatorStyle: {
                navBarTranslucent: true,
                navBarTitleTextCentered: true,
                navBarTextFontFamily: 'B Yekan',// Changes the title font
                navBarComponentAlignment: 'center',
            },
        });
    };

    TypePage = (item) => {
        this.props.navigator.push({
            screen: 'example.TypePage',
            title: 'لیست محصولات',
            passProps: {
                title: item,
                UpdateBasket: NavigationTypes.basketUpdater,
                basket: context.state.superBasket,
                Categories: context.state.Categories,
                setBasket: NavigationTypes.setBasket,
                basketSize: context.state.basketSize
            },
            navigatorStyle: {
                navBarTranslucent: true,
                navBarTitleTextCentered: true,
                navBarTextFontFamily: 'B Yekan',// Changes the title font
                navBarComponentAlignment: 'center',
            },
        });
    };

    basket = () => {
        let json = dataHandeling.basketFilter(this.state.superBasket);
        if (json.length > 0) {
            server.pushScreen('example.Types.basketPreview', 'لیست خرید',
                {
                    UpdateBasket: NavigationTypes.basketUpdaterNoConcat,
                    basket: json,
                    fullBasket: this.state.superBasket,
                    setBasket: NavigationTypes.setBasket
                }, this)
        } else {
            server.showLightBox('example.Types.basketLightBox', {
                basket: context.state.superBasket,
                title: context.props.title,
                onClose: context.dismissLightBox,
                UpdateBasket: NavigationTypes.basketUpdaterNoConcat,
                setBasket: NavigationTypes.setBasket
            }, context);
        }

    };


    static _renderItem({item, index}) {
        return (
            <View style={{height: 30 * vh}}>
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
        if (!this.state.dataReady) return null;
        else
            return (
                <ScrollView
                    style={{backgroundColor: '#f2f2f2'}}
                    showsVerticalScrollIndicator={false}>

                    <NavBar
                        basketSize={this.state.basketSize}
                        menu={() => this.toggleDrawer()} basket={this.basket}
                        search={() => this.pushScreen('example.FlatListSearch', 'جستجو',
                            {basket: this.state.superBasket, UpdateBasket: NavigationTypes.basketUpdater})}/>
                    {this.state.dataSourceOffer != null ? <Carousel
                        autoplayInterval={5000}
                        autoplayDelay={5000}
                        autoplay={true}
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.state.dataSourceOffer}
                        renderItem={NavigationTypes._renderItem}
                        sliderHeight={vh * 2}
                        itemHeight={vh * 30}
                        sliderWidth={100 * vw}
                        itemWidth={100 * vw}
                        loop={false}
                    /> : null}


                    <ListViewCustum
                        data={this.state.Types} action={this.dummyTypePage}/>

                    <Header title="پیشنهاد ویژه"/>

                    <FlatList
                        style={{
                            flexDirection: 'row',
                            width: 100 * vw, height: 45 * vh
                        }}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.superBasket}
                        renderItem={({item}) => this.renderSpecialOffer(item)}
                    />
                    <Header style={{height: vh * 10}} title="پرفروش ترین ها"/>

                    <FlatList
                        style={{flexDirection: 'row', width: 100 * vw, height: 45 * vh,}}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.superBasket}
                        renderItem={({item}) => this.renderBestSellingProducts(item)}
                    />

                    <TouchableWithoutFeedback onPress={() => {
                        if (context.state.clickCount % 6 === 0) {
                            server.alert('سازندگان', 'نیما مرادی \n امین اخوان صفار', context)
                        }
                        context.setState({clickCount: context.state.clickCount + 1})
                    }}>
                        <Image
                            resizeMode="cover"
                            style={{
                                top: 0,
                                left: 40 * vw,
                                bottom: 2,
                                right: 40 * vw,
                                position: 'absolute',
                                width: 24 * vw,
                                height: 24 * vw,
                            }}
                            source={require('../../../img/mainPage/icon.png')}/>
                    </TouchableWithoutFeedback>

                </ScrollView>
            );

    }

    gotoCategoryFromItem(item) {
        let Categories = context.state.Categories;
        if (server.getIndex(item.Category_id, Categories, 'id') !== -1)
            this.TypePage(Categories[server.getIndex(item.Category_id, Categories, 'id')].name);
        else server.alert('توجه', 'دسته بندی موجود نیست', context)
    }

    renderSpecialOffer(item) {

        if (item.hasOwnProperty('isSpecialOffer') && item.shouldShow === true) {
            //item.hasOwnProperty('isSpecialOffer')
            return <Item
                title={item.name}
                count={item.count}
                onUp={() => this.onUpSpecialOffer(item)}
                onDown={() => this.onDownSpecialOffer(item)}
                price={this.numberFormat(item.price)}
                off={item.off}
                disscount={(item.off !== 0) ? this.numberFormat(item.main_price) : null}
                imageUrl={server.getServerAddress() + '/' + item.photo}
                onPress={_.debounce(() => this.gotoCategoryFromItem(item),
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
                         price={this.numberFormat(item.price)}
                         off={item.off}
                         disscount={(item.off !== 0) ? this.numberFormat(item.main_price) : null}
                         imageUrl={server.getServerAddress() + '/' + item.photo}
                         onPress={_.debounce(() => this.gotoCategoryFromItem(item),
                             1000, {leading: true, trailing: false})}
            />
            //Do this
        }
        return null;
    }


    onUpSpecialOffer = (rowdata) => {
        if (rowdata.max_in_order > rowdata.count) {
            let rowDataCopy = Object.assign({}, rowdata);
            rowDataCopy.count++;
            let list = this.state.superBasket;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            if (rowdata.count !== 0)
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)]

                });
            else
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)],
                    basketSize: context.state.basketSize + 1

                });
        } else
            server.alert('توجه', 'محدویت سفارش این کالا ' + rowdata.max_in_order + ' می باشد', context)
    };
    onDownSpecialOffer = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        if (rowdata.count !== 0) {
            rowDataCopy.count--;
            let list = this.state.superBasket;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            if (rowdata.count !== 1)
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)]
                });
            else
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)],
                    basketSize: this.state.basketSize - 1
                });

        }


    };
    onUpBestSellingProducts = (rowdata) => {
        if (rowdata.max_in_order > rowdata.count) {

            let rowDataCopy = Object.assign({}, rowdata);
            rowDataCopy.count++;
            let list = this.state.superBasket;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            if (rowdata.count !== 0)
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)]
                });
            else
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)],
                    basketSize: context.state.basketSize + 1
                });
        } else
            server.alert('توجه', 'محدویت سفارش این کالا ' + rowdata.max_in_order + ' می باشد', context)
    };
    onDownBestSellingProducts = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        if (rowdata.count !== 0) {
            rowDataCopy.count--;
            let list = this.state.superBasket;
            let index = dataHandeling.indexOfId(list, rowdata.id);

            if (rowdata.count !== 1)
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)]

                });
            else
                this.setState({
                    superBasket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)],
                    basketSize: this.state.basketSize - 1
                });
        }


    };
}

export default (NavigationTypes);