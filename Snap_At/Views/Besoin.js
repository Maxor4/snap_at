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

        };

        this.props.navigator.setStyle({
            navBarBackgroundColor: Couleurs.header.background,
            navBarTextColor: Couleurs.header.title,
            navBarButtonColor: Couleurs.header.title,
            navBarTitleTextCentered: true
        })

        this.props.navigator.setTitle({
            title: ''
        })
    }


    affichageFactors(){
        return(
            <View>
                <Text style={styles.txtDropDown}> Factors </Text>

                <Text style={styles.subInput}> {this.props.besoin.succesun}</Text>
                <Text style={styles.subInput}> {this.props.besoin.succesdeux}</Text>
                <Text style={styles.subInput}> {this.props.besoin.succestrois}</Text>

            </View>
        )
    }

    affichageConsultants(){
        return(
            <View>
                <Text style={styles.txtDropDown}> Consultants </Text>

                <Text style={styles.subInput}> {this.props.besoin.nomconsun}</Text>
                <Text style={styles.subInput}> {this.props.besoin.nomconsdeux}</Text>
                <Text style={styles.subInput}> {this.props.besoin.nomconstrois}</Text>
                <Text style={styles.subInput}> {this.props.besoin.nomconsquatre}</Text>
                <Text style={styles.subInput}> {this.props.besoin.nomconscinq}</Text>

            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container} ref={'mainScrollview'}>

                <View style={styles.viewGenerale}>

                    <Text>{this.props.date}</Text>

                    <Text style={clientList}>{this.props.besoin.client}</Text>

                    <Text style={styles.Input}> {this.props.besoin.contactcli}</Text>

                    <Text style={styles.Input}> {this.props.besoin.titre}</Text>

                    <Text style={styles.Input}> {this.props.besoin.description}</Text>

                    {this.affichageFactors()}

                    <View style={styles.durationView}>

                        <Text style={styles.inputDuration}> {this.props.besoin.dureem} months</Text>

                        <Text style={styles.picker}> {this.props.besoin.dureej} </Text>

                        <Text style={styles.dpw}>Days per week</Text>
                    </View>

                    <Text style={styles.input}> {this.props.besoin.datedebuttard} </Text>

                    <Text style={styles.input}> {this.props.besoin.address} </Text>

                    <Text style={styles.input}> {this.props.besoin.zipCode} </Text>

                    <Text style={styles.input}> {this.props.besoin.tarif} € HT</Text>

                    {this.affichageConsultants()}

                </View>
            </ScrollView>
        );
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
