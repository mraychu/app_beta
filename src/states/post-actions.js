import {
    getBookNTHU,
    getBookNCTU
} from '../api/posts.js';

/*  Posts */

function startListPosts(searchText) {
    return {
        type: '@POST/START_LIST_POSTS',
        searchText: searchText
    };
}

function searchNTHU() {
    return {
        type: '@POST/SEARCH_NTHU'
    }
}

function searchNCTU() {
    return {
        type: '@POST/SEARCH_NCTU'
    }
}

function endListPosts(posts,id) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts: posts,
        id: id
    };
}

export function listMorePosts() {
    return {
        type: '@POST/LIST_MORE_POSTS',
    };
}

export function listPosts(searchText) {
    return (dispatch, getState) => {
        dispatch(startListPosts(searchText));
        getBookNTHU(searchText).then(posts => {
            dispatch(endListPosts(posts,searchText));
        }).catch(err => {
            dispatch(endListPosts([],''));
            console.error('Error listing posts at NTHU...', err);
        });
        getBookNCTU(searchText).then(posts => {
            dispatch(endListPosts(posts,searchText));
        }).catch(err => {
            dispatch(endListPosts([],''));
            console.error('Error listing posts at NCTU...', err);
        });
    };
};

/*  Post Form */

export function input(value) {
    return {
        type: '@POST_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@POST_FORM/INPUT_DANGER',
        danger
    };
};

export function selectMood(mood) {
    return {
        type: '@POST_FORM/SELECT_MOOD',
        mood
    };
};

/*  Post item */

export function toggleTooltip(id) {
    return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id
    };
};

export function setTooltipToggle(id, toggle) {
    return {
        type: '@POST_ITEM/SET_TOOLTIP_TOGGLE',
        id,
        toggle
    };
};
