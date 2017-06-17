import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {connect} from 'react-redux';
import {createVote, setTooltipToggle, toggleTooltip} from '../states/post-actions';
import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem, Icon} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        bookName: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {author, bookName, location, status} = this.props;

        return (
            <ListItem style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.wrap}>
                    <Text style={styles.text}>{bookName}</Text>
                    <Text style={styles.text}>{author}</Text>
                    <Text style={styles.text}>{location}</Text>
                    <Text style={styles.text}>{status}</Text>
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

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(PostItem);
