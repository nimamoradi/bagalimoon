import React, {Component} from 'react';
import _ from 'lodash'

import {
    AsyncStorage,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

class basketfile {


    static basketKey = '@CurrentBasket';

    mixins: [TimerMixin]
    static writeBasket(basket) {
        let bas;
        bas = basket.filter(function (item) {
            return item.count > 0
        });
        bas = bas.map(function (item) {
            item.shouldShow = false;
            return item;
        });

        AsyncStorage.setItem(basketfile.basketKey, JSON.stringify(bas));
    }


    static readBasket() {
        return new Promise((resolve) => {
            AsyncStorage.getItem(basketfile.basketKey).then((item) => {
                resolve(JSON.parse(item))
            });
        })


    }

}

export default basketfile;