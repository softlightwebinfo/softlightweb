import React, {Component} from 'react'
import Head from 'next/head'
import {connect} from "react-redux";

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isLoggedIn === true){
            Router.pushRoute('/');
        }
    }
    
    
    handleLoginSubmit = (value) => {
        const {dispatch} = this.props;
        dispatch(login(value));
    };
    
    
    render() {
        return (
            <div>
                {/*<Login onChange={this.handleLoginSubmit}/>*/}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user.user,
        isLoggedIn: state.user.isLoggedIn
    };
}


export default connect(mapStateToProps)(LoginPage);
