import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'rc-progress/assets/index.css';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
import Rating from 'react-rating';
import { leaveGoal } from "../../redux/goals/leave";
import Countdown from 'react-countdown-now';
import { CardBody } from "shards-react";

class ShowGoalByUserContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      is_loading: true,
    }

    this.handleRate = this.handleRate.bind(this);
    this.finishGoal = this.finishGoal.bind(this);
  }

  componentDidMount() {
    axios.get("/api/users/" + this.props.match.params.user_id +
      "/goals/" + this.props.match.params.goal_id + "/goal_progress")
    .then(response => {
      this.setState({
        data: response.data.data,
        is_loading: false,
      })
      console.log(this.state.data)
    })
    .catch(error => {
      console.log(error.response)
      if (error.response.status === 404) {
        this.props.history.push("/404")
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // axios.get("/api/users/" + this.props.match.params.user_id +
    //   "/goals/" + this.props.match.params.goal_id + "/goal_progress")
    // .then(response => {
    //   this.setState({
    //     data: response.data.data,
    //     is_loading: false
    //   })
    //   console.log(this.state.data)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
    window.location.reload(false);
  }

  handleRate(event, user_task_id) {
    axios.patch("/api/user_tasks/" + user_task_id,
      { user_task: {progress: (event/5)}})
    .then(response => {
      this.setState({
        data: response.data.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  async handleLeaveGoal(group_id, goal_id, user_goal_id) {
    if (window.confirm("Are you sure?")) {
      await leaveGoal(group_id, goal_id, user_goal_id);
      this.props.history.push("/goals/" + goal_id);
    }
  }

  finishGoal() {
    console.log('call finish di');
  }

  render() {
    const circleContainerStyle = {
      paddingTop: '40px',
      width: '250px',
      height: '250px',
      display: 'inline-block',
    };
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );
    const IndentLine = () => (
      <br />
    );
    const counter = 1;
    return(
      <Container>
        <Row>
          { this.state.is_loading === false ? (
            <React.Fragment>
              <Col xs="9">
                <Row>
                  <Col xs="12">
                    <h3><Link to={`/users/${this.state.data.user.id}`}>{ this.state.data.user.name }</Link>: {this.state.data.goal.name}'s progress</h3>
                  </Col>
                  <Col xs="7">
                    <Row>
                      <Col xs="4" style={{paddingTop: 30}}>
                        <b>Name:</b>
                      </Col>
                      <Col xs="8" style={{paddingTop: 30}}>
                        {this.state.data.goal.name}
                      </Col>
                      <Col xs="4" style={{paddingTop: 40}}>
                        <b>Description:</b>
                      </Col>
                      <Col xs="8" style={{paddingTop: 40}}>
                        {this.state.data.goal.description === null ? ("None") : (this.state.data.goal.description)}
                      </Col>
                      <Col xs="4" style={{paddingTop: 40}}>
                        <b>Start day:</b>
                      </Col>
                      <Col xs="8" style={{paddingTop: 40}}>
                        {this.state.data.goal.start_day}
                      </Col>
                      <Col xs="4" style={{paddingTop: 40}}>
                        <b>End day:</b>
                      </Col>
                      <Col xs="8" style={{paddingTop: 40}}>
                        {this.state.data.goal.end_day}
                      </Col>
                      <Col xs="4" style={{paddingTop: 40, paddingBottom: 40}}>
                        <b>Time left:</b>
                      </Col>
                      <Col xs="8" style={{paddingTop: 40, paddingBottom: 40}}>
                        <Countdown date={this.state.data.goal.end_day} onComplete={() => this.finishGoal()}/>,
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="5">
                    <div style={circleContainerStyle}>
                      <Circle percent={this.state.data.goal_progress*100} strokeWidth="6"
                        strokeLinecap="round"
                        strokeColor="#FE8C6A" />
                    </div>
                    <br />
                    <div style={{paddingLeft: 40, paddingTop: 40}}>Current progress: {this.state.data.goal_progress*100} %</div>
                  </Col>
                </Row>
                <ColoredLine color="gray" />
                {this.state.data.tasks.map(task => {
                  return(
                    <Card>
                      <CardBody>
                        <div className="task_progress" key={task.user_task_id}>
                          <Row>
                            <Col xs="7">
                            <h3>Task {counter}:</h3>
                              <Row>
                                <Col xs="4">
                                  <b>Name:</b>
                                </Col>
                                <Col xs="8">
                                  {task.task.name}
                                </Col>
                                <Col xs="4">
                                  <b>Description</b>
                                </Col>
                                <Col xs="8">
                                  {task.task.description}
                                </Col>
                              </Row>
                            </Col>
                            <Col xs="5">
                              <Row>
                                <Col xs="12">
                                  { this.state.data.honnin === true ? 
                                    (
                                      <Rating initialRating={task.progress*5} readonly />
                                    ) : (
                                      <Rating initialRating={task.progress*5} onClick={(event, user_task_id) => this.handleRate(event, task.user_task_id)} />
                                    )
                                  }
                                </Col>
                                <Col xs="6">
                                  <b>Start day</b>:
                                  <IndentLine />{task.task.start_day}
                                </Col>
                                <Col xs="6">
                                  <b>End day</b>:
                                  <IndentLine />{task.task.end_day}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </CardBody>
                    </Card>
                  )
                })}
                <br />
                <div style={{display: "flex"}}>
                  <div>
                    <Link to={"/goals/" + this.state.data.goal.id}>
                      <Button variant="primary" size="sm">Back</Button>
                    </Link>
                  </div>
                  <div style={{marginLeft: "auto"}}>
                    <div onClick={() => this.handleLeaveGoal(
                      this.state.data.goal.group_id,
                      this.state.data.goal.id,
                      this.state.data.user_goal_id
                    )}>
                      <Button variant="danger" size="sm">Leave</Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs="3">
                <h3 style={{paddingLeft: 40}}>List member</h3>
                <Row>
                  {this.state.data.joined_users.map(user => {
                    return (
                      <Col xs="4" style={{paddingTop: 15}} key={user.id}>
                        <Link to={`/users/${user.id}/goals/${this.state.data.goal.id}/goal_progress`}>
                          <Card style={{ width: '4rem' }}>
                            { 
                              user.cover == null ? (
                                <Card.Img variant="top" src={ require("../../default-avatar.png")} />
                              ) : (
                                ""
                              )
                            }
                          </Card>
                        </Link>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </React.Fragment>
          ) : (
            ""
          )}
        </Row>
      </Container>
    );
  }
}

export default ShowGoalByUserContainer;
