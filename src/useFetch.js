import { useSafeReducer } from './useSafeReducer';
import { REQUEST, SUCCESS, FAILURE, initialState, reducer } from "./requestReducer";

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
