import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { joinGoal } from "../../redux/goals/join";
import { leaveGoal } from "../../redux/goals/leave";
import { finishGoal } from "../../redux/goals/finish";
import { Link } from "react-router-dom";

class ShowGoalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: {},
      loading: true
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/goals/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      this.setState({
        goal: response.data.goal,
        loading: false
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  async handleJoinGoal(group_id, goal_id) {
    const user_goal = await joinGoal(group_id, goal_id);
    this.props.history.push("/users/" +
      localStorage.getItem('user_id') + "/goals/" + goal_id + "/goal_progress");
    // console.log(user_goal);
    // window.location.reload(false);
  }

  async handleLeaveGoal(group_id, goal_id, user_goal_id) {
    await leaveGoal(group_id, goal_id, user_goal_id);
    window.location.reload(false);
  }

  async handleFinishGoal(goal_id) {
    const goal = await finishGoal(goal_id);
    console.log(goal);
    this.setState({
      goal: goal.data.goal,
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="9">
            { console.log(this.state.goal) }
            { this.state.loading === false ? (
                this.state.goal.achievements.length > 0 ? (
                    <h1 style={{ color: 'gray' }} className="goal_information">{this.state.goal.name} (This goal is finished)</h1>
                  ) : (
                    <h1 className="goal_information">{this.state.goal.name}</h1>
                  )
              ) : (
                ""
            )}
            { (this.state.goal.user_goal_id === null ) ? (
                <div onClick={() => this.handleJoinGoal(
                  this.state.goal.group_id,
                  this.state.goal.id
                  )}>
                  <Button variant="primary" size="sm">Join</Button>
                </div>
              ) : (
                <Row>
                  <Col xs="9">
                    <div onClick={() => this.handleLeaveGoal(
                      this.state.goal.group_id,
                      this.state.goal.id,
                      this.state.goal.user_goal_id
                    )}>
                      <Button variant="danger" size="sm">Leave</Button>
                    </div>
                  </Col>
                  <Col xs="3">
                    <Link to={"/users/" + localStorage.getItem('user_id') + "/goals/" + this.state.goal.id + "/goal_progress"}>>>> to goal progress</Link>
                  </Col>
                </Row>
              )
            }
            <Row>
              <Col xs="3"></Col>
              <Col xs="3">Goal name:</Col>
              <Col xs="3">{this.state.goal.name}</Col>
              <Col xs="3"></Col>

              <Col xs="3"></Col>
              <Col xs="3">Description:</Col>
              {(this.state.goal.description == null) ? (
                <Col xs="3">None</Col>
              ) : (
                <Col xs="3">{this.state.goal.description}</Col>
              )}
              <Col xs="3"></Col>

              <Col xs="3"></Col>
              <Col xs="3">Start day:</Col>
              {(this.state.goal.start_day == null) ? (
                <Col xs="3">None</Col>
              ) : (
                <Col xs="3">{this.state.goal.start_day}</Col>
              )}
              <Col xs="3"></Col>

              <Col xs="3"></Col>
              <Col xs="3">End day:</Col>
              {(this.state.goal.end_day == null) ? (
                <Col xs="3">None</Col>
              ) : (
                <Col xs="3">{this.state.goal.end_day}</Col>
              )}
              <Col xs="3"></Col>

              <Col xs="3"></Col>
              <Col xs="3">Goals:</Col>
              { !this.state.loading ? (
                <Col xs="3">{this.state.goal.tasks.length}</Col>
                ) : (
                ""
              )}
              <Col xs="3"></Col>

              { !this.state.loading ? (
                this.state.goal.tasks.length > 0 ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start day</th>
                        <th>End day</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.goal.tasks.map( goal => {
                      return (
                        <tr key={goal.id}>
                          <td>{goal.id}</td>
                          <td>{goal.name}</td>
                          <td>{goal.description}</td>
                          <td>{goal.start_day}</td>
                          <td>{goal.end_day}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                ) : (
                  ""
                )
                ) : (
                ""
              )}
              { this.state.goal.is_admin ? (
                  this.state.goal.achievements.length === 0 ? (
                    new Date(this.state.goal.end_day) > new Date() ? (
                      ""
                    ) : (
                      <Col md={{ offset: 10 }}>
                        <Button variant="primary" size="sm" onClick={goal_id => this.handleFinishGoal(this.state.goal.id)}>Finish goal</Button>
                      </Col>
                    )
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              }
                
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ShowGoalContainer;
