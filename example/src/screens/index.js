import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import {Dimensions} from 'react-native';
import Types from './NavigationTypes';
import basketLightBox from './basketLightBox'
import SimpleNavbar from '../navBars/SimpleNavbar'
import LightBox from './types/LightBox';
import basketPreview from './basketPreview'
import mapView from './mapView'
import Drawer from './types/Drawer';
import offer from './types/offer';
import loadScreen from '../components/loadScreen'
import descriptionPan from '../components/descriptionPan';
import opinion from '../components/opinion'
import alertWithButton from '../components/alertWithButton'
import TypePage from './TypePage'
import loginScreen from './loginScreen'

import codeEnter from './codeEnter'
import alert from '../components/alertBox'
import finalBasket from './basketFinal'
import reTry from '../components/reTry'
import FlatListSearch from './FlatListSearch'

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
    Navigation.registerComponent('example.Types.descriptionPan', () => descriptionPan);
    Navigation.registerComponent('example.Types.opinion', () => opinion);


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

export function login() {
    let startAppdata = {
        screen: {
            screen: 'example.Types.loginScreen', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarHidden: true,
            }
        },
        appStyle: {
            orientation: 'portrait',
        },
        drawer: { // optional, add this if you want a side menu drawer in your app
            right: { // optional, define if you want a drawer from the right
                screen: 'example.Types.Drawer', // unique ID registered with Navigation.registerScreen
                passProps: {shouldUpdate:false}, // simple serializable object that will pass as props to all top screens (optional)
                percentOfScreenWidth: 0.75,
            },

            style: { // ( iOS only )
                drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
            },
            type: 'TheSideBar', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
            animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
            // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
            disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
        },
        portraitOnlyMode: true,

    };
    return (startAppdata);
}

export function mainPage(api_code) {
    let startAppdata = {
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
        drawer: { // optional, add this if you want a side menu drawer in your app
            right: { // optional, define if you want a drawer from the right
                screen: 'example.Types.Drawer', // unique ID registered with Navigation.registerScreen
                passProps: {api_code: api_code,shouldUpdate:false}, // simple serializable object that will pass as props to all top screens (optional)
                percentOfScreenWidth: 0.75,
            },
            style: { // ( iOS only )
                drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
            },
            type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
            animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
            // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
            disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
        },
        portraitOnlyMode: true,
        passProps: {api_code: api_code,}, // simple serializable object that will pass as props to all top screens (optional)


    };
    return (startAppdata);
}


export function serverCheckFailed(api_code, user_number) {
    let startAppdata = {
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
        drawer: { // optional, add this if you want a side menu drawer in your app
            right: { // optional, define if you want a drawer from the right
                screen: 'example.Types.Drawer', // unique ID registered with Navigation.registerScreen
                passProps: {api_code: api_code,shouldUpdate:false}, // simple serializable object that will pass as props to all top screens (optional)
                percentOfScreenWidth: 0.75,
            },
            style: { // ( iOS only )
                drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
            },
            type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
            animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
            // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
            disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
        },
        passProps: {api_code: api_code, user_number: user_number}, // simple serializable object that will pass as props to all top screens (optional)


    };
    return startAppdata;

}