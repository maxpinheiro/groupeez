const initialState = {
    profileType: '',
    profileId: '',
    personalPage: false,
    listener: {_id: '', username: '', name: '', bio: '', profileUrl: '', reviews: [], favorites: [], following: [], friends: []},
    artist: {_id: '', username: '', name: '', spotifyId: '', bio: '', profileUrl: '', reviews: [], library: [], posts: [], groupeez: []}
}

const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_PROFILE":
            return {
                ...state,
                profileType: action.profileType,
                profileId: action.profileId,
                personalPage: action.personalPage
            }
        case "SET_LISTENER":
            return {
                ...state,
                listener: action.listener
            }
        case "SET_ARTIST":
            return {
                ...state,
                artist: action.artist
            }
        default:
            return state;
    }
}

export default profileReducer;