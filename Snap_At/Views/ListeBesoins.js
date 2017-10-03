
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
            <TouchableOpacity style={{flexDirection: 'row', marginTop: 5}} onPress={this._handlePress(item)}>
                <Text>
                    {item.date}
                </Text>
                <Text>
                    {item.titre}
                </Text>
                <Text>
                    {item.statut}
                </Text>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <FlatList
                data={this.state.data}
                extraData={this.state}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={(item, index) => item.id}
            />
        );
    }

    _handlePress(item){
        this.props.navigator.push({
            screen: 'SA.Besoin',
            passProps: {
                item: item
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
