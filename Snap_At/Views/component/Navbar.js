import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    TextInput,
    View,
    Dimensions
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import Couleurs from '../../scripts/Couleurs';

var width = Dimensions.get('window').width;

export default class RecherchePatient extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <View style={styles.inputRecherche}>
                <TextInput
                    style={styles.texte}
                    onChangeText={(text) => {
                        Navigation.handleDeepLink({
                            link: 'recherchePatient',
                            payload: text
                        });
                    }}
                    placeholder='Search'
                    placeholderTextColor={Couleurs.header.title}
                    selectionColor={Couleurs.bleuClair}
                    autoCorrect={false}
                    returnKeyType={'done'}
                    clearButtonMode={'while-editing'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                />
            </View>
        );
    }

}

RecherchePatient.propTypes = {
    callback: PropTypes.func
};

const styles = StyleSheet.create({
    inputRecherche: {
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Couleurs.header.background,
        height: 60
    },
    texte: {
        flex: 1,
        paddingLeft: 25,
        backgroundColor: 'transparent',
        color: Couleurs.header.title,
        width: width/5*3,
        fontSize: 18,
    },
    loupe: {
        position: 'absolute',
        top: 13,
        fontSize: 18,
        color: Couleurs.header.title
    },
});