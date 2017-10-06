/**
 * Created by krlme on 03/10/2017.
 */
import React, { Component} from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Couleurs from '../scripts/Couleurs';

import {ws} from '../index.js'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Email extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emails: ['erjesklfs','ffdjsklfds','fdjsklfds','ffdsjkflfds'],
            email: '',
            showListCommerciaux: false
        };

        this.props.navigator.setStyle({
            navBarHidden: true
        });
    }

    componentDidMount()
    {
        this.refreshCommerciaux();
    }

    refreshCommerciaux() {

        this.setState({
            refreshing:true
        });
        ws.getListeCommerciaux((data) => {
            this.setState({
                data: ws.Commerciaux,
                refreshing: false
            })
        });
        /*this.setState({
            refreshing: false
        })*/
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    recherche(){
        let temp = ws.Commerciaux,
            emailFilter = ws.Commerciaux;

        if(typeof text === 'string' && text.length > 0){
            emailFilter = [];
            let regex = new RegExp(text.toLowerCase(), 'i');

            for (let key in temp) {
                if(temp[key].titre.toLowerCase().match(regex)) {
                    emailFilter.push(temp[key]);
                }
            }
        }
        this.setState({
            data: emailFilter
        });

    }

    deleteEmail(item){
        for (let i = 0; i < this.state.emails.length; i++) {
            if (item === this.state.email[i]) {

                let listeData = this.state.emails;

                listeData.splice(i, 1); // supprime la ligne dans data

                this.setState({
                    emails: listeData
                })

            }
        }
    }

    selectEmail(item){
        this.state.emails.push(item);
        this.setState({showListCommerciaux: false},  ()  =>  {alert(this.state.emails)})
    }

    _renderItem(item) {
        return(
            <View style={styles.email}>
                <Text>{item}</Text>
                <Ionicons name="ios-close" onPress={() => {this.deleteEmail(item)}}/>
            </View>
        )
    };

    _renderEmail(item) {
        return(
            <TouchableOpacity style={styles.email} onPress={() => {this.selectEmail(item)}}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    };

    displayListCommerciaux(){
        if (!this.state.showListCommerciaux) {
            let commerciauxListOff =
                {
                    color: '#000',
                    backgroundColor: '#fff',
                    height: 50,
                    borderRadius: 10,
                    marginTop : width*0.025,
                    borderStyle: 'solid',
                    borderColor: '#B9B9B9',
                    borderWidth: 1,
                    paddingLeft: 15
                };
            return (
                <TextInput style={{commerciauxListOff}}
                           placeholder="Client"
                           ref={'client'}
                           value={this.state.email}
                           returnKeyType={'next'}
                           clearButtonMode={'never'}
                           keyboardType={'default'}
                           underlineColorAndroid='transparent'
                           onFocus={() => {
                               this.setState({showListCommerciaux: true})}}
                           onChangeText={(mail) => {
                               this.setState({
                                   email: mail
                               });
                               this.recherche(mail)
                           }}
                />
            );
        }else{
            let commerciauxListOn = {
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
                };
            return(
                <View>
                    <TextInput style={{commerciauxListOn}}
                               placeholder="Client"
                               value={this.state.email}
                               returnKeyType={'next'}
                               clearButtonMode={'never'}
                               keyboardType={'default'}
                               underlineColorAndroid='transparent'
                               onFocus={() => {this.setState({showListCommerciaux: true})}}
                               onEndEditing={() => {this.setState({showListCommerciaux: false})}}
                               onChangeText={(nom) => {
                                   this.setState({
                                       email: nom
                                   });
                                       this.recherche(nom)
                               }}
                    />
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({item}) => this._renderEmail(item)}
                        keyExtractor={(item) => item.client}
                    />
                </View>
            );
        }
    }

    EcranListe() {
        return (
            <ScrollView style={{height: 200}}>
                <FlatList
                    data={this.state.emails}
                    extraData={this.state}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item) => item}
                    style={styles.list}
                />
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.view}>

                    {this.displayListCommerciaux()}

                    {this.EcranListe()}

                </View>


            </View>
        );

    }

    saveShare(){

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Couleurs.black+'CC',
        paddingHorizontal: 10,
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    email: {
        width: (width-5)/2
    },
    view:{
        flex: 1,
        borderRadius: 10,
        paddingBottom: 10,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: width/4*3,
        height: height/2
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
        paddingLeft: 15,
        width: 200
    },
    list:{
        height: 50,
        backgroundColor: Couleurs.rouge
    }
});
