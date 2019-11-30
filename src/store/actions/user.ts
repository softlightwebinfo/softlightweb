import {actionTypes} from "../actionTypes/user";


export const authenticateAction = (user) => {
    return {
        type: actionTypes.AUTHENTICATE,
        payload: user
    };
};


export const deAuthenticateAction = () => {
    return {
        type: actionTypes.DEAUTHENTICATE,
    };
};


export const restoreState = (authState) => {
    return {
        type: actionTypes.RESTORE_AUTH_STATE,
        payload: authState
    }
};


export const login = loginDetails => {
    return async dispatch => {
        try {
            dispatch(deAuthenticateAction());
            // login code. And storing data in result variable
            dispatch(authenticateAction({}));


        } catch (e) {
            dispatch(deAuthenticateAction());
        }
    };
};


export const signUp = signUpDetails => {
    return async dispatch => {
        try {
            dispatch(deAuthenticateAction());
            // Signup code. And storing data in result variable
            dispatch(authenticateAction({}));


        } catch (e) {
            dispatch(deAuthenticateAction());
        }
    };
};


export const logout = () => {
    return async dispatch => {
        dispatch(deAuthenticateAction())
    }
};


export const restore = (savedState) => {
    return dispatch => {
        dispatch(restoreState(savedState));
    };
};
