const numRecord=7;
const initHistoryState = {
    listingLength: 0,
    hasMore: false,
    historyList: []
};

export function history(state = initHistoryState, action) {
    let len;
    switch (action.type) {
        case '@HISTORY/ADD_HISTORY':
            return {
                ...state,
                historyList: action.historyList
            };

        case '@HISTORY/DELETE_HISTORY':
            return initHistoryState;

        case '@HISTORY/LIST_HISTORY':
            len=state.historyList.length;
            return {
                ...state,
                listingLength: Math.min(numRecord,len),
                hasMore: len>numRecord,
            }

        case '@HISTORY/LIST_MORE_HISTORY':
            len=state.historyList.length, listing=state.listingLength;
            return {
                ...state,
                listingLength: Math.min(listing+numRecord, len),
                hasMore: len>listing+numRecord
            }

        default:
            return state;
    }
}
