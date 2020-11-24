import { Reducer } from 'redux';

const initialState: {authCode: string, accessToken: string, refreshToken: string} = {
    authCode: '',
    accessToken: '',
    refreshToken: ''
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
        default:
            return state
    }
};

export default spotifyReducer;