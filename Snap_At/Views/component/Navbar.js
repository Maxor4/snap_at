import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import Couleurs from '../../scripts/Couleurs';

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
                    placeholder='Rechercher'
                    placeholderTextColor={Couleurs.noir}
                    selectionColor={Couleurs.bleuClair}
                    autoCorrect={false}
                    returnKeyType={'done'}
                    clearButtonMode={'while-editing'}
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                />
                <SimpleLineIcons name="magnifier" style={styles.loupe} color={Couleurs.placeholder} />
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
        backgroundColor: Couleurs.primaire
    },
    texte: {
        flex: 1,
        paddingLeft: 25,
        backgroundColor: 'transparent',
        color: Couleurs.noir
    },
    loupe: {
        position: 'absolute',
        top: 13,
        fontSize: 16,
        color: Couleurs.blanc
    },
});