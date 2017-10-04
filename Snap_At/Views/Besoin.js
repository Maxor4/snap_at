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

const dateJour = dateFormat(new Date(), 'dd/mm/yyyy');

export default class FicheBesoin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            contact: '',
            client: '',
            date: dateJour,
            showFactors: false,
            showConsultants: false,
            tempsDuree: null,
            typeDuree: 'Jour',
            dateLatest: null,
            location: '',
            rate: null,
        };
    }

    populatePicker(){
        for (let i= 1; i<=7; i++ ){
            return(
                <Picker.Item label=i value=i />
            )
        }
    }

    affichageFactors(){
        if (!this.state.showFactors){
            return(
                <View>
                    <TouchableOpacity onPress={() => {this.setState({showFactors: !this.state.showFactors})}}>
                        <Text></Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return(
                <View>
                    <TouchableOpacity onPress={() => {this.setState({showFactors: !this.state.showFactors})}}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                </View>
            )
        }
    }

    affichageConsultants(){
        if (!this.state.showConsultants){
            return(
                <View>
                    <TouchableOpacity onPress={() => {this.setState({showConsultants: !this.state.showConsultants})}}>
                        <Text></Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return(
                <View>
                    <TouchableOpacity onPress={() => {this.setState({showConsultants: !this.state.showConsultants})}}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputCure}
                        placeholder="Client"
                        value={this.state.client}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                client: nom
                            })
                        }}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewGenerale}>

                    <TextInput style={styles.inputDate}
                               value={dateJour}
                               underlineColorAndroid='transparent'
                               editable={false}
                               caretHidden={true}
                    />

                    <TextInput style={styles.inputCure}
                               placeholder="Client"
                               value={this.state.client}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(nom) => {
                                   this.setState({
                                       client: nom
                                   })
                               }}
                    />

                    <TextInput style={styles.inputFinCure}
                               placeholder="Contact Name"
                               value={this.state.contact}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(nom) => {
                                   this.setState({
                                       contact: nom
                                   })
                               }}
                    />

                    <TextInput style={styles.inputFrequence}
                               placeholder="Title"
                               value={this.state.titre}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'numeric'}
                               underlineColorAndroid='transparent'
                               onChangeText={(titre) => {
                                   this.setState({
                                       titre : titre,
                                   })
                               }}
                    />

                    <TextInput style={styles.inputAdministration}
                               placeholder="Full Description"
                               value={this.state.dureeAdmin}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => {
                                   this.setState({
                                       description: text
                                   })
                               }}
                    />

                    {this.affichageFactors}

                    <View style={styles.viewCure}>
                        <TextInput style={styles.inputCure}
                                   placeholder={"Duration (months)"}
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
                            {this.populatePicker()}
                        </Picker>

                        <Text style={{marginLEft: 10}}>days/week</Text>

                    </View>
                    <TextInput style={styles.inputAdministration}
                               placeholder="Start at latest"
                               value={this.state.dateLatest}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(date) => {
                                   this.setState({
                                       dateLatest: date
                                   })
                               }}
                    />

                    <TextInput style={styles.inputAdministration}
                               placeholder="Location"
                               value={this.state.location}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onChangeText={(ville) => {
                                   this.setState({
                                       location: ville
                                   })
                               }}
                    />

                    <TextInput style={styles.inputAdministration}
                               placeholder="Rate (€ HT)"
                               value={this.state.rate}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'numeric'}
                               underlineColorAndroid='transparent'
                               onChangeText={(valeur) => {
                                   this.setState({
                                       rate: valeur
                                   })
                               }}
                    />

                    <TouchableOpacity>
                        <Text>Description File</Text>
                    </TouchableOpacity>

                    {this.affichageConsultants}

                    <TouchableOpacity onPress={(event) => this.saveShare.bind(this)}>
                        <Text>Save & Share</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    saveShare(){

    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: width,
    },
    inputDate:{
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
