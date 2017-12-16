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

        AsyncStorage.setItem(basketfile.basketKey, JSON.stringify(basket.map(function (item) {
            if (item.count > 0) {
                item.shouldShow = false;
                return item;
            }
            return item;
        })));
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