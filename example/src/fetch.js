import server from "./code";

module.exports = function (url, options) {

    let retries = 3;
    let retryDelay = 5;

    if (options && options.retries) {
        retries = options.retries;
    }

    if (options && options.retryDelay) {
        retryDelay = options.retryDelay;
    }
    let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, server.getTimeOut(), 'Request timed out');
    });

    return Promise
        .race([timeout, new Promise(function (resolve, reject) {
            let wrappedFetch = function (n) {
                fetch(url, options)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        if (n > 0) {
                            setTimeout(function () {
                                wrappedFetch(--n);
                            }, retryDelay);
                        } else {
                            reject(error);
                        }
                    });
            };
            wrappedFetch(retries);
        })]);

};