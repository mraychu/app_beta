import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import PostItem from './PostItem';

import {connect} from 'react-redux';
import {listPosts, listMorePosts} from '../states/post-actions';

class PostList extends React.Component {
    static propTypes = {
        //searchText: PropTypes.string.isRequired,
        listingPosts: PropTypes.number.isRequired,
        listingLength: PropTypes.number.isRequired,
        posts: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        if (this.props.searchText && this.props.searchText.trim())
            this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        const {listingLength, searchText, dispatch, posts} = this.props;
        if (searchText !== nextProps.searchText) {
            dispatch(listPosts(nextProps.searchText));
        }
        if (listingLength!==nextProps.listingLength || posts !== nextProps.posts) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.posts.slice(0,nextProps.listingLength))
            });
        }
    }

    render() {
        const {listingPosts, posts, hasMorePosts} = this.props;
        return (
            <ListView
                refreshControl={
                    <RefreshControl refreshing={listingPosts!==0} />
                }
                distanceToLoadMore={300}
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    return <PostItem {...p} />;
                }}
                canLoadMore={() => {
                    if (listingPosts || !posts.length)
                        return false;
                    return hasMorePosts;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
            />
        );
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listPosts(searchText));
    }

    handleLoadMore() {
        this.props.dispatch(listMorePosts());
    }
}

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    listingLength: state.post.listingLength,
    posts: state.post.posts,
    hasMorePosts: state.post.hasMore
}))(PostList);
