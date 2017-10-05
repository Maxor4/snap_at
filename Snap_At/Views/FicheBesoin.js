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
    View,
    FlatList,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Couleurs from '../scripts/Couleurs';
import Swipeout from 'react-native-swipeout';

import {ws} from '../index.js'

var width = Dimensions.get('window').width,
    dateFormat = require('dateformat'),
    timeoutBouton= 2000;

const dateJour = dateFormat(new Date(), 'dd/mm/yyyy');

export default class FicheBesoin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clients:[],
            titre: '',
            contactcli: '',
            showListClient: false,
            client: '',
            datecreation: dateJour,
            description: '',
            showFactors: false,
            factor1: '',
            factor2: '',
            factor3: '',
            showConsultants: false,
            consultant1: '',
            consultant2: '',
            consultant3: '',
            consultant4: '',
            consultant5: '',
            tempsDuree: null,
            typeDuree: 'Jour',
            dateLatest: null,
            address: '',
            zipCode: '',
            rate: null,
        };

        this.props.navigator.setStyle({
            navBarBackgroundColor: Couleurs.header.background,
            navBarTextColor: Couleurs.header.title,
            navBarButtonColor: Couleurs.header.title,
            navBarTitleTextCentered: true
        })
        this.props.navigator.setTitle({
            title: 'Need sheet'
        })
    }

    componentDidMount()
    {
        this.refreshClients();
    }

    refreshClients() {

        this.setState({
            refreshing:true
        });
        ws.getListeClients((data) => {
            alert(ws.Clients)
            this.setState({
                data: ws.Clients,
                refreshing: false
            })
        });
        /*this.setState({
            refreshing: false
        })*/
    }

    textInputFocused() {
        this.refs['mainScrollview'].contentOffset;
    }

    affichageFlecheDropdown() {
        return (<SimpleLineIcons name="arrow-down" style={[styles.dropdownarrow, {top : 10}]}/>);
    }


    affichageFactors(){
        if (!this.state.showFactors){
            return(
                <View>
                    <TouchableOpacity style={styles.dropDown} onPress={() => {this.setState({showFactors: !this.state.showFactors})}}>
                        <Text style={styles.txtDropDown}> Factors </Text>
                        {this.affichageFlecheDropdown()}
                    </TouchableOpacity>

                </View>
            )
        }
        else {
            return(
                <View>
                    <TouchableOpacity style={styles.dropDown} onPress={() => {this.setState({showFactors: !this.state.showFactors})}}>
                        <Text style={styles.txtDropDown}> Factors </Text>
                        {this.affichageFlecheDropdown()}
                    </TouchableOpacity>
                    <TextInput
                        style={styles.subInput}
                        placeholder="Factor 1"
                        value={this.state.factor1}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                factor1: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.subInput}
                        placeholder="Factor 2"
                        value={this.state.factor2}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                factor2: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.subInput}
                        placeholder="Factor 3"
                        value={this.state.factor3}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                factor3: nom
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
                    <TouchableOpacity style={styles.dropDown} onPress={() => {this.setState({showConsultants: !this.state.showConsultants})}}>
                        <Text style={styles.txtDropDown}> Consultants </Text>
                        {this.affichageFlecheDropdown()}
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return(
                <View>
                    <TouchableOpacity style={styles.dropDown} onPress={() => {this.setState({showConsultants: !this.state.showConsultants})}}>
                        <Text style={styles.txtDropDown}> Consultants </Text>
                        {this.affichageFlecheDropdown()}
                    </TouchableOpacity>
                    <TextInput
                        style={styles.subInput}
                        placeholder="Consultant 1"
                        value={this.state.consultant1}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                consultant1: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.subInput}
                        placeholder="Consultant 2"
                        value={this.state.consultant2}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                consultant2: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.subInput}
                        placeholder="Consultant 3"
                        value={this.state.consultant3}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                consultant3: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.subInput}
                        placeholder="Consultant 4"
                        value={this.state.consultant4}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                consultant4: nom
                            })
                        }}
                    />
                    <TextInput
                        style={styles.subInput}
                        placeholder="Consultant 5"
                        value={this.state.consultant5}
                        returnKeyType={'next'}
                        clearButtonMode={'never'}
                        keyboardType={'default'}
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => {
                            this.setState({
                                consultant5: nom
                            })
                        }}
                    />
                </View>
            )
        }
    }

    recherche(text) {
        /*let temp = arrayFromHashes(ws.besoins),
            besoinFilter = ws.besoins;*/
        let temp = this.state.dataSet,
            besoinFilter = this.state.dataSet;
        let re = /^([a-zA-Z0-9_])*$/;
        if(!re.test(text)){
            this.setState({text: text.substring(0, text.length-1)},() => {text = this.state.text;});
        }else{
            this.setState({text: text})
        }
        if(typeof text === 'string' && text.length > 0){
            besoinFilter = [];
            let regex = new RegExp(text.toLowerCase(), 'i');

            for (let key in temp) {
                if(temp[key].client.toLowerCase().match(regex)) {
                    besoinFilter.push(temp[key]);
                }
            }
        }
        this.setState({
            data: besoinFilter
        });
    }



    displayListClient(){
        if (!this.state.showListClient) {
            clientListOff = function(options) {
                return {
                    color: '#000',
                    backgroundColor: '#fff',
                    height: 50,
                    borderRadius: 10,
                    marginTop : width*0.025,
                    borderStyle: 'solid',
                    borderColor: '#B9B9B9',
                    borderWidth: 1,
                    paddingLeft: 15
                }
            }
            return (
                <TextInput style={clientListOff()}
                           placeholder="Client"
                           ref={'client'}
                           value={this.state.client}
                           returnKeyType={'next'}
                           clearButtonMode={'never'}
                           keyboardType={'default'}
                           underlineColorAndroid='transparent'
                           onFocus={() => {
                               this.setState({showListClient: !this.state.showListClient})}}
                           onChangeText={(nom, text) => {
                               this.setState({
                                   client: nom
                               }),
                                   this.recherche(text)
                           }}
                />
            );
        }else{
            clientListOn = function(options) {
                return {
                    color: '#000',
                    backgroundColor: '#fff',
                    height: 50,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderStyle: 'solid',
                    borderColor: '#B9B9B9',
                    borderWidth: 1,
                    paddingLeft: 15,
                    paddingTop: 15
                }
            }
            return(
                <View>
                    <TextInput style={clientListOn()}
                               placeholder="Client"
                               value={this.state.client}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onFocus={() => {this.setState({showListClient: this.state.showListClient})}}
                               onEndEditing={() => {this.setState({showListClient: !this.state.showListClient})}}
                               onChangeText={(nom) => {
                                   this.setState({
                                       client: nom
                                   }),
                                       this.recherche(nom)
                               }}
                    />
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({item}) => this._renderItem(item)}
                        keyExtractor={(item) => item.client}
                    />
                </View>
            );
        }
    }

    _choixBesoin(item){
        if (this.state.press) {
            this.setState({client: item.client});
            this.setState({press: false});
            setTimeout(() => {
                this.setState({
                    press:true
                })
            }, timeoutBouton)
            this.setState({showListClient: !this.state.showListClient});
            this.displayListClient();
        }
    }

    _renderItem(item) {
        let swipeoutBtns = [
                {
                    text: 'Delete',
                    backgroundColor: Couleurs.mainColors.black,
                    color: Couleurs.mainColors.orange,
                    height: 100,
                    onPress: () => {
                        this.deleteBesoin(itemSelect);
                    }
                }],

            itemSelect = null;

        return(
            <Swipeout right={swipeoutBtns} autoClose={true} onOpen={() => {itemSelect = item }}  buttonWidth={70} style={styles.touchable}>
                <TouchableOpacity  onPress={() => {this._choixBesoin(item)}}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                           {item.client}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    };

    render() {
        return (
            <ScrollView style={styles.container} ref={'mainScrollview'}>

                <View style={styles.viewGenerale}>

                    <TextInput style={styles.inputDate}
                               value={dateJour}
                               underlineColorAndroid='transparent'
                               editable={false}
                               caretHidden={true}
                    />

                    {this.displayListClient()}




                    <TextInput style={styles.input}
                               placeholder="Contact Name"
                               value={this.state.contactcli}
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

                    <TextInput style={styles.input}
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

                    <TextInput style={styles.input}
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

                    {this.affichageFactors()}

                    <View style={styles.durationView}>
                        <TextInput style={styles.inputDuration}
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
                            <Picker.Item style={{width: 30}} label="1" value={1} />
                            <Picker.Item style={{width: 30}} label="2" value={2} />
                            <Picker.Item style={{width: 30}} label="3" value={3} />
                            <Picker.Item style={{width: 30}} label="4" value={4} />
                            <Picker.Item style={{width: 30}} label="5" value={5} />
                            <Picker.Item style={{width: 30}} label="6" value={6} />
                            <Picker.Item style={{width: 30}} label="7" value={7} />
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
                               onChangeText={(date) => {
                                   this.setState({
                                       dateLatest: date
                                   })
                               }}
                    />


                    <TextInput style={styles.input}
                               placeholder="Address"
                               value={this.state.address}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onFocus={this.textInputFocused.bind(this)}
                               onChangeText={(adresse) => {
                                   this.setState({
                                       address: adresse
                                   })
                               }}
                    />

                    <TextInput style={styles.input}
                               placeholder="Zip code"
                               value={this.state.zipCode}
                               returnKeyType={'done'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onFocus={this.textInputFocused.bind(this)}
                               onChangeText={(zip) => {
                                   this.setState({
                                       zipCode: zip
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
                               onChangeText={(valeur) => {
                                   this.setState({
                                       rate: valeur
                                   })
                               }}
                    />

                    <TouchableOpacity style={styles.bouton}>
                        <Text style={styles.txtBouton}>Description File</Text>
                    </TouchableOpacity>

                    {this.affichageConsultants()}

                    <TouchableOpacity style={styles.bouton} onPress={this.saveShare.bind(this)}>
                        <Text style={styles.txtBouton}>Save & Share</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }

    saveShare(){
        let besoin = {
                titre: this.state.titre,
                contactcli: this.state.contact,
                client: this.state.client,
                datecreation: this.state.datecreation,
            description: this.state.description,
                tempsDuree: this.state.tempsDuree,
                typeDuree: this.state.typeDuree,
                dateLatest: this.state.dateLatest,
                address: this.state.address,
                zipCode: this.state.zipCode,
                rate: this.state.rate,};

        /*ws.creationBesoin(besoin, () => {
            this.props.navigator.showModal({
                screen: 'SA.SelectEmails'
            })
        })*/

        this.props.navigator.showModal({
            screen: 'SA.SelectEmails'
        })

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
        fontSize: 21,
        color: Couleurs.header.background
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
        paddingTop: 75,
        right: 3
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
    inputClient:{
        color: '#000',
        backgroundColor: '#fff',
        height: 50,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginTop : width*0.025,
        borderStyle: 'solid',
        borderColor: '#B9B9B9',
        borderWidth: 1,
        paddingLeft: 15
    },
    subInput:{
        color: '#000',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        marginTop : width*0.025,
        borderStyle: 'solid',
        borderColor: '#B9B9B9',
        borderWidth: 1,
        paddingLeft: 15,
        marginLeft: 40
    },
    inputDuration:{
        width: width/2,
        color: '#000',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        marginTop : width*0.025,
        borderStyle: 'solid',
        borderColor: Couleurs.list.border,
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
        fontSize: 16,
        color: Couleurs.mainColors.orange
    },
    durationView: {
        flexDirection: 'row',
        marginBottom: -10,
    },
    dpw: {
        paddingTop: 30
    },
    dropDown:{
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: Couleurs.lightGray,
        marginTop : width*0.05,
        borderStyle: 'solid',
        borderColor: Couleurs.list.border,
        borderWidth: 1,
        justifyContent: 'center'
    },
    txtDropDown:{
        textAlign: 'center',
        fontSize: 16,
    },
    dropdownarrow:{
        color: Couleurs.noir,
        position: 'absolute',
        right: 15,
        fontSize: 20,
    },
    touchable: {
            backgroundColor: Couleurs.header.background,
            height: 50,
            borderStyle: 'solid',
            borderColor: '#B9B9B9',
            borderWidth: 1,
            paddingLeft: 15,
        paddingTop: 10
    },
    titleText:{
        color: Couleurs.header.title
    }

});
