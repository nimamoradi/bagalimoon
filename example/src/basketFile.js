import React, {Component} from 'react';
import _ from 'lodash'

import {
    AsyncStorage,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {login} from "./screens";

class basketfile {


    static basketKey = '@CurrentBasket';


    static async writeBasket(basket) {
        basket = JSON.stringify(basket.filter(function (item) {
            delete  item.isSpecialOffer;
            delete item.shouldShow;
            delete item.isBestSellingProduct;
            return (item.count > 0);
        }));
        // await console.log('basket '+basket);

        await AsyncStorage.setItem(basketfile.basketKey, basket);
    }


    static readBasket() {
        return new Promise((resolve) => {
            AsyncStorage.getItem(basketfile.basketKey).then((item) => {
                resolve(JSON.parse(item));
                // console.log('basket ' + item);
            });
        })


    }

}

export default basketfile;