import _ from 'lodash'

class dataHandeling {


    static AddBasket(newItems, basket) {//update and merge basket
        return this.arrayUnique((basket.map(function (basketItem) {
            //update first  basket values with newItems then add missing items
            return _.assign(basketItem, _.find(newItems, ['id', basketItem.id]), {count: basketItem.count})

        })).concat(newItems));

    };

    /*
 * remove duplicates based on id
 * */
    static arrayUnique(array) {
        let a = array;
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

        });
    }

    static indexOfId(ar, id) {
        for (let i = 0; i < ar.length; i++) {
            if (ar[i].id === id) {
                return i;
            }
        }
        return -1;
    }


}

export default dataHandeling;