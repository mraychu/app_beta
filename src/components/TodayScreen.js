import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Icon, Fab, Button, Toast, Footer, FooterTab, Picker} from 'native-base';
import { Container, Content, Thumbnail, Text, Form, Item, Input} from 'native-base';


import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import NavigationContainer from './NavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

import {addHistory} from '../states/history-actions';
import {setSearchText} from '../states/search.js';


const PickerItem = Picker.Item;

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
            fabActive: false,
            selected1: 'key0',
            selectedItem: undefined,
            results: {
                items: []
            }
        };

        this.handleHistory = this.handleHistory.bind(this);
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
        const {navigate} = this.props.navigation;
        const {searchText} = this.props.searchText;
        return (
            <NavigationContainer navigate={navigate} title='找書，隨心所欲'>
                <View style={styles.body}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../images/main-bg_2.jpg')} style={styles.bgImage}>
                            <View style={{flex: 0.5}}></View>
                            <View style={styles.iconContainer}>
                                <Image source={require('../images/l_icon.png')} style={styles.iconL}></Image>
                            </View>
                            <View style={{flex: 1}}></View>
                            <View style={{flex:1, flexDirection: 'row'}}>
                                <View style={{flex:0.05}}></View>
                                <Input placeholder="    BookName or ISBN    |" style={styles.searchBox}
                                        defaultValue={searchText}
                                        onEndEditing={this.handleSearch}/>
                                <Picker
                                    style={styles.picker}
                                    supportedOrientations={['portrait','landscape']}
                                    mode="dropdown"
                                    selectedValue={this.state.selected1}
                                    onValueChange={this.onValueChange.bind(this)}>
                                    <PickerItem label="Name" value="key0" />
                                    <PickerItem label="ISBN" value="key1" />
                                </Picker>
                                <View style={{flex:0.05}}></View>
                            </View>
                            <View style={{flex: 3}}></View>
                        </Image>
                    </View>
                    <View style={{position: 'absolute', marginTop:300}}>
                        <Button block danger rounded style={{height: 30, width:250, marginLeft: 55, backgroundColor: '#F9A825'}}
                            onPress={() => {navigate('PostForm'); this.handleHistory()}}>
                            <Text>Search</Text>
                        </Button>
                    </View>
                    <Footer style={{position: 'absolute', marginTop:460}}>
                        <FooterTab style={{backgroundColor:'#A6000C'}}>
                            <Button vertical>
                                <Icon style={{color:'white'}} name="book" />
                                <Text style={{color:'white'}}>Seach History</Text>
                            </Button>
                            <Button vertical>
                                <Icon style={{color:'white'}} name="heart" />
                                <Text style={{color:'white'}}>Favorite</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>

            </NavigationContainer>

        );
    }

    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
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
    handleHistory(e){
        let historyLists = this.props.history;
            if (historyLists === undefined) {
                historyLists = [];
            } else if (historyLists.length>=15) {
                // Max # of history
                historyLists.pop();
            }
        let adder = {
            searchText: this.props.searchText,
            type: 'name'
        };
        console.log(adder);
        console.log('hi');
        historyLists = historyLists.concat(adder);
        console.log(historyLists);
        console.log('yoo');
        this.props.dispatch(addHistory(historyLists));
    }
}

const styles = {
    body:{
        flex: 1,
        backgroundColor: 'white'
    },
    iconContainer:{
        flex: 2,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconL:{
        // flex: 1,
        width: 110,
        height: 110,
        shadowOpacity: 1,
    },
    searching:{
        flex: 0.8,
        opacity: 1,
        alignItems: 'center'
    },
    searchBox:{
        flex: 0.6,
        backgroundColor: 'white',
        width: 100,
        // borderBottomLeftRadius: 60,
        // borderTopLeftRadius: 60
    },
    picker:{
        flex: 0.4,
        // width: 10,
        // borderColor: 'gray',
        backgroundColor:'white',

        // borderBottomRightRadius: 60,
        // borderTopRightRadius: 60
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
    historyLists: state.history.historyLists,
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(TodayScreen);
