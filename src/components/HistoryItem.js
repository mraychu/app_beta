import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem, Icon} from 'native-base';

export default class HistoryItem extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        const {searchText,type,date} = this.props;

        return (
            <ListItem style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.wrap}>
                    <Text style={styles.text}>{searchText}</Text>
                    <Text style={styles.text}>{type=='name'?'書名':'ISBN'}</Text>
                    <Text style={styles.text}>{date}</Text>
                </View>
            </ListItem>
        );
    }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 3
    },
    post: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    wrap: {
        flex: 1
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    }
});
