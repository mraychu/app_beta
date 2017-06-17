import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native'
import { List, ListItem, Left, Body, Right, Switch } from 'native-base';
import {Container, Content, Thumbnail, Icon, Badge, Button, Text as NbText} from 'native-base';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    render() {
      const {navigate} = this.props;
      return (
        <Container style={styles.drawer}>
            <View style={styles.stateContainer}>
                <Button block transparent style={styles.item} onPress={() => navigate('Today')}>
                    <Icon name='rocket' style={styles.icon} />
                    <Text style={styles.text}>state</Text>
                </Button>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>
                <Button block transparent style={styles.item} onPress={() => navigate('Today')}>
                    <Icon name='rocket' style={styles.icon} />
                    <Text style={styles.text}>Search</Text>
                    <Badge primary style={styles.badge}>
                        <NbText style={styles.badgeText}>2</NbText>
                    </Badge>
                </Button>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>

                <Button block transparent style={styles.item} onPress={() => navigate('Forecast')}>
                    <Icon name='tag-multiple' style={styles.icon} />
                    <Text style={styles.text}>History</Text>
                </Button>
                <Button block transparent style={styles.item} onPress={() => navigate('PostForm')}>
                    <Icon name='tag-multiple' style={styles.icon} />
                    <Text style={styles.text}>Result</Text>
                </Button>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>

            </View>
            <View style={{flex: 2}}/>
            <View style={styles.textContainer}>
                <Text>contact us</Text>
                <Text>about</Text>
            </View>

        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    stateContainer:{
        flex: 2
    },
    textContainer:{
        flex: 2
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    }
};
