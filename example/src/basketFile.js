import React, {Component} from 'react';
import _ from 'lodash'

import {
    AsyncStorage,
} from 'react-native';

class basketfile {
    static serverAddress = [];
    basket;


    static upDateBasket(addItems) {
        // basketfile.basket = _.map(addItems, function (item) {
        //     return _.extend(item, _.findWhere(basketfile.basket, {id: item.id}));
        // });
        basketfile.basket = addItems
    }

    static writeAndUpdata(addItems) {
        addItems = addItems.filter(function (item) {
            return item.count > 0;
        });
        AsyncStorage.setItem('@CurrentBasket', JSON.stringify(addItems));
        basketfile.basket = addItems
    }

    static writeAndUpdateAutoDec(addItems) {
        let basket_ =Object.assign({},basketfile.basket);
        basket_= _.unionBy(basket_, addItems, "id");


        for (let j = 0; j < basket_.length; j++) {
            for (let i = 0; i < addItems.length; i++) {
                if (basket_[j].id === addItems[i].id) {
                    basket_[j].count = addItems[i].count;
                }
            }
        }
        basket_ = basket_.filter(function (item) {
            return item.count > 0;
        });
        console.log(basket_);
        basketfile.basket = basket_;
        AsyncStorage.setItem('@CurrentBasket', JSON.stringify(basket_));

    }

    static async writeBasket() {
        await  AsyncStorage.setItem('@CurrentBasket', JSON.stringify(basketfile.basket));
    }

    static setBasket(basket_) {
        basketfile.basket = basket_;
    }

    static getBasket() {
        return basketfile.basket;
    }
}

export default basketfile;