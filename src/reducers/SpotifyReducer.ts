import { Reducer } from 'redux';

const initialState: {authCode: string, accessToken: string, refreshToken: string, songs: Object[], albums: Object[], artists: Object[]} = {
    authCode: '',
    accessToken: '',
    refreshToken: '',
    songs: [],
    albums: [],
    artists: []
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
                songs: action.songs
            }
        default:
            return state
    }
};

export default spotifyReducer;