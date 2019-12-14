import React, { Component } from 'react';
import GoalForm from './GoalForm';
import { Container } from 'react-bootstrap';

class CreateGoalContainer extends Component {
  render() {
    return (
      <Container>
        <div className="NewGoal col-md-8 col-md-offset-2">
          <h2>New Goal</h2>
          <GoalForm history={this.props.history} match={this.props.match} />
        </div>
      </Container>
    );
  }
}

export default CreateGoalContainer;
