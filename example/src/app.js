import {AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {
    registerScreens,
    login,
    serverCheckFailed,

} from './screens';


// screen related book keeping
registerScreens();
// registerScreenVisibilityListener();


AsyncStorage.multiGet(['api_code', 'user_number', 'semi_api_code']).then((data) => {
    let api_code = data[0][1];
    let user_number = data[1][1];
    let semi_api_code = data[2][1];

    if (api_code !== null && user_number !== null) {
        Navigation.startSingleScreenApp(serverCheckFailed(api_code, user_number));
    } else
        Navigation.startSingleScreenApp(login(semi_api_code,user_number));
});



