
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
            <TouchableOpacity style={{backgroundColor: 'red'}} onPress={this.delete.bind(this)}><Text>Delete</Text></TouchableOpacity>,
        ];

        this.state = {
            isSwiping: false,
            swipeable: null,
        data: [
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
                <TouchableOpacity onPress={this._handlePress(item)}>
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
            </Swipeable>
        )
    };

    render() {
        return (
            <ScrollView scrollEnabled={!this.state.isSwiping}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={({item}) => this._renderItem(item)}
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
});
