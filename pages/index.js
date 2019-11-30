import React, {Component} from 'react'
import Head from 'next/head'

class Home extends Component {
    static async getInitialProps(props) {
        const {store, isServer} = props;
        console.log("adios", props.store.getState());
        return {
            isServer,
            namespacesRequired: ['common', 'menu'],
        }
    };
    
    render() {
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

export default Home
