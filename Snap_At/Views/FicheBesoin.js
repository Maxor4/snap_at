/**
 * Created by krlme on 03/10/2017.
 */
import React, { Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Picker,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import {ws} from '../index.js'

var width = Dimensions.get('window').width,
    dateFormat = require('dateformat');

const date = dateFormat(new Date(), 'dd/mm/yyyy');

export default class FicheBesoin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalPerfusions: 0,
            typeDuree: 'Jour',
            typeFrequence: 'jour',
            dateDebut: date,
            tempsDuree: null,
            dateFin: null,
            dureeAdmin: null,
            frequence: null,
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewTitre}>
                    <Text style={styles.txtTitre}>Durée</Text>
                </View>

                <View style={styles.viewGenerale}>

                    <Text style={styles.txtCure}>Début de la cure</Text>

                    <TextInput style={styles.input}
                               value={date}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(dateDebut) => {
                                   this.setState({
                                       dateDebut: dateDebut
                                   })
                               }}
                    />

                    <View style={styles.viewCure}>
                        <TextInput style={styles.inputCure}
                                   placeholder="Durée de cure"
                                   value={this.state.tempsDuree}
                                   returnKeyType={'next'}
                                   clearButtonMode={'never'}
                                   keyboardType={'numeric'}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(tempsDuree) => {
                                       this.setState({
                                           tempsDuree: tempsDuree
                                       })
                                   }}
                        />

                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.typeDuree}
                            onValueChange={(itemValue, itemIndex) => this.setState({typeDuree: itemValue})}
                        >
                            <Picker.Item label="Jour" value="jour" />
                            <Picker.Item label="Semaine" value="semaine" />
                            <Picker.Item label="Mois" value="mois" />
                        </Picker>

                    </View>

                    <Text style={styles.txtOu}>ou</Text>

                    <TextInput style={styles.inputFinCure}
                               placeholder="Date de fin de cure"
                               value={this.state.dateFin}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(dateFin) => {
                                   this.setState({
                                       dateFin: dateFin,
                                   })
                               }}
                    />

                    <View style={styles.viewFrequence}>
                        <TextInput style={styles.inputFrequence}
                                   placeholder="Fréquence"
                                   value={this.state.frequence}
                                   returnKeyType={'next'}
                                   clearButtonMode={'never'}
                                   keyboardType={'numeric'}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(frequence) => {
                                       this.setState({
                                           frequence : frequence,
                                       })
                                   }}
                        />

                        <Text style={styles.txtFrequence}>/</Text>

                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.typeFrequence}
                            onValueChange={(itemValue, itemIndex) => this.setState({typeFrequence: itemValue})}
                        >
                            <Picker.Item label="Jour" value="jour" />
                            <Picker.Item label="Semaine" value="semaine" />
                            <Picker.Item label="Mois" value="mois" />
                        </Picker>

                    </View>

                    <TextInput style={styles.inputAdministration}
                               placeholder="Durée d'administration"
                               value={this.state.dureeAdmin}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(dureeAdmin) => {
                                   this.setState({
                                       dureeAdmin: dureeAdmin
                                   })
                               }}
                    />

                    <Text style={styles.txtPerfs}>Nombre total de perfusion(s)</Text>
                    <Text style={styles.valeurPerfs}>{this.state.totalPerfusions > 0 ? this.state.totalPerfusions : ''}</Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: width,
    },
    input:{
        marginTop: 2,
        backgroundColor:'#fff',
        fontSize: 21
    },
    inputAdministration:{
        backgroundColor:'#fff',
        marginTop: 30,
        fontSize: 21
    },
    inputCure:{
        width: 200,
        marginRight: 3,
        backgroundColor:'#fff',
        fontSize: 21
    },
    inputFinCure:{
        backgroundColor:'#fff',
        fontSize: 21
    },
    inputFrequence:{
        width: 200,
        backgroundColor:'#fff',
        fontSize: 21
    },
    picker:{
        width: 100,
        height: 50,
        backgroundColor:'#fff'
    },
    txtCure:{
        fontStyle: 'italic',
        color: '#000',
        fontSize: 14
    },
    txtFrequence:{
        fontSize: 22,
        color:"#000"
    },
    txtOu:{
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 5,
        color:'#000'
    },
    txtPerfs:{
        marginTop: 20,
        color:'#000',
        fontSize: 16
    },
    txtTitre:{
        textAlign:'center',
        color:'#fff',
        fontSize: 26
    },
    valeurPerfs:{
        paddingTop: 10,
        fontSize: 24,
        color: '#000',
        marginLeft: 5,
    },
    viewCure:{
        width: width,
        flexDirection: 'row',
        marginTop: 30
    },
    viewFrequence:{
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center'
    },
    viewGenerale:{
        flex: 1,
        paddingBottom: 30,
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 25,
        backgroundColor: Couleurs.fondDiscussion
    },
    viewTitre:{
        width: width,
        height: 60,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
