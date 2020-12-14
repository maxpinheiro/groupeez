const initialState = {
    searchType: '',
    searchQuery: '',
    songResults: [],
    albumResults: [],
    listenerResults: [],
    artistResults: [],
    reviewResults: [],
    postResults: []
}

const searchReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return {
                ...state,
                searchType: action.searchType,
                searchQuery: action.searchQuery
            }
        case "SET_SONGS":
            return {
                ...state,
                songResults: action.songs,
            }
        case "SET_ALBUMS":
            return {
                ...state,
                albumResults: action.albums,
            }
        case "SET_LISTENERS":
            return {
                ...state,
                listenerResults: action.listeners,
            }
        case "SET_ARTISTS":
            return {
                ...state,
                artistResults: action.artists,
            }
        case "SET_REVIEWS":
            return {
                ...state,
                reviewResults: action.reviews,
            }
        case "SET_POSTS":
            return {
                ...state,
                postResults: action.posts,
            }
        default:
            return {
                ...state
            }
    }
}

export default searchReducer;