import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { joinGoal } from "../../redux/goals/join";
import { leaveGoal } from "../../redux/goals/leave";
import { finishGoal } from "../../redux/goals/finish";
import { Link } from "react-router-dom";
import {
  ListGroupItem,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import { Snackbar } from "../../snackbar";
import PageTitle from "../common/PageTitle";

class ShowGoalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: {},
      loading: true
    }
  }

  snackbarRef = React.createRef();

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("/api/goals/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      this.setState({
        goal: response.data.goal,
        loading: false
      })
    })
    .catch(error => {
      console.log(error.response)
      if (error.response.status === 404) {
        this.props.history.push("/404")
      }
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
    if (window.confirm("Are you sure?")) {
      await leaveGoal(group_id, goal_id, user_goal_id);
      window.location.reload(false);
    }
  }

  async handleFinishGoal(goal_id) {
    const goal = await finishGoal(goal_id);
    this.setState({
      goal: goal.data.goal,
    })
  }

  render() {
    const goal = this.state.goal
    return (
      <Container className="main-content-container px-4">
      <Snackbar ref = {this.snackbarRef} />
        { this.state.loading ?
          (
            ""
          ) :
          (
            <Row>
              <Col md="5">
                <Row noGutters className="page-header py-4">
                  <PageTitle title="Goal Information" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
                </Row>
                <Card className="mb-4">
                  <CardHeader className="border-bottom text-center" style={{backgroundColor: "white"}}>
                    <h4 className="mb-0">
                      { goal.name }
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <p className="card-text d-inline-block mb-3"><strong>Description:</strong> {goal.description === null ? ("None") : (goal.description)}</p>
                    <br />
                    <p className="card-text d-inline-block mb-3"><strong>Start day:</strong> {goal.start_day}</p>
                    <br />
                    <p className="card-text d-inline-block mb-3"><strong>End day:</strong> {goal.end_day}</p>
                    <br />
                    <p className="card-text d-inline-block mb-3"><strong>Task amount:</strong> {goal.tasks.length}</p>
                  </CardBody>
                  {goal.achievements.length > 0 ? 
                    (
                      <CardFooter>
                          <strong align="center">
                            <h4 className="goal_information">
                              Top
                            </h4>
                          </strong>
                          { goal.achievements.map(achi => {
                            return(
                              <Row>
                                <Col md="9">
                                  <div className="achievement" key={achi.id} style={{ display: "flex" }}>
                                    <div style={{marginLeft: 10}}>
                                      { achi.achievement_type === 1 ? (
                                          <img src={ require("../../gold.svg")} heigh="40" width="40" alt="gold"/>
                                        ) : (
                                          achi.achievement_type === 2 ? (
                                            <img src={ require("../../silver.svg")} heigh="40" width="40" alt="silver"/>
                                          ) : (
                                            <img src={ require("../../bronze.svg")} heigh="40" width="40" alt="bronze"/>
                                          )
                                        )
                                      }
                                    </div>
                                    <div style={{marginLeft: 20, paddingTop: 5}}>
                                      <Link to={`/users/${achi.user_id}`}>{achi.user_name}</Link>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="3">
                                  <div style={{marginRight: 10, paddingTop: 5}}>
                                    <strong>{achi.progress*100}%</strong>
                                  </div>
                                </Col>
                              </Row>
                            )
                          })}
                      </CardFooter>
                    ) : (
                      ""
                    )
                  }
                  <CardFooter>
                    <h5 className="mb-0">
                      List members
                    </h5>
                    <Row>
                      {goal.members.map(user => {
                        return (
                          <Col xs="3" style={{paddingTop: 15}} key={user.id}>
                            <Link to={`/users/${user.id}/goals/${goal.id}/goal_progress`}>
                              <Card style={{ width: '4rem' }}>
                                {
                                  user.avatar === null ? (
                                    <Card.Img variant="top" src={ require("../../default-avatar.png")} />
                                  ) : (
                                    <Card.Img variant="top" height="62px" src={`https://res.cloudinary.com/my-stories/${user.avatar}`} />
                                  )
                                }
                              </Card>
                            </Link>
                          </Col>
                        )
                      })}
                    </Row>
                  </CardFooter>
                  { this.state.goal.is_admin ? (
                      this.state.goal.achievements.length === 0 ? (
                        new Date(this.state.goal.end_day) > new Date() ? (
                          ""
                        ) : (
                          <CardFooter>
                            <div style={{ display: "flex" }}>
                              <Button style={{marginLeft: "auto"}} variant="primary" size="sm" onClick={goal_id => this.handleFinishGoal(this.state.goal.id)}>
                                Finish goal
                              </Button>
                            </div>
                          </CardFooter>
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  }
                </Card>
              </Col>
              <Col md="7">
                <Row noGutters className="page-header py-4">
                  <PageTitle title="Tasks" subtitle="Goal's" md="6" className="ml-sm-auto mr-sm-auto" />
                  { (this.state.goal.user_goal_id === null ) ?
                    (
                      <Col md="6" style={{paddingTop: 25, paddingLeft: 230}}>
                        <div onClick={() => this.handleJoinGoal(
                          this.state.goal.group_id,
                          this.state.goal.id
                          )}>
                          <Button variant="primary" size="sm">Join</Button>
                        </div>
                      </Col>
                    ) : (
                      <Col md="6" style={{paddingTop: 25}}>
                        <Row>
                          <Col md="8">
                            <Link to={"/users/" + localStorage.getItem('user_id') + "/goals/" + this.state.goal.id + "/goal_progress"}>
                              >>> to goal progress
                            </Link>
                          </Col>
                          <Col md="4">
                            <div onClick={() => this.handleLeaveGoal(
                              this.state.goal.group_id,
                              this.state.goal.id,
                              this.state.goal.user_goal_id
                            )}>
                              <Button variant="danger" size="sm">Leave</Button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    )
                  }
                </Row>
                <Row>
                { goal.tasks.map(task => (
                  <Col lg="6" key={task.id}>
                    <Card small className="card-post mb-4">
                      <CardBody>
                        <h5 className="card-title">{task.name}</h5>
                        <p className="card-text text-muted">{task.description === null ? ("No description") : (task.description)}</p>
                      </CardBody>
                      <CardFooter className="border-top d-flex">
                        <div className="d-flex">
                          <b>Start day</b>
                        </div>
                        <div className="my-auto ml-auto">
                          {task.start_day}
                        </div>
                      </CardFooter>
                      <CardFooter className="d-flex">
                        <div className="d-flex">
                          <b>End day</b>
                        </div>
                        <div className="my-auto ml-auto">
                          {task.end_day}
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                ))}
                </Row>
              </Col>
            </Row>
          )
        }
      </Container>
    )
  }
}

export default ShowGoalContainer;
