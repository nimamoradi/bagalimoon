import _ from 'lodash'

class dataHandeling {


    AddBasketWithNumHandel(newItems, oldbasket) {
        let basket_ = oldbasket;//copy basket
        // basket_ = _.unionBy(basket_, [], "id");
        let addItems = newItems;
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
        return basket_;

    };

    static AddBasket(newItems, basket) {//update and mearge basket
        return this.arrayUnique((_.map(basket, function (item) {
            return _.assign(item, _.find(newItems, ['id', item.id]));
        })).concat(newItems));

    };

    static arrayUnique(array) {
        let a = array.concat();
        for (let i = 0; i < a.length; ++i) {
            for (let j = i + 1; j < a.length; ++j) {
                if (a[i].id === a[j].id)
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    static basketFilter(basket) {
        return basket.filter(function (item) {
            return item.count > 0;

        })
    }

    static indexOfId(ar, id) {
        for (let i = 0; i < ar.length; i++) {
            if (ar[i].id === id) {
                return i;
            }
        }
        return -1;
    }
    static indexOfIdAndCount(ar, id) {
        for (let i = 0; i < ar.length; i++) {
            if (ar[i].id === id) {
                return i,ar[i].count;
            }
        }
    }

}

export default dataHandeling;