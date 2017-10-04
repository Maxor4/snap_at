import React,{Component} from 'react'
import {
    AppRegistry
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import WebService from './scripts/WebService';

import Connexion from './Views/Connexion'
import ListeBesoins from './Views/ListeBesoins'
import Couleurs from './scripts/Couleurs.js'
import Navbar from './Views/component/Navbar.js'
import FicheBesoin from './Views/FicheBesoin.js'


export function registerScreens() {
    Navigation.registerComponent('SA.Connexion', () => Connexion);
    Navigation.registerComponent('SA.ListeBesoins', () => ListeBesoins);
    Navigation.registerComponent('SA.FicheBesoin', () => FicheBesoin);
    Navigation.registerComponent('SA.Navbar.RechercheBesoin', () => Navbar);
}

registerScreens();

var ws = new WebService();

export default class Index extends Component {

    constructor(props) {
        super(props);

        /*ws.getToken((token) => {
            if(token.length > 0) {
                ws.isConnecte((data) => {
                    this.startAppConnecte();
                }, () => {
                    this.startApp();
                });
            }
            else {
                this.startApp();
            }
        });*/
        this.startApp()

    }

    startApp() {

    Navigation.startSingleScreenApp({
        screen: {
            screen: 'SA.Connexion', // unique ID registered with Navigation.registerScreen
            title: 'Authentication', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTextColor: Couleurs.header.title,
                navBarBackgroundColor: Couleurs.header.background,
                navBarTitleTextCentered: true
            }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        }
    })
    }
};

export {ws}

AppRegistry.registerComponent('Snap_At', () => Index);