import { useSafeReducer } from './useSafeReducer';

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

export const useFetch = ({ url, options = {} }) => {
    const [{ error, pending, data }, dispatch] = useSafeReducer(reducer, initialState);

    const makeRequest = async () => {
        dispatch({ type: REQUEST });
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw response;
            }

            dispatch({ type: SUCCESS, payload: await response.json() });
        } catch (err) {
            dispatch({ type: FAILURE, payload: err.json ? await err.json() : err.message });
        }
    };

    return [{ error, pending, data }, makeRequest];
};

export default useFetch;
