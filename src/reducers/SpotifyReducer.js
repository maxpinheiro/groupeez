import { Reducer } from 'redux';

/*
type songModel = {
    name: string,
    artists: {name: string}[],
    album: {
        images: {url: string}[]
    }
}; */
const initialState = {
    authCode: '',
    accessToken: '',
    refreshToken: '',
    searchQuery: '',
    songs: [],
    albums: [],
    artists: [],
    listeners: [],
    posts: [],
    reviews: [],
    resultSong: {name: '', artists: [], album: {images: [{url: ''}]}}
};

const spotifyReducer = (state=initialState, action) => {
    switch (action.type) {
        case "AUTHORIZATION_CODE":
            return {
                ...state,
                authCode: action.authCode
            }
        case "TOKENS":
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case "SEARCH_SONGS":
            return {
                ...state,
                songs: action.songs,
                searchQuery: action.query
            }
        case "RESULT_SONG":
            return {
                ...state,
                resultSong: action.song
            }
        case "SEARCH_ALBUMS":
            return {
                ...state,
                albums: action.albums,
                searchQuery: action.query
            }
        case "SEARCH_ARTISTS":
            return {
                ...state,
                artists: action.artists,
                searchQuery: action.query
            }
        case "SEARCH_LISTENERS":
            return {
                ...state,
                listeners: action.listeners,
                searchQuery: action.query
            }
        case "SEARCH_POSTS":
            return {
                ...state,
                posts: action.posts,
                searchQuery: action.query
            }
        case "SEARCH_REVIEWS":
            return {
                ...state,
                reviews: action.reviews,
                searchQuery: action.query
            }
        default:
            return state
    }
};

export default spotifyReducer;