import {actionTypes} from "../actionTypes/user";
import {Cookies} from "../../libs/Cookies";

let initialState: any = {
    user: {},
    token: null,
    error: false,
    isLoggedIn: false,
};

if (typeof localStorage !== "undefined") {
    const authCookie = Cookies.getCookie('auth');
    if (authCookie) {
        initialState = JSON.parse(decodeURIComponent(authCookie));
    } else {
        initialState = {
            isLoggedIn: false,
            user: {},
            error: false,
            token: null,
        }
    }
} else {
    initialState = {
        isLoggedIn: false,
        user: {},
        error: false,
        token: null,
    };
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.DEAUTHENTICATE:
            Cookies.removeCookie("auth");
            return {
                isLoggedIn: false
            };
        case actionTypes.AUTHENTICATE:
            const authObj = {
                isLoggedIn: true,
                user: action.payload
            };
            Cookies.setCookie("auth", authObj);
            return authObj;
        case actionTypes.RESTORE_AUTH_STATE:
            return {
                isLoggedIn: true,
                user: action.payload.user
            };
        default:
            return state
    }
}

export default reducer
