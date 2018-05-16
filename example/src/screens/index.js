import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import {Dimensions} from 'react-native';
import Types from './mainScreen/NavigationTypes';
import basketLightBox from './basket/basketLightBox'
import SimpleNavbar from '../navBars/SimpleNavbar'
import LightBox from './types/LightBox';
import basketPreview from './basket/basketPreview'
import mapView from './mapView'
import Drawer from './types/Drawer';
import offer from './types/offer';
import loadScreen from '../components/loadScreen'


import alertWithButton from '../components/alertWithButton'
import TypePage from './productTypes/TypePage'
import loginScreen from './loginScreen/loginScreen'

import codeEnter from './codeEnter/codeEnter'
import alert from '../components/alertBox'
import finalBasket from './basket/basketFinal'
import reTry from '../components/reTry'
import FlatListSearch from './search/FlatListSearch'

import about_us from './aboutus';

import productView from './orderHistroy/productView'
import orderHistroy from './orderHistroy/orderHistroy'
import productPageNavBar from "../navBars/productPageNavBar";


import ServerCheck from "./ServerCheck";
import checkoutPage from "./checkoutPage";
import {vw, vh} from '../viewport'


export function registerScreens() {

    Navigation.registerComponent('example.Types.checkoutPage', () => checkoutPage);
    Navigation.registerComponent('example.Types.productView', () => productView);

    Navigation.registerComponent('example.Types.loginScreen', () => loginScreen);
    Navigation.registerComponent('example.bars.productPageNavBar', () => productPageNavBar);
    Navigation.registerComponent('example.Types', () => Types);
    Navigation.registerComponent('example.alert', () => alert);
    Navigation.registerComponent('example.alertWithButton', () => alertWithButton);
    Navigation.registerComponent('example.about_us', () => about_us);
    Navigation.registerComponent('example.ServerCheck', () => ServerCheck);
    Navigation.registerComponent('example.Types.basketFinal', () => finalBasket);


    Navigation.registerComponent('example.Types.Drawer', () => Drawer);
    Navigation.registerComponent('example.Types.LightBox', () => LightBox);
    Navigation.registerComponent('example.Types.Notification', () => Notification);
    Navigation.registerComponent('example.Types.basketPreview', () => basketPreview);
    Navigation.registerComponent('example.Types.loadScreen', () => loadScreen);
    Navigation.registerComponent('example.Types.reTry', () => reTry);

    Navigation.registerComponent('example.Types.codeEnter', () => codeEnter);

    Navigation.registerComponent('example.mapView', () => mapView);
    Navigation.registerComponent('example.TypePage', () => TypePage);
    Navigation.registerComponent('example.Types.offer', () => offer);




    Navigation.registerComponent('example.Types.basketLightBox', () => basketLightBox);

    Navigation.registerComponent('example.FlatListSearch', () => FlatListSearch);

    Navigation.registerComponent('example.Types.subOffer', () => subOffer);
    Navigation.registerComponent('example.Types.orderHistroy', () => orderHistroy);
    Navigation.registerComponent('example.Types.SimpleNavbar', () => SimpleNavbar);
}

export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({

        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register();
}

export function login(semi_api_code,user_number) {
    let startAppData = {
        screen: {
            screen: 'example.Types.loginScreen', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarHidden: true,
            }
        },
        passProps: {semi_api_code:semi_api_code,user_number: user_number},
        appStyle: {
            orientation: 'portrait',
        },

        portraitOnlyMode: true,

    };
    return (startAppData);
}

export function mainPage(api_code) {
    let startAppData = {
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

        portraitOnlyMode: true,
        passProps: {api_code: api_code,}, // simple serializable object that will pass as props to all top screens (optional)


    };
    return (startAppData);
}


export function serverCheckFailed(api_code, user_number) {
    let startAppData = {
        screen: {
            screen: 'example.ServerCheck', // unique ID registered with Navigation.registerScreen
            title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTranslucent: false,
                navBarHidden: true,
            },
        },
        portraitOnlyMode: true,
        appStyle: {
            orientation: 'portrait',
        },

        passProps: {api_code: api_code, user_number: user_number}, // simple serializable object that will pass as props to all top screens (optional)


    };
    return startAppData;

}