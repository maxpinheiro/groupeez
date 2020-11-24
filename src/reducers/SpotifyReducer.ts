import { Reducer } from 'redux';

const initialState: {authCode: string} = {
    authCode: ''
};

const spotifyReducer: Reducer = (state=initialState, action) => {
    switch (action.type) {
        case "AUTHORIZATION_CODE":
            return {
                authCode: action.authCode
            }
    }
    return state;
};

export default spotifyReducer;