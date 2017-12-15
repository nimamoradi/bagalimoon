import {AsyncStorage} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';
import {vw, vh, vmin, vmax} from './viewport'

import basketFile from './basketFile'

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

console.log('api code reading');
AsyncStorage.getItem('api_code').then((item) => {

    let startAppdata;
    if (item === null) {
        startAppdata = {
            screen: {
                screen: 'example.Types.loginScreen', // unique ID registered with Navigation.registerScreen
                navigatorStyle: {
                    navBarHidden: true,
                }
            },
            appStyle: {
                orientation: 'portrait',
            },


        };
        Navigation.startSingleScreenApp(startAppdata);
    }
    else //user is logined before
    {

        startAppdata = {
            screen: {
                screen: 'example.Types', // unique ID registered with Navigation.registerScreen
                title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
                navigatorStyle: {
                    navBarTranslucent: false,
                    navBarHidden: true,
                },

            },
            appStyle: {
                orientation: 'portrait',
            },

            passProps: {api_code: item,}, // simple serializable object that will pass as props to all top screens (optional)


        };
        Navigation.startSingleScreenApp(startAppdata);

    }


});


