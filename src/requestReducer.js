const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const initialState = {
    pending: false,
    error: false,
    data: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                error: false,
                pending: true,
                data: null,
            };
        case SUCCESS:
            return {
                error: false,
                pending: false,
                data: action.payload,
            };
        case FAILURE:
            return {
                error: true,
                pending: false,
                data: action.payload,
            };
        default:
            return state;
    }
};

export {
    reducer,
    initialState,
    REQUEST,
    SUCCESS,
    FAILURE,
};
