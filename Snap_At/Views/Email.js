/**
 * Created by krlme on 03/10/2017.
 */
import React, { Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Modal,
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

export default class Email extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            email: '',
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    recherche(){
        let temp = ws.commerciaux,
            emailFilter = ws.commerciaux;

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
        this.setModalVisible(!this.state.modalVisible)
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

    EcranListe() {
        return (
            <ScrollView style={styles.container} >
                <FlatList
                    data={this.state.emails}
                    extraData={this.state}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item) => item}
                />
            </ScrollView>
        );
    }

    EcranModal(){
        return(
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} >
                <TextInput
                    ref={'email'}
                    style={styles.input}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    placeholder={'Email'}
                    underlineColorAndroid={'transparent'}
                    autoFocus={true}
                    onChangeText={(text) => {
                        this.setState({
                            email: text,
                        });
                        this.recherche()
                    }}
                    onSubmitEditing={this.focusNextField.bind(this)}
                    returnKeyType={'next'}
                />

                <ScrollView style={styles.container} >
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({item}) => this._renderEmail(item)}
                        keyExtractor={(item) => item}
                    />
                </ScrollView>
            </Modal>
        )
    }

    render() {
        return (
            <View>

                {this.EcranModal()}

                <TextInput
                    ref={'email'}
                    style={styles.input}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    placeholder={'Email'}
                    underlineColorAndroid={'transparent'}
                    onFocus={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                />

                {this.EcranListe()}
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
    email: {
        width: (width-5)/2
    }
});