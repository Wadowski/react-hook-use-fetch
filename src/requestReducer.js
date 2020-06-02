const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CLEAN = 'CLEAN';

const types = {
    REQUEST,
    SUCCESS,
    FAILURE,
    CLEAN,
};

const initialState = {
    pending: false,
    error: false,
    data: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.REQUEST:
            return {
                error: false,
                pending: true,
                data: null,
            };
        case types.SUCCESS:
            return {
                error: false,
                pending: false,
                data: action.payload,
            };
        case types.FAILURE:
            return {
                error: true,
                pending: false,
                data: action.payload,
            };
        case types.CLEAN:
        default:
            return state;
    }
};

export {
    reducer,
    initialState,
    types,
};
