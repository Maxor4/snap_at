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
import Couleurs from '../scripts/Couleurs';

import {ws} from '../index.js'

var width = Dimensions.get('window').width,
    dateFormat = require('dateformat');

const dateJour = dateFormat(new Date(), 'dd/mm/yyyy');

export default class FicheBesoin extends Component {

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            navBarBackgroundColor: Couleurs.header.background,
            navBarTextColor: Couleurs.header.title,
            navBarButtonColor: Couleurs.header.title,
            navBarTitleTextCentered: true
        })
        this.props.navigator.setTitle({
            title: 'Details'
        })

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
            let a = JSON.stringify(i)
            return(
                <Picker.Item label={a} value={i} />
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

                    <TextInput style={styles.input}
                               placeholder="Client"
                               value={this.state.client}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(nom) => {
                                   this.setState({
                                       client: nom
                                   })
                               }}
                    />

                    <TextInput style={styles.input}
                               placeholder="Contact Name"
                               value={this.state.contact}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(nom) => {
                                   this.setState({
                                       contact: nom
                                   })
                               }}
                    />

                    <TextInput style={styles.input}
                               placeholder="Title"
                               value={this.state.titre}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'numeric'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(titre) => {
                                   this.setState({
                                       titre : titre,
                                   })
                               }}
                    />

                    <TextInput style={styles.input}
                               placeholder="Full Description"
                               value={this.state.dureeAdmin}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(text) => {
                                   this.setState({
                                       description: text
                                   })
                               }}
                    />

                    {this.affichageFactors}

                    <View style={styles.durationView}>
                        <TextInput style={styles.inputDuration}
                                   placeholder={"Duration (months)"}
                                   value={this.state.tempsDuree}
                                   returnKeyType={'next'}
                                   clearButtonMode={'never'}
                                   keyboardType={'numeric'}
                                   underlineColorAndroid='transparent'
                                   editable={false}
                                   onChangeText={(tempsDuree) => {
                                       this.setState({
                                           tempsDuree: tempsDuree
                                       })
                                   }}
                        />

                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.typeDuree}
                            enabled={false}
                            onValueChange={(itemValue, itemIndex) => this.setState({typeDuree: itemValue})}
                        >
                            {this.populatePicker()}
                        </Picker>

                        <Text style={styles.dpw}>Days per week</Text>

                    </View>
                    <TextInput style={styles.input}
                               placeholder="Start at latest"
                               value={this.state.dateLatest}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(date) => {
                                   this.setState({
                                       dateLatest: date
                                   })
                               }}
                    />

                    <TextInput style={styles.input}
                               placeholder="Location"
                               value={this.state.location}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(ville) => {
                                   this.setState({
                                       location: ville
                                   })
                               }}
                    />

                    <TextInput style={styles.input}
                               placeholder="Rate (€ HT)"
                               value={this.state.rate}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'numeric'}
                               underlineColorAndroid='transparent'
                               editable={false}
                               onChangeText={(valeur) => {
                                   this.setState({
                                       rate: valeur
                                   })
                               }}
                    />

                    <TouchableOpacity style={styles.bouton}>
                        <Text style={styles.txtBouton}>Description File</Text>
                    </TouchableOpacity>

                    {this.affichageConsultants}

                    <TouchableOpacity style={styles.bouton} onPress={(event) => this.saveShare.bind(this)}>
                        <Text style={styles.txtBouton}>Save & Share</Text>
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
        backgroundColor: Couleurs.list.background
    },
    inputDate:{
        marginTop: 2,
        fontSize: 21
    },
    inputAdministration:{
        marginTop: 30,
        fontSize: 21
    },
    inputCure:{
        width: 200,
        marginRight: 3,
        fontSize: 21
    },
    inputFinCure:{
        fontSize: 21
    },
    inputFrequence:{
        width: 200,
        fontSize: 21
    },
    picker:{
        width: 100,
        height: 50,
        paddingTop: 75
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
        color:'#000',
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
    input:{
        color: '#000',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        marginTop : width*0.025,
        borderStyle: 'solid',
        borderColor: '#B9B9B9',
        borderWidth: 1,
        paddingLeft: 15
    },
    inputDuration:{
        width: width/2,
        color: '#000',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        marginTop : width*0.025,
        borderStyle: 'solid',
        borderColor: '#B9B9B9',
        borderWidth: 1,
        paddingLeft: 15
    },
    bouton:{
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: Couleurs.header.background,
        marginTop : width*0.05
    },
    txtBouton:{
        textAlign: 'center',
        fontSize: 14,
        color: Couleurs.mainColors.orange
    },
    durationView: {
        flexDirection: 'row',
        marginBottom: -10
    },
    dpw: {
        paddingTop: 30
    }
});
