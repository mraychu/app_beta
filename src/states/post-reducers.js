/* Posts */

const numResult = 7;

const initPostState = {
    listingPosts: 0,
    listingLength: 0, // id of post from which to start
    posts: [],
    hasMore: true,
    creatingPost: false,
    creatingVote: false
};
export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LIST_POSTS':
            return {
                ...state,
                posts: [],
                listingId: action.searchText,
                listingPosts: 2,
                listingLength: 0
            };
        case '@POST/END_LIST_POSTS':
            if (!action.posts && !state.posts)
                return {
                    ...state,
                    listingPosts: false,
                    hasMore: false
                };
            if (action.id!==state.listingId) return state;
            return {
                ...state,
                listingPosts: state.listingPosts - 1,
                listingLength: Math.min(numResult,state.posts.length+action.posts.length),
                posts: state.posts.concat(action.posts),
                hasMore: state.posts.length+action.posts.length > numResult
            };
        case '@POST/LIST_MORE_POSTS':
            return {
                ...state,
                listingLength: Math.min(state.listingLength+numResult,state.posts.length),
                hasMore: state.listingLength+numResult < state.posts.length
            };
        default:
            return state;
    }
}

/* Post Form */

const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    mood: 'na'
};

export function postForm(state = initPostFormState, action) {
    switch (action.type) {
        case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POST_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };
        default:
            return state;
    }
}

/* Post item */

const initPostItemState = {
    tooltipOpen: {}
};

export function postItem(state = initPostItemState, action) {
    switch (action.type) {
        case '@POST_ITEM/TOGGLE_TOOLTIP':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: state.tooltipOpen[action.id] ? false : true
                }
            };
        case '@POST_ITEM/SET_TOOLTIP_TOGGLE':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: action.toggle
                }
            };
        default:
            return state;
    }
}
