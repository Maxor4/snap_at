
import React, { Component } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

var width = Dimensions.get('window').width;

export default class ListeBesoins extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {titre: 'hello', date:'3 avril', statut: 'validé'},
                {titre: 'konnichiwa', date:'5 aout', statut: 'refusé'},
                {titre: 'bonjouro', date:'24 janvaier', statut: 'En attente'}]
        };
    }

    _renderItem(item) {
        return(
            <TouchableOpacity style={{flexDirection: 'row', marginTop: 5, backgroundColor: '#fff'}} /*onPress={this._handlePress(item)}*/>
                <View style={styles.titleAndDate}>
                    <Text style={styles.title}>
                        Titre : {item.titre}
                    </Text>
                    <Text style={styles.date}>
                        Date : {item.date}
                    </Text>
                </View>
                <View style={styles.status}>
                    <Text>
                        Statut : {item.statut}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={this.state.data}
                extraData={this.state}
                renderItem={({item}) => this._renderItem(item)}
                keyExtractor={(item) => item.titre}
            />
        );
    }

   /* _handlePress(item){
        this.props.navigator.push({
            screen: 'SA.Besoin',
            passProps: {
                item: item
            }
        })
    }*/
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

    },
    status: {
        display: 'flex'
    },
    date: {
        textAlign: 'right'
    },
    title: {
        textAlign: 'left'
    }

});
