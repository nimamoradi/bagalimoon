import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View, FlatList,} from 'react-native';

import {vw, vh, vmin, vmax} from '../../viewport'
import server from "../../code";
import Loading from '../../components/loadScreen'

import BasketItem from './basketItem'

let context;

class productView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            basket: []
        };
        context = this;

    }

    componentDidMount() {
        let photos = this.props.photos;
        let basket = this.props.basket;

        basket = basket.map((item) => {
            return Object.assign({imgUrl: photos[item.product.id]}, item);
        });
        this.setState({basket: basket})

    }

    numberFormat = (x) => {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    style={{width: 100 * vw, marginTop: vh}}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.basket}
                    renderItem={({item}) =>
                        <BasketItem price={this.numberFormat(item.final_price)}
                                    title={item['product']['name']}
                                    off={item.off}
                                    disscount={(item.off !== 0) ? this.numberFormat(item.regular_price) : null}
                                    imageUrl={server.getServerAddress() + '/' + item.imgUrl}
                                    count={item.count}/>}
                />


            </View>

        );

    }

    _keyExtractor = (item, index) => item.id;

}

productView.propTypes = {
    basket: PropTypes.array.isRequired,//encoded array in json
};

const styles = StyleSheet.create({

    row: {
        elevation: 2 * vw,
        borderColor: '#00000035',
        borderWidth: 0.75,
        margin: vw,
        borderRadius: 2 * vw,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        backgroundColor: '#e7e6e6',
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: vw * 4,
        flex: 3,
        width: 12 * vw,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    textDes: {
        fontSize: vw * 4,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    price: {
        margin: 10,
        fontSize: vw * 4,
        flex: 1,
        fontFamily: 'B Yekan',
        textAlign: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    rowItem: {
        elevation: 2 * vw,
        borderColor: '#00000035',
        borderWidth: 0.75,
        margin: vw,
        flexDirection: 'row',
        borderRadius: 2 * vw,
        backgroundColor: '#e7e6e6',
        shadowOpacity: 0.6,
        shadowColor: '#e7e6e650',
        shadowOffset: {width: 10, height: 10},
    },

});

export default productView;
