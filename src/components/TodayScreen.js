import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Icon, Fab, Button, Toast} from 'native-base';
import { Container, Content, Thumbnail, Text, Form, Item, Input} from 'native-base';

import {toggleSearchModal, setSearchText} from '../states/search';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import NavigationContainer from './NavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

class TodayScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            })
            this.props.dispatch(setToast(''));
        }
    }

    render() {
        const {searchText} = this.props.searchText
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='找書，隨心所欲'>
                    <View style={styles.body}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../images/main-bg_2.jpg')} style={styles.bgImage}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../images/l_icon.png')} style={styles.iconL}></Image>
                                </View>

                                <View style={styles.searching}>
                                    <View style={{flex: 1}}/>
                                    <Input placeholder="bookName or ISBN" style={styles.searchBox}
                                        defaultValue={searchText}
                                        onEndEditing={this.handleSearch}/>
                                    <View style={{flex: 1}}/>
                                    <Button block danger style={{height: 30}} onPress={() => navigate('PostForm')}>
                                        <Text>Search</Text>
                                    </Button>
                                    <View style={{flex: 3}}/>
                                </View>
                            </Image>

                        </View>
                    </View>
            </NavigationContainer>
        );
    }

    handleFabClose() {
        this.setState({fabActive: !this.state.fabActive});
    }

    handleCreatePost(mood) {
        this.handleFabClose();
        this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostForm');
    }
    handleSearch(e) {
        this.props.dispatch(setSearchText(e.nativeEvent.text));
    }
}

const styles = {
    body:{
        flex: 1,
        backgroundColor: '#4286f4'
    },
    iconContainer:{
        flex: 2,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconL:{
        // flex: 1,
        width: 120,
        height: 120
    },
    searching:{
        flex: 3,
        opacity: 1,
        alignItems: 'center'
    },
    searchBox:{
        flex: 2,
        backgroundColor: 'white',
        width: 250
    },
    footer:{
        flex: 1,
        backgroundColor: 'yellow'
    },
    imageContainer: {
        flex: 3,
    },
    bgImage: {
        width: undefined,
        height: undefined,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#666',
        // marginBottom: 16,
        flex: 1,
        opacity: 0.9
        // resizeMode: 'cover' // or 'stretch'
    },
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    }
};

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(TodayScreen);
