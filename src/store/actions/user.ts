import {actionTypes} from "../actionTypes/user";

export function loadData() {
    return {type: actionTypes.USER_LOAD_DATA}
}

export function loadDataSuccess(data) {
    return {
        type: actionTypes.USER_LOAD_DATA_SUCCESS,
        data
    }
}

export function loadDataError(error) {
    return {
        type: actionTypes.USER_LOAD_DATA_SUCCESS,
        error
    }
}

export function setLogin(token, user) {
    return {
        type: actionTypes.USER_SET_LOGIN,
        data: {
            token,
            user
        }
    }
}

export function setLogout() {
    return {
        type: actionTypes.USER_SET_LOGOUT,
        data: {
            token: null,
            user: null
        }
    }
}

export function userLogin(data) {
    return (dispatch, getState) => {
        dispatch(setLogin(data.token, data.user));
    }
}

export function userLoginError(data) {
    return {
        type: actionTypes.USER_ERROR_LOGIN,
        data: data
    }
}

export function startUserVerify(token: string, ctx = null) {
    return {
        type: actionTypes.USER_LOAD_VERIFY,
        token,
        ctx,
    }
}

export function userLogout() {
    return {
        type: actionTypes.USER_LOAD_LOGOUT,
    }
}
export function userRegisterLoadData(user) {
    return {
        type: actionTypes.USER_UPDATE_LOAD_DATA,
        data: user,
    }
}

export function userSetUpdateError(err) {
    return {
        type: actionTypes.USER_UPDATE_LOAD_DATA_ERROR,
        data: err
    }
}

export function userSetUpdateSuccess(user) {
    return {
        type: actionTypes.USER_UPDATE_LOAD_DATA_SUCCESS,
        data: user
    }
}
