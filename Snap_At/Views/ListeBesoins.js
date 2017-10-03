
import React, { Component } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Swipeable from 'react-native-swipeable';

var width = Dimensions.get('window').width;

export default class ListeBesoins extends Component {

    constructor(props) {
        super(props);

        rightButtons = [
            <TouchableOpacity style={{backgroundColor: 'red'}} onPress={()=> {this.delete.bind(this)}}><Text>Delete</Text></TouchableOpacity>,
        ];

        this.props.navigator.setTitle({
            title: "Dynamic Title" // the new title of the screen as appears in the nav bar
        });

        this.state = {
            isSwiping: false,
            swipeable: null,
        data: [
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'},
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'},
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'},
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'},
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'}]
        };
    }

    handleUserBeganScrollingParentView() {
        this.state.swipeable.recenter();
    }

    delete(){
        alert('coucou')
    }

    _renderItem(item) {
        return(
            <Swipeable rightButtons={this.rightButtons}
                       onRef={ref => this.state.swipeable = ref}
                       onSwipeStart={() => this.setState({isSwiping: true})}
                       onSwipeRelease={() => this.setState({isSwiping: false})}>
                <TouchableOpacity style={styles.touchable} onPress={() => {this._handlePress(item)}}>
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
            </Swipeable>
        )
    };

    render() {
        return (
            <ScrollView scrollEnabled={!this.state.isSwiping}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={(item) => item.titre}
                />
            </ScrollView>
        );
    }

    _handlePress(item){
        alert('zrabadabajdan')
        /*this.props.navigator.push({
            screen: 'SA.Besoin',
            passProps: {
                item: item
            }
        })*/
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        marginBottom: width/4,
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
        marginTop: width/4,
        marginLeft: 10
    },
    touchable:{
        height: 70,
        borderRadius: 8,
        backgroundColor: '#2F3649',
        marginTop : width*0.05
    }

});
