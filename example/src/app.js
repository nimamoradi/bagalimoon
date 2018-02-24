import {AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {
    registerScreens,
    login,
    serverCheckFailed,
    mainPage,
} from './screens';
import fetch from "./fetch";
import server from "./code";


// screen related book keeping
registerScreens();
// registerScreenVisibilityListener();


AsyncStorage.multiGet(['api_code', 'user_number']).then((data) => {
    let api_code = data[0][1];
    let user_number = data[1][1];
    if (api_code !== null) {
        fetch(server.getServerAddress() + '/api/UserDetails', {
            method: 'POST',
            retries: 1,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
            },
            body: JSON.stringify({
                'phone_number': user_number,
                "device_info": server.deviceInfo(user_number),
                'api_code': api_code,
            })
        }).then((response) => response.json()
            .then((responseData) => {
                console.log('inside app ');
                console.log('response object:', responseData);
                if (!responseData.hasOwnProperty("error"))

                    Navigation.startSingleScreenApp(mainPage(api_code));
                else
                    Navigation.startSingleScreenApp(login());


            })).catch(error => {
            // Navigation.startSingleScreenApp(login());

             Navigation.startSingleScreenApp(serverCheckFailed(api_code, user_number));
        }).catch(error => {
            // Navigation.startSingleScreenApp(login());

          Navigation.startSingleScreenApp(serverCheckFailed(api_code, user_number));
        });

    } else
        Navigation.startSingleScreenApp(login());
});



