import React from 'react';
import {Provider} from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './../src/store/reduxStore';
import {appWithTranslation} from '@server/i18n';
import {authenticateAction} from "@store/actions/user";

// @ts-ignore
@withRedux(reduxStore)
@appWithTranslation
export default class MyApp extends App<{ store: any }> {
    static async getInitialProps({Component, ctx}) {
        // ctx.store.dispatch(authenticateAction({name: "pepe"}));
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return {
            pageProps,
            namespacesRequired: ['common'],
        };
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}
