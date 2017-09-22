import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import test from '../screens/text';
import Types from './NavigationTypes';
import Actions from './Actions';
import Transitions from './Transitions';

import Push from './types/Push';
import LightBox from './types/LightBox';

//my views
import Drawer from './types/Drawer';
import offer from './types/offer';
import descriptionPan from '../components/descriptionPan';
import opinion from '../components/opinion'
import  newComment from './types/newComment'
import TypePage from './TypePage'

import Cards from './transitions/sharedElementTransitions/Cards/Cards';
import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';

import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';
import OrderItem from './types/tabs/orderItem'
export function registerScreens() {
  Navigation.registerComponent('example.Types', () => Types);
  Navigation.registerComponent('example.Actions', () => Actions);
  Navigation.registerComponent('example.Transitions', () => Transitions);

  Navigation.registerComponent('example.Types.OrderItem', () => OrderItem);
  Navigation.registerComponent('example.Types.Push', () => Push);
  Navigation.registerComponent('example.Types.Drawer', () => Drawer);
  Navigation.registerComponent('example.Types.Screen', () => Drawer);
  Navigation.registerComponent('example.Types.Modal', () => Modal);
  Navigation.registerComponent('example.Types.LightBox', () => LightBox);
  Navigation.registerComponent('example.Types.Notification', () => Notification);

  Navigation.registerComponent('example.TypePage', () => TypePage);
  Navigation.registerComponent('example.Types.offer', () => offer);
  Navigation.registerComponent('example.Types.descriptionPan', () => descriptionPan);
  Navigation.registerComponent('example.Types.opinion', () => opinion);
  Navigation.registerComponent('example.Types.newComment', () => newComment);



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
