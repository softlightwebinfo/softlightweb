import React, {Component} from 'react'
import {connect} from "react-redux";
import {withTranslation, Router} from '@server/i18n';
import {login} from '@store/actions/user';

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isLoggedIn: state.user.isLoggedIn
    };
}

@connect(mapStateToProps)
// @ts-ignore
@withTranslation("common")
export default class LoginPage extends Component<{
    isLoggedIn: boolean;
}> {
    static getInitialProps(props) {
        const {store, isServer} = props;
        // console.log("adios", props.store.getState());
        return {
            isServer,
            namespacesRequired: ['common'],
        }
    };

    constructor(props) {
        super(props);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLoggedIn === true) {
            Router.push('/');
        }
    }


    handleLoginSubmit = (value) => {
        const {dispatch}: any = this.props;
        dispatch(login(value));
    };


    render() {
        return (
            <div>
                Login
                {/*<Login onChange={this.handleLoginSubmit}/>*/}
            </div>
        )
    }
}
