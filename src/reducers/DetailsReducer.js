const initialState = {
    detailType: '',
    detailId: '',
    spotify: false,
    song: {
        name: "",
        artists: [],
        artistIds: [],
        album: {images: [{}]},
        title: '',
        images: [],
        id: '',
        _id: ''
    },
    album: {
        name: "",
        id: '',
        artists: [{name: ""}],
        images: [{}]
    },
    review: {
        _id: "",
        creator: "",
        creatorId: "",
        songId: "",
        title: "",
        text: ""
    },
    post: {
        _id: "",
        type: "",
        artist: "",
        artistId: "",
        title: "",
        text: ""
    }
};

const detailsReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_DETAILS":
            return {
                ...state,
                detailType: action.detailType,
                detailId: action.detailId,
                spotify: action.detailId.length === 22
            }
        case "SET_SONG":
            return {
                ...state,
                song: action.song
            }
        case "SET_ALBUM":
            return {
                ...state,
                album: action.album
            }
        case "SET_REVIEW":
            return {
                ...state,
                review: action.review
            }
        case "SET_POST":
            return {
                ...state,
                post: action.post
            }
        default:
            return state
    }
};

export default detailsReducer;