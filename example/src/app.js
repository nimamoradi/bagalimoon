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
    if (api_code !== null && user_number !== null) {
          Navigation.startSingleScreenApp(serverCheckFailed(api_code, user_number));
        // let f=(()=>{error("hi")})
        //     .catch((error) => {
        //         Navigation.startSingleScreenApp(serverCheckFailed(api_code, user_number));
        //     });
    } else
        Navigation.startSingleScreenApp(login());
});



