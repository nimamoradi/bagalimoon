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

    static writeAndUpdata(input) {
        let addItems = _.unionBy(input, [], "id");
        addItems = addItems.filter(function (item) {
            return item.count > 0;
        });
        AsyncStorage.setItem('@CurrentBasket', JSON.stringify(addItems));
        basketfile.basket = addItems
    }

    static writeAndUpdateAutoDec(input) {
        let basket_ = basketfile.basket;//copy basket
         basket_ = _.unionBy(basket_, [], "id");
        let addItems = _.unionBy(input, [], "id");
//updating basket
        for (let j = 0; j < basket_.length; j++) {
            for (let i = 0; i < addItems.length; i++) {
                if (basket_[j].id === addItems[i].id) {
                    basket_[j] = addItems[i]
                }
            }
        }
//adding new items
        addItems = addItems.filter(function (item) {
            let shouldUpdate = true;
            if (item.count > 0) {
                for (let i = 0; i < basket_.length; i++) //if it is not in old basket
                    if (item.id === basket_[i].id) {
                        shouldUpdate = false;
                        break;
                    }

                return shouldUpdate;
            } else return false;
        });
        basket_ = basket_.concat(addItems);
        basket_ = basket_.filter(function (item) {
            return item.count > 0;
        });
        // console.log(basket_);
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