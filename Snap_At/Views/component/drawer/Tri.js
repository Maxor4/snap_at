/**
 * Created by krlme on 06/10/2017.
 */
/**
 * Created by krlme on 03/10/2017.
 */
import React, { Component} from 'react';
import {
    Dimensions,
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
            tri:'statut'
        };

        this.props.navigator.setStyle({
            navBarHidden: true
        });
    }

    setTri(choix){
        this.setState({tri: choix}, () => {
           this.props.navigator.handleDeepLink({
                link: 'tri',
                payload: this.state.tri
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={this.state.tri === 'titre' ? styles.filtreSelection : styles.filtre} onPress={()=> {this.setTri('titre')}}>
                    <Text style={styles.filterTitles}>Title</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.tri === 'client' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setTri('client')}}>
                    <Text style={styles.filterTitles}>Client</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.tri === 'date' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setTri('date')}}>
                    <Text style={styles.filterTitles}>Date</Text>
            </TouchableOpacity>
                <TouchableOpacity  style={this.state.tri === 'statut' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setTri('statut')}}>
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
        fontSize: 20
    }

});
