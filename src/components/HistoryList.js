import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import HistoryItem from './HistoryItem';

import {connect} from 'react-redux';
import {listHistory, listMoreHistory} from '../states/history-actions';

class HistoryList extends React.Component {
    static propTypes = {
        //searchText: PropTypes.string.isRequired,
        listingLength: PropTypes.number.isRequired,
        hasMore: PropTypes.bool.isRequired,
        historyList: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listHistory());
    }

    componentWillReceiveProps(nextProps) {
        const {listingLength, dispatch, historyList} = this.props;
        if (listingLength!==nextProps.listingLength || historyList !== nextProps.historyList) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.historyList.slice(0,nextProps.listingLength))
            });
        }
    }

    render() {
        const {historyList, hasMore} = this.props;
        return (
            <ListView
                distanceToLoadMore={300}
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    return <HistoryItem {...p} />;
                }}
                canLoadMore={() => {
                    return historyList.length && hasMorePosts;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
            />
        );
    }

    handleLoadMore() {
        this.props.dispatch(listMoreHistory());
    }
}

export default connect((state, ownProps) => ({
    listingLength: state.history.listingLength,
    historyList: state.history.historyList,
    hasMore: state.history.hasMore
}))(HistoryList);
