import React, { Component } from 'react';
import './App.css';
import HomePagesContainer from './components/HomePagesContainer';
import { Route, withRouter, Switch } from "react-router-dom";
import Header from './components/layout_components/Header';
import Footer from './components/layout_components/Footer';
import SignupContainer from './components/auth/SignupContainer';
import SigninContainer from './components/auth/SigninContainer';
import ProfileContainer from './components/auth/ProfileContainer';
import CreateGroupContainer from './components/groups/CreateGroupContainer'
import GroupContainer from './components/groups/GroupContainer'

import axiosConfig from './axios_config';
import { connect } from "react-redux"

class App extends Component {

  render() {
    const isLogin = this.props.auth && this.props.auth.currentUser && this.props.auth.currentUser.token
    return (
      <div>
        <Header {...this.props} isLogin={isLogin}/>
        <hr />
        <Switch>
          <Route exact path="/" component={HomePagesContainer} />
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/signin" component={SigninContainer} />
          <Route exact path="/users/:id/" component={ProfileContainer} />
          <Route exact path="/create_group" component={CreateGroupContainer} />
          <Route exact path="/groups/:id/" component={GroupContainer} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps)(withRouter(App))
