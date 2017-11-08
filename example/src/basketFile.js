import React, {Component} from 'react';

import {
 AsyncStorage,

} from 'react-native';

class basketfile {
    static serverAddress = [];
    static basket;

    static getServerAddress() {
        return this.serverAddress;
    }

    static upDateBasket(addItems) {
        // basketfile.basket = _.map(addItems, function (item) {
        //     return _.extend(item, _.findWhere(basketfile.basket, {id: item.id}));
        // });
        basketfile.basket=addItems
    }
    static writeAndUpdata(addItems) {
        AsyncStorage.setItem('@CurrentBasket', JSON.stringify(addItems));
        basketfile.basket=addItems
    }
    static async writeBasket(){
        await  AsyncStorage.setItem('@CurrentBasket', JSON.stringify(basketfile.basket));
    }

    static setBasket(basket_) {
        basketfile.basket=basket_;
    }
    static getBasket() {
       return basketfile.basket;
    }
}

export default basketfile;