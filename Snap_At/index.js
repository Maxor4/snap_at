import React,{Component} from 'react'
import { Navigation } from 'react-native-navigation';
import {
    AppRegistry
} from 'react-native'

import Connexion from './Views/Connexion'
import ListeBesoins from './Views/ListeBesoins'


export function registerScreens() {
    Navigation.registerComponent('SA.Connexion', () => Connexion);
    Navigation.registerComponent('SA.ListeBesoins', () => ListeBesoins);
}

registerScreens();

Navigation.startSingleScreenApp({
    screen: {
        screen: 'SA.Connexion', // unique ID registered with Navigation.registerScreen
        title: 'Authentication', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {
            navBarTextColor : '#FF8929',
            navBarBackgroundColor: '#2F3649',
            navBarTitleTextCentered: true
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    }
});

export default class Index extends Component{}

AppRegistry.registerComponent('Snap_At', () => Index);