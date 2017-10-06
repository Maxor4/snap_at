import React,{Component} from 'react'
import {
    AppRegistry
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import WebService from './scripts/WebService';

import Connexion from './Views/Connexion'
import ListeBesoins from './Views/ListeBesoins'
import FicheBesoin from './Views/FicheBesoin'
import Couleurs from './scripts/Couleurs.js'
import Besoin from './Views/Besoin'
import Navbar from './Views/component/Navbar.js'
import Email from './Views/Email.js'
import Tri from './Views/component/drawer/Tri'
import Filtre from './Views/component/drawer/Filtre'


export function registerScreens() {
    Navigation.registerComponent('SA.Connexion', () => Connexion);
    Navigation.registerComponent('SA.ListeBesoins', () => ListeBesoins);
    Navigation.registerComponent('SA.FicheBesoin', () => FicheBesoin);
    Navigation.registerComponent('SA.Navbar.RechercheBesoin', () => Navbar);
    Navigation.registerComponent('SA.Besoin', () => Besoin);
    Navigation.registerComponent('SA.SelectEmails', () => Email);
    Navigation.registerComponent('SA.Tri', () => Tri);
    Navigation.registerComponent('SA.Filtre', () => Filtre);

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
        },
        drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
                screen: 'SA.Tri' // unique ID registered with Navigation.registerScreen
            },
            right: { // optional, define if you want a drawer from the right
                screen: 'SA.Filtre' // unique ID registered with Navigation.registerScreen
            }
        }
    })
    }
};

export {ws}

AppRegistry.registerComponent('Snap_At', () => Index);