'use strict';


import server from "./code";


module.exports = function (url, options) {

    let retries = 3;
    let retryDelay = 500;
    let time;
    if (options && options.retries) {
        retries = options.retries;
    }
    if (options && options.retryDelay) {
        retryDelay = options.retryDelay;
    }
    if (options && options.time) {
        time = options.time;
    }
    else time = server.getTimeOut();
    let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, time, 'اینترنت قطع شد');
    });

    return Promise
        .race([timeout, new Promise(function (resolve, reject) {
            let wrappedFetch = function (n) {
                fetch(url, options)
                    .then(function (response) {
                        if (response.ok)
                            resolve(response);
                        else {
                            console.log("error "+error)
                            throw error('bad error code');
                        }
                    })
                    .catch(function (error) {
                        if (n > 0) {
                            setTimeout(function () {
                                wrappedFetch(--n);
                            }, retryDelay);
                        } else {
                            console.log("error "+error)
                            reject(error);
                        }
                    });
            };
            wrappedFetch(retries);
        })]);

};