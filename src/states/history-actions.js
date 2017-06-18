export function addHistory(historyList) {
    return {
        type: '@HISTORY/ADD_HISTORY',
        historyList: historyList
    };
}

export function deleteHistory() {
    return {
        type: '@HISTORY/DELETE_HISTORY'
    };
}

export function listHistory() {
    return {
        type: '@HISTORY/LIST_HISTORY'
    };
}

export function listMoreHistory() {
    return {
        type: '@HISTORY/LIST_MORE_HISTORY'
    };
}
