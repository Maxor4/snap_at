/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Couleurs from '../scripts/Couleurs';
import {ws} from '../index.js'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Connexion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwd: '',
            visibleCheckEmail: false,
            connexion: false
        };
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@gfi.fr$/;
        return re.test(email);
    };

    focusNextField = () => {
        this.refs['mdp'].focus();
    };



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcomeMessage}>Welcome to SNAP-AT. {"\n"} Please, authenticate yourself.</Text>
                <View style={styles.mailAdress}>
                    <TextInput
                    ref={'email'}
                    style={styles.input}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    placeholder={'Email'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => {
                            this.setState({
                            email: text,
                            visibleCheckEmail: this.validateEmail(text)
                            });
                        }}
                    onSubmitEditing={this.focusNextField.bind(this)}
                    returnKeyType={'next'}
                />
                    {this.state.visibleCheckEmail ? <Icon style={styles.emailIcon} name="check" size={30} /> : null}
                    </View>
                <TextInput
                    ref={'passwd'}
                    style={styles.input}
                    value={this.state.psswd}
                    keyboardType={'default'}
                    placeholder={'Password'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({psswd: text})
                    }}
                    onSubmitEditing={this._handlePress.bind(this)}
                    returnKeyType={'done'}
                />
                <TouchableOpacity style={styles.bouton}
                onPress={this._handlePress.bind(this)}>
                    {this.state.connexion ? <ActivityIndicator color={Couleurs.mainColors.black}/> : <Text ref={'textButton'} style={styles.txtBouton}>Connect</Text>}
                </TouchableOpacity>
            </View>
        );
    }

    _handlePress(){
        if(this.state.visibleCheckEmail) {
            if (!this.state.connexion) {
                ws.connexion(this.state.mdp, () => {
                    /*this.props.navigator.resetTo({
                        screen: 'SA.ListeBesoins'
                    })*/
                    alert('hello')
                }, (data) => {
                    alert(data.message);
                });
                this.setState({connexion: true})
            }
        }

        this.props.navigator.resetTo({
            screen: 'SA.ListeBesoins'
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bouton:{
        height: 50,
        width: width*(2/3),
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: Couleurs.mainColors.black,
        marginTop : width*0.05
    },
    txtBouton:{
        textAlign: 'center',
        fontSize: 14,
        color: Couleurs.mainColors.orange
    },
    input: {
        color: '#000',
        backgroundColor: '#fff',
        height: 50,
        width: width*(2/3),
        borderRadius: 10,
        marginTop : width*0.025,
        borderStyle: 'solid',
        borderColor: '#B9B9B9',
        borderWidth: 1,
        paddingLeft: 15
    },
    welcomeMessage: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FF8929',
        marginBottom: width * 0.1,
        marginTop: height * (-0.1)
    },
    mailAdress: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emailIcon: {
        position: 'absolute',
        right: 5,
        top: 20
    }
});
