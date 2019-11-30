import React from 'react';
import {Provider} from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './../src/store/reduxStore';
import {setLogin} from "../src/store/actions/user";

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return {pageProps};
    }
    
    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Provider store={store}>
                <PersistGate persistor={store.__PERSISTOR} loading={null}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        );
    }
}

export default withRedux(reduxStore)(MyApp);
