/**
 * Created by krlme on 06/10/2017.
 */
/**
 * Created by krlme on 03/10/2017.
 */
import React, { Component} from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import Couleurs from '../../../scripts/Couleurs';

import {ws} from '../../../index.js'

var width = Dimensions.get('window').width,
    height = Dimensions.get('window').height;

export default class Email extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filtre: 'titre'
        };

        this.props.navigator.setStyle({
            navBarHidden: true
        });
    }

    setFiltre(choix){
        this.setState({filtre: choix}, () => {
            this.props.navigator.handleDeepLink({
                link: 'filtre',
                payload: this.state.filtre
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={this.state.filtre === 'titre' ? styles.filtreSelection : styles.filtre} onPress={()=> {this.setFiltre('titre')}}>
                    <Text style={styles.filterTitles}>Title</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.filtre === 'client' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setFiltre('client')}}>
                    <Text style={styles.filterTitles}>Client</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.filtre === 'date' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setFiltre('date')}}>
                    <Text style={styles.filterTitles}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.filtre === 'statut' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setFiltre('statut')}}>
                    <Text style={styles.filterTitles}>Status</Text>
                </TouchableOpacity>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: Couleurs.black+'CC',
        width: width/3,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filtre: {
        height: 100,
        borderWidth: 1,
        width: width/3,
        justifyContent: 'center',
        backgroundColor: Couleurs.list.background
    },
    filtreSelection: {
        height: 100,
        backgroundColor: Couleurs.header.background,
        borderWidth: 1,
        width: width/3,
        justifyContent: 'center',
    },
    filterTitles:{
        color: Couleurs.header.title,
        textAlign: 'center',
        fontSiize: 20
    }

});