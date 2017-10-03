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
export default class Snap_At extends Component {

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
                <TextInput
                    ref={'email'}
                    style={styles.input}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    placeholder={'Email'}
                    onChangeText={(text) => {
                        this.setState({email: text})
                    }}
                    returnKeyType={'next'}
                />
                <TextInput
                    ref={'passwd'}
                    style={styles.input}
                    value={this.state.psswd}

                    keyboardType={'email-address'}
                    placeholder={'Password'}
                    onChangeText={(text) => {
                        this.setState({psswd: text})
                    }}
                    returnKeyType={'next'}
                />
                <TouchableOpacity style={styles.bouton}
                                  onPress={this._handlePress.bind(this)}>
                    <Text style={styles.txtBouton}> Se Connecter </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _handlePress(){
        alert('coucou')
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
        height: 70,
        width: width*(2/3),
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#0905c0'
    },
    txtBouton:{
        textAlign: 'center',
        fontSize: 14,
        color: '#fff'
    },
    input: {
        color: '#000',
        backgroundColor: '#fff',
        height: 90,
        width: width*(2/3),
        borderRadius: 10,
    }
});
