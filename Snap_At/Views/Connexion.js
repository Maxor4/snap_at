/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
export default class Connexion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwd: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcomeMessage}>Welcome to SNAP-AT. {"\n"} Please, authenticate yourself.</Text>
                <TextInput
                    ref={'email'}
                    style={styles.input}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    placeholder={'Email'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => {
                        this.setState({email: text})
                    }}
                    onSubmitEditing={(event) => {
                        this.refs.passwd.focus();
                    }}
                    returnKeyType={'next'}
                />
                <TextInput
                    ref={'passwd'}
                    style={styles.input}
                    value={this.state.psswd}
                    keyboardType={'default'}
                    placeholder={'Password'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => {
                        this.setState({psswd: text})
                    }}
                    onSubmitEditing={(event) => {
                        this._handlePress.bind(this)
                    }}
                    returnKeyType={'done'}
                />
                <TouchableOpacity style={styles.bouton}
                onPress={this._handlePress.bind(this)}>
                    <Text style={styles.txtBouton}> Connect </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _handlePress(){
        let email= this.state.email,
            passwd = this.state.psswd;


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
        backgroundColor: '#2F3649',
        marginTop : width*0.05
    },
    txtBouton:{
        textAlign: 'center',
        fontSize: 14,
        color: '#FF8929'
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
        marginBottom: width*0.1,
        marginTop: height*(-0.1)
    }
});
