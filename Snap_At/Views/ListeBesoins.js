
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

    constructor(props) {
        super(props);

        this.props.navigator.setTitle({
            title: "Dynamic Title" // the new title of the screen as appears in the nav bar
        });

        this.state = {
            data: [
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'},
                {titre: 'sdfg', date:'3 avril', statut: 'validé'},
                {titre: 'gfds', date:'5 aout', statut: 'refusé'},
                {titre: 'gdfgsdf', date:'24 janvaier', statut: 'En attente'},
                {titre: 'fgsdfgsd', date:'3 avril', statut: 'validé'},
                {titre: 'sdfgsdf', date:'5 aout', statut: 'refusé'},
                {titre: 'gfdg', date:'24 janvaier', statut: 'En attente'},
                {titre: 'gfder', date:'3 avril', statut: 'validé'},
                {titre: 'grtyth', date:'5 aout', statut: 'refusé'},
                {titre: 'sdfgrt', date:'24 janvaier', statut: 'En attente'},
                {titre: 'helyuikhlo', date:'3 avril', statut: 'validé'},
                {titre: 'oihouil', date:'5 aout', statut: 'refusé'},
                {titre: 'mpoiu', date:'24 janvaier', statut: 'En attente'}],

            press: true,
            refreshing: true,
            liste: true

        };
    }

    componentDidMount()
    {
       // this.refreshListe();
    }


    _ajoutBesoin() {
        this.props.navigator.push({
            screen: 'SA.FicheBesoins'
        })
    }

    affichageAjoutPatient() {
        return (<SimpleLineIcons name="plus" style={[styles.ajoutBesoin, {bottom : 15}]} onPress={this._ajoutBesoin.bind(this)}/>);
    }

    recherche(text) {
        let temp = arrayFromHashes(ws.besoins),
            besoinFilter = ws.besoins;

        if(typeof text == 'string' && text.length > 0){
            besoinFilter = {}
            let regex = new RegExp(text.toLowerCase(), 'i');

            for (let key in temp) {
                if(temp[key].titre.toLowerCase().match(regex)) {
                    besoinFilter[key] = temp[key];
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


    _renderItem(item) {
        let swipeoutBtns = [
                {
                    text: 'Delete',
                    backgroundColor: 'blue',
                    onPress: () => {
                        this.deleteBesoin(itemSelect)
                    }
                }],

            itemSelect = null;

        return(
        <Swipeout right={swipeoutBtns} autoClose={true} onOpen={() => {itemSelect = item }} buttonWidth={70} backgroundColor={'white'} style={{borderBottomWidth: 1}}>
            <TouchableOpacity style={styles.touchable} onPress={() => {this._choixBesoin(item)}}>
                <View style={styles.titleAndDate}>
                    <Text style={styles.titleText}>
                        Titre : {item.titre}
                    </Text>
                    <Text style={styles.dateText}>
                        Date : {item.date}
                    </Text>
                </View>
                <View style={styles.status}>
                    <Text style={styles.statusText}>
                        Statut : {item.statut}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
        )
    };

    EcranListe(){
        return (
            <ScrollView style={styles.container} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshListe.bind(this)}
                            enabled={true}/>
                    }>

                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item) => item.titre}
                />
                {this.affichageAjoutPatient()}
            </ScrollView>
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

    _choixBesoin(id_besoin){
        if (this.state.press) {
            Navigation.handleDeepLink({
                link: 'Patient',
                payload : JSON.stringify(id_besoin)
            })
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
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    ajoutBesoin: {
        position: 'absolute',
        right : 15,
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 60
    },

    flatList: {
        backgroundColor: '#2F3649'
    },
    titleAndDate: {
        flexDirection: 'row'
    },
    status: {
        display: 'flex'

    },
    statusText: {
        fontSize: 16,
        color: '#FF8929',
        marginLeft: 10,
        marginBottom: 10,
    },
    dateText: {
        width: width/2,
        textAlign: 'right',
        fontSize: 16,
        color: '#FF8929'
    },
    titleText: {
        width: width/2,
        textAlign: 'left',
        fontSize: 16,
        color: '#FF8929',
        marginTop: 10,
        marginLeft: 10
    },
    touchable:{
        height: 100,
        borderRadius: 8,
        backgroundColor: '#2F3649',
    }

});
