import merge from 'lodash.merge';
import { useSafeReducer } from './useSafeReducer';
import {
    types,
    initialState,
    reducer,
} from './requestReducer';

export const useFetch = ({ url, options: defaultOptions = {} }) => {
    const [{ error, pending, data }, dispatch] = useSafeReducer(reducer, initialState);

    const makeRequest = async ({ options = {} }) => {
        dispatch({ type: types.REQUEST });
        try {
            const response = await fetch(url, merge(defaultOptions, options));
            if (!response.ok) {
                throw response;
            }

            dispatch({ type: types.SUCCESS, payload: await response.json() });
        } catch (err) {
            dispatch({ type: types.FAILURE, payload: err.json ? await err.json() : err.message });
        }
    };

    const cleanRequest = () => {
        dispatch({ type: types.CLEAN });
    };

    return [{ error, pending, data }, makeRequest, cleanRequest];
};

export default useFetch;
