
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
        });

        this.state = {
            data: [],
            press: true,
            refreshing: false,
            liste: true,
            filtre: 'titre',
            tri: 'statut'
        };
    }

    componentDidMount() {
       this.refreshListe();
    }


    _ajoutBesoin() {
        this.props.navigator.push({
            screen: 'SA.FicheBesoin'
        })
    }

    affichageAjoutBesoin() {
        return (
            <SimpleLineIcons name="plus" style={styles.ajoutBesoin} onPress={this._ajoutBesoin.bind(this)}/>
        );
    }

    onNavigatorEvent(event){
        // handle a deep link
        if (event.type === 'DeepLink') {
            const parts = event.link.split('/'); // Link parts
            const payload = event.payload; // (optional) The payload

            switch (parts[0]){

                case 'rechercheBesoin':
                    this.recherche(payload);
                    break;

                case 'filtre':
                    this.setState({
                        filtre: payload
                    });
                    break;

                case 'tri':
                    this.setState({
                        tri: payload
                    }, () => {this.triListe()});
                    break;
            }
        }
    }

    triListe(){
        let temp = this.state.data;

        switch (this.state.tri){

            case 'titre':
                temp.sort(function(a, b){
                    return a.titre.toLowerCase() == b.titre.toLowerCase() ? 0 : a.titre.toLowerCase() < b.titre.toLowerCase() ? -1 : 1;
                })
                break;


            case 'client':
                temp.sort(function(a, b){
                    return a.client.toLowerCase() == b.client.toLowerCase() ? 0 : a.client.toLowerCase() < b.client.toLowerCase() ? -1 : 1;
                })
                break;

            case 'date':
                temp.sort(function(a, b){
                    return a.date == b.date ? 0 : a.date < b.date ? -1 : 1;
                })
                break;

            case 'statut':
                temp.sort(function(a, b){
                    if (a.statut.toLowerCase() === 'open'){
                        return -1
                    }
                    else if (b.statut.toLowerCase() === 'open'){
                        return 1
                    }
                    else {
                        return a.statut.toLowerCase() === b.statut.toLowerCase() ? 0 : a.statut.toLowerCase() < b.statut.toLowerCase() ? -1 : 1;
                    }
                })
                break;
        }
        this.setState({
            data: temp
        })
    }

    recherche(text) {
        let temp = ws.Besoins,
            besoinFilter = ws.Besoins,
            re = /^([a-zA-Z0-9_ \/])*$/;

        if(!re.test(text)){
            if(text.length == 1 ){
                this.setState({text: ''});
                text = this.state.text;
            }else {
                this.setState({text: text.substring(0, text.length - 1)}, () => {
                    text = this.state.text;
                });
            }
        }else{
            this.setState({text: text},() => {text = this.state.text;})
        }
        if(typeof text === 'string' && text.length > 0){
            alert(this.state.text.length);
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
                data: ws.Besoins,
                refreshing: false
            }, () => {this.triListe()})
});
    }


    deleteBesoin(besoin){
        let listeData = this.state.data, //listeData prend data
            indexData = listeData.indexOf(besoin);

        listeData.splice(indexData, 1); // supprime la ligne dans data

        AsyncStorage.setItem('Wishlist', JSON.stringify(listeData), () => {
                this.setState({
                data: listeData  //on reset les states et enregistre la listes modifée
            }, () =>   {
                    this.refreshListe(); // on refresh pour être sûr que la modif apparaise à l'ecran
                });
        })

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
            <TouchableOpacity  onPress={() => {this._choixBesoin(item.itc)}}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        {this.state.tri === 'client' ? 'Client : '+item.client : 'Title : '+item.titre}
                    </Text>
                </View>
                <View style={styles.statusAndDate}>
                    <Text style={styles.statusText}>
                        Status : {item.statut}
                    </Text>
                    <Text style={styles.dateText}>
                        Date : {item.datecreation.substring(0, item.datecreation.length-15)}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
        )
    };

    listeFiltre(){
        return(
            <View style={styles.viewFiltres}>
                <TouchableOpacity  style={styles.filtre}
                                   onPress={()=> {
                                   this.props.navigator.toggleDrawer({
                                       side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                                       animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                                   })}}>
                    <Text style={styles.filterTitles}>Sort By</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.filtre}
                                   onPress={()=> {
                                   this.props.navigator.toggleDrawer({
                                       side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
                                       animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                                   })}}>
                    <Text style={styles.filterTitles}>Search By</Text>
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
                {this.affichageAjoutBesoin()}


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
                   besoin : item
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
        fontSize: 40,
        top : 10
    },
    filtre: {
        borderWidth: 1,
        width: width/2,
        justifyContent: 'center',
        backgroundColor: Couleurs.list.background
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
        justifyContent: 'space-between',
        height: 50,
        width: width,
    },
    filterTitles:{
        color: Couleurs.header.title,
        textAlign: 'center',
    }

});
