import { Reducer } from 'redux';

type songModel = {};

const initialState: {songs: songModel[]} = {
    songs: [

    ]
};

const songReducer: Reducer = (state=initialState, action) => {
    return state;
};

export default songReducer;