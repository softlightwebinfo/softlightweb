import React, {Component} from 'react'
import Head from 'next/head'
import {withTranslation} from '@server/i18n';
import {config} from "@src/config";
// @ts-ignore
@withTranslation("common")
export default class Home extends Component {
    static getInitialProps(props) {
        const {store, isServer} = props;
        // console.log("adios", props.store.getState());
        return {
            isServer,
            namespacesRequired: ['common'],
        }
    };

    render() {
        console.log(config)
        return (
            <div>
                <Head>
                    <title>Home</title>
                </Head>
                <p>hola</p>
            </div>
        );
    }
}

