import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import test from '../screens/text';
import Types from './NavigationTypes';
import basketLightBox from './basketLightBox'
import Push from './types/Push';
import LightBox from './types/LightBox';
import basketPreview from './basketPreview'
import mapView from './mapView'
import Drawer from './types/Drawer';
import offer from './types/offer';
import loadScreen from '../components/loadScreen'
import descriptionPan from '../components/descriptionPan';
import opinion from '../components/opinion'
import newComment from './types/newComment'
import TypePage from './TypePage'
import loginScreen from './loginScreen'
import OrderItem from './types/tabs/orderItem'
import codeEnter from './codeEnter'
import alert from '../components/alertBox'
import finalBasket from './basketFinal'

export function registerScreens() {
  Navigation.registerComponent('example.Types.loginScreen', () => loginScreen);

  Navigation.registerComponent('example.Types', () => Types);
  Navigation.registerComponent('example.alert', () => alert);

  Navigation.registerComponent('example.Types.basketFinal', () => finalBasket);
  Navigation.registerComponent('example.Types.OrderItem', () => OrderItem);
  Navigation.registerComponent('example.Types.Push', () => Push);
  Navigation.registerComponent('example.Types.Drawer', () => Drawer);
  Navigation.registerComponent('example.Types.LightBox', () => LightBox);
  Navigation.registerComponent('example.Types.Notification', () => Notification);
  Navigation.registerComponent('example.Types.basketPreview', () => basketPreview);
    Navigation.registerComponent('example.Types.loadScreen', () => loadScreen);

  Navigation.registerComponent('example.Types.codeEnter', () => codeEnter);

  Navigation.registerComponent('example.mapView', () => mapView);
  Navigation.registerComponent('example.TypePage', () => TypePage);
  Navigation.registerComponent('example.Types.offer', () => offer);
  Navigation.registerComponent('example.Types.descriptionPan', () => descriptionPan);
  Navigation.registerComponent('example.Types.opinion', () => opinion);
  Navigation.registerComponent('example.Types.newComment', () => newComment);

  Navigation.registerComponent('example.Types.basketLightBox', () => basketLightBox);

  Navigation.registerComponent('example.Types.test', () => test);

}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({

    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
