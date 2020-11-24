import { Reducer } from 'redux';

type songModel = {
    name: string,
    artists: {name: string}[],
    album: {
        images: {url: string}[]
    }
};
const initialState: {authCode: string, accessToken: string, refreshToken: string, searchQuery: string, songs: songModel[], albums: Object[], artists: Object[], resultSong: songModel} = {
    authCode: '',
    accessToken: '',
    refreshToken: '',
    searchQuery: '',
    songs: [],
    albums: [],
    artists: [],
    resultSong: {name: '', artists: [], album: {images: [{url: ''}]}}
};

const spotifyReducer: Reducer = (state=initialState, action) => {
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
        default:
            return state
    }
};

export default spotifyReducer;