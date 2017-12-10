'use strict';


module.exports = function(url, options) {

    let retries = 5;
    let retryDelay = 0.5;

    if (options && options.retries) {
        retries = options.retries;
    }

    if (options && options.retryDelay) {
        retryDelay = options.retryDelay;
    }

    return new Promise(function(resolve, reject) {
        let wrappedFetch = function(n) {
            fetch(url, options)
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    if (n > 0) {
                        setTimeout(function() {
                            wrappedFetch(--n);
                        }, retryDelay);
                    } else {
                        reject(error);
                    }
                });
        };
        wrappedFetch(retries);
    });
};