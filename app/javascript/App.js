import React, { Component } from 'react';
import './App.css';
import HomePagesContainer from './components/HomePagesContainer';
import { Route, withRouter, Switch } from "react-router-dom";
import Header from './components/layout_components/Header';
import Footer from './components/layout_components/Footer';
import SignupContainer from './components/auth/SignupContainer';
import SigninContainer from './components/auth/SigninContainer';
import ProfileContainer from './components/auth/ProfileContainer';
import CreateGroupContainer from './components/groups/CreateGroupContainer';
import GroupContainer from './components/groups/GroupContainer';
import GroupMemberContainer from './components/groups/GroupMemberContainer';
import CreateGoalContainer from './components/goals/CreateGoalContainer';
import ShowGoalContainer from './components/goals/ShowGoalContainer';
import ShowGoalByUserContainer from './components/goals/ShowGoalByUserContainer';
import FourZeroFour from './components/errors/FourZeroFour';

import axiosConfig from './axios_config';
import { connect } from "react-redux";

import "./styles/shards-dashboards.1.1.0.min.css";

class App extends Component {
  constructor(props){
    super(props);
    axiosConfig();
  }

  render() {
    const isLogin = this.props.auth && this.props.auth.currentUser && this.props.auth.currentUser.token
    return (
      <div>
        <Header {...this.props} isLogin={isLogin}/>
        <Switch>
          <Route exact path="/" component={HomePagesContainer} />
          <Route exact path="/signup" component={SignupContainer} />
          <Route exact path="/signin" component={SigninContainer} />
          <Route exact path="/users/:id/" component={ProfileContainer} />
          <Route exact path="/create_group" component={CreateGroupContainer} />
          <Route exact path="/groups/:id/" component={GroupContainer} />
          <Route exact path="/groups/:group_id/goals/" component={CreateGoalContainer} />
          <Route exact path="/goals/:id" component={ShowGoalContainer} />
          <Route exact path="/groups/:group_id/members" component={GroupMemberContainer} />
          <Route exact path="/users/:user_id/goals/:goal_id/goal_progress" component={ShowGoalByUserContainer} />
          <Route exact path="/404" component={FourZeroFour} />
        </Switch>
        <hr />
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
