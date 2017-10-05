
import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Swipeout from 'react-native-swipeout';

import Couleurs from '../scripts/Couleurs';
import {ws} from '../index.js'
import Navbar from './component/Navbar.js'

var width = Dimensions.get('window').width,
    timeoutBouton= 2000;


function arrayFromHashes(first, second) {
    let temp = [],
        idsOk = [];
    for(let i in first) {
        temp.push(first[i]);
        idsOk.push(first[i].id_besoin);
    }
    for(let i in second) {
        if(typeof(idsOk[second[i].id_besoin]) == 'undefined') {
            temp.push(second[i]);
        }
    }
    return temp;
}


export default class ListeBesoins extends Component {

    static navigatorStyle={
        navBarCustomView:'SA.Navbar.RechercheBesoin',
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.navigator.setStyle({
            navBarBackgroundColor: Couleurs.header.background,
            navBarTextColor: Couleurs.header.title
        })

        this.state = {
            data: [
                {titre: 'Proposition de contrat CGI refonte SI', date:'30/12/1995', statut: 'Validated'},
                {titre: 'konnichiwa', date:'30/12/1995', statut: 'refusé'},
                {titre: 'bonjouro', date:'30/12/1995', statut: 'En attente'},
                {titre: 'sdfg', date:'30/12/1995', statut: 'validé'},
                {titre: 'gfds', date:'30/12/1995', statut: 'refusé'},
                {titre: 'gdfgsdf', date:'30/12/1995', statut: 'En attente'},
                {titre: 'fgsdfgsd', date:'30/12/1995', statut: 'validé'},
                {titre: 'sdfgsdf', date:'30/12/1995', statut: 'refusé'},
                {titre: 'gfdg', date:'30/12/1995', statut: 'En attente'},
                {titre: 'gfder', date:'30/12/1995', statut: 'validé'},
                {titre: 'grtyth', date:'30/12/1995', statut: 'refusé'},
                {titre: 'sdfgrt', date:'30/12/1995', statut: 'En attente'},
                {titre: 'helyuikhlo', date:'30/12/1995', statut: 'validé'},
                {titre: 'oihouil', date:'30/12/1995', statut: 'refusé'},
                {titre: 'mpoiu', date:'30/12/1995', statut: 'En attente'}],

            press: true,
            refreshing: false,
            liste: true,
            filtre: 'titre',

            dataSet:[
                {titre: 'Proposition de contrat CGI refonte SI', date:'30/12/1995', statut: 'Validated'},
        {titre: 'konnichiwa', date:'30/12/1995', statut: 'refusé'},
        {titre: 'bonjouro', date:'30/12/1995', statut: 'En attente'},
        {titre: 'sdfg', date:'30/12/1995', statut: 'validé'},
        {titre: 'gfds', date:'30/12/1995', statut: 'refusé'},
        {titre: 'gdfgsdf', date:'30/12/1995', statut: 'En attente'},
        {titre: 'fgsdfgsd', date:'30/12/1995', statut: 'validé'},
        {titre: 'sdfgsdf', date:'30/12/1995', statut: 'refusé'},
        {titre: 'gfdg', date:'30/12/1995', statut: 'En attente'},
        {titre: 'gfder', date:'30/12/1995', statut: 'validé'},
        {titre: 'grtyth', date:'30/12/1995', statut: 'refusé'},
        {titre: 'sdfgrt', date:'30/12/1995', statut: 'En attente'},
        {titre: 'helyuikhlo', date:'30/12/1995', statut: 'validé'},
        {titre: 'oihouil', date:'30/12/1995', statut: 'refusé'},
        {titre: 'mpoiu', date:'30/12/1995', statut: 'En attente'}]

        };

    }

    componentDidMount()
    {
       // this.refreshListe();
     }


    _ajoutBesoin() {
        this.props.navigator.push({
            screen: 'SA.FicheBesoin'
        })
    }

    affichageAjoutPatient() {
        return (
            <SimpleLineIcons name="plus" style={[styles.ajoutBesoin, {top : 10}]} onPress={this._ajoutBesoin.bind(this)}/>
        );
    }

    onNavigatorEvent(event){
        // handle a deep link
        if (event.type === 'DeepLink') {
            const parts = event.link.split('/'); // Link parts
            const payload = event.payload; // (optional) The payload

            if (parts[0] === 'rechercheBesoin') {
                this.recherche(payload);
            }
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
                switch (this.state.filtre){

                    case 'titre':
                        if(temp[key].titre.toLowerCase().match(regex)) {
                            besoinFilter.push(temp[key]);
                        }
                        break;

                    case 'client':
                        if(temp[key].client.toLowerCase().match(regex)) {
                            besoinFilter.push(temp[key]);
                        }
                        break;

                    case 'date':
                        if(temp[key].date.toLowerCase().match(regex)) {
                            besoinFilter.push(temp[key]);
                        }
                        break;

                    case 'statut':
                        if(temp[key].statut.toLowerCase().match(regex)) {
                            besoinFilter.push(temp[key]);
                        }
                        break;
                }
            }
        }
        this.setState({
            data: besoinFilter
        });
    }


    refreshListe() {

        this.setState({
            refreshing:true
        });
        ws.getListeBesoins((data) => {
            this.setState({
                data: ws.besoins,
                refreshing: false
            })
        });
        this.setState({
            refreshing: false
        })
    }



    deleteBesoin(besoin){
        let listeData = this.state.data, //listeData prend data
            indexData = listeData.indexOf(besoin);

        listeData.splice(indexData, 1); // supprime la ligne dans data

        AsyncStorage.setItem('Wishlist', JSON.stringify(listeData), () => {
                this.setState({
                data: listeData  //on reset les states et enregistre la listes modifée
            }, () =>   {
                    this._onRefresh(); // on refresh pour être sûr que la modif apparaise à l'ecran
                });
        })

    }

    setFiltre(choix){
        this.setState({filtre: choix})
    }


    _renderItem(item) {
        let swipeoutBtns = [
                {
                    text: 'Delete',
                    backgroundColor: Couleurs.mainColors.black,
                    color: Couleurs.mainColors.orange,
                    height: 100,
                    onPress: () => {
                        this.deleteBesoin(itemSelect)
                    }
                }],

            itemSelect = null;

        return(
        <Swipeout right={swipeoutBtns} autoClose={true} onOpen={() => {itemSelect = item }} buttonWidth={70} style={styles.touchable}>
            <TouchableOpacity  onPress={() => {this._choixBesoin(item)}}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        Title : {item.titre}
                    </Text>
                </View>
                <View style={styles.statusAndDate}>
                    <Text style={styles.statusText}>
                        Status : {item.statut}
                    </Text>
                    <Text style={styles.dateText}>
                        Date : {item.date}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
        )
    };

    listeFiltre(){
        return(
            <View style={styles.viewFiltres}>
                <TouchableOpacity style={this.state.filtre === 'titre' ? styles.filtreSelection : styles.filtre} onPress={()=> {this.setFiltre('titre')}}>
                    <Text style={styles.filterTitles}>Title</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.filtre === 'client' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setFiltre('client')}}>
                    <Text style={styles.filterTitles}>Client</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.filtre === 'date' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setFiltre('date')}}>
                    <Text style={styles.filterTitles}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={this.state.filtre === 'statut' ? styles.filtreSelection: styles.filtre} onPress={()=> {this.setFiltre('statut')}}>
                    <Text style={styles.filterTitles}>Status</Text>
                </TouchableOpacity>
            </View>
        )
    }

    EcranListe(){
        return (
            <View style={styles.subHeader}>
                <Navbar style={styles.navbar} text={this.state.text}/>

                {this.listeFiltre()}

                <ScrollView style={styles.container} refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.refreshListe.bind(this)}
                                enabled={true}/>
                        }>
                    <View style={styles.subSubHeader}></View>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({item}) => this._renderItem(item)}
                        keyExtractor={(item) => item.titre}
                    />
                </ScrollView>
                {this.affichageAjoutPatient()}


            </View>
        );
    }

    render() {
        if (this.state.liste) {
            return(this.EcranListe())
        }
        else {
            return (
                <View >
                    <Text>
                        Vous n'avez pas de commande en cours
                    </Text>
                </View>
            );
        }

    }

    _choixBesoin(item){
        if (this.state.press) {
            this.props.navigator.push({
                screen: 'SA.Besoin',
                passProps:{
                   item : item
                }
            });
            this.setState({press: false});
            setTimeout(() => {
                this.setState({
                    press:true
                })
            }, timeoutBouton)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Couleurs.list.background,
        marginBottom: 60
    },
    ajoutBesoin: {
        position: 'absolute',
        right : 15,
        backgroundColor: 'transparent',
        color: Couleurs.header.title,
        fontSize: 40
    },
    filtre: {
        borderWidth: 1,
        width: width/4,
        justifyContent: 'center',
    },
    filtreSelection: {
        backgroundColor: Couleurs.header.background,
        borderWidth: 1,
        width: width/4,
        justifyContent: 'center',
    },
    flatList: {
        backgroundColor: Couleurs.list.background,
    },
    title: {
        display: 'flex',
        marginBottom: 15
    },
    statusAndDate: {
        flexDirection: 'row',
        width: width
    },
    statusText: {
        fontSize: 18,
        color: '#000000',
        marginLeft: 10,
        marginBottom: 10,
        bottom: 6
    },
    dateText: {
        textAlign: 'right',
        fontSize: 18,
        color: '#000000',
        position: 'absolute',
        right: 6,
        bottom: 15
    },
    titleText: {
        textAlign: 'left',
        fontSize: 18,
        color: '#000000',
        marginTop: 10,
        marginLeft: 10,
    },
    touchable:{
        height: 80,
        width: width,
        backgroundColor: Couleurs.list.background,
        borderBottomWidth: 1,
        borderBottomColor: Couleurs.list.border,
    },
    subHeader: {
        backgroundColor: Couleurs.list.black
    },
    subSubHeader: {
        backgroundColor: Couleurs.list.background,
        borderBottomWidth: 1,
        borderBottomColor: Couleurs.list.border,
    },
    navbar:{
        backgroundColor: Couleurs.list.background,
        color: Couleurs.header.title,
    },
    viewFiltres:{
        flexDirection: 'row',
        height: 50,
        width: width,
    },
    filterTitles:{
        color: Couleurs.header.title,
        textAlign: 'center',
    }

});
