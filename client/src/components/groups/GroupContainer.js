import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { joinGroup } from '../../redux/groups/join';
import { leaveGroup } from '../../redux/groups/leave';
import PageTitle from "../common/PageTitle";
import {
  Container,
  Card,
  CardHeader,
  Row,
  Col,
  Button,
  CardBody,
  CardFooter
} from "shards-react";

class GroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/groups/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      const group = response.data.group
      this.setState({
        loading: false,
        group: group
      })
    })
    .catch(error => {
      console.log(error.response)
    });
  }

  async handleJoinGroup(event) {
    const user_group = await joinGroup(event.user_group);
    console.log(user_group);
    window.location.reload(false); 
  }

  async handleLeaveGroup(event) {
    await leaveGroup(event.user_group_id);
    window.location.reload(false);
  }

  render() {
    const group = this.state.group;
    return (
      <div className="profile_user">
        <Container className="main-content-container px-4">
          { this.state.loading ? (
            ""
            ) : (
              <React.Fragment>
              <Row noGutters className="page-header py-4">
                <PageTitle title="Group Information" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
              </Row>
              <Row>
                <Col xs="5">
                  <Card small className="mb-4 pt-3">
                    <CardHeader className="border-bottom text-center">
                      { group.cover !== null ? (
                          <div
                            className="card-post__image"
                            style={{ backgroundImage: `url(https://res.cloudinary.com/my-stories/${group.cover})` }}
                          >
                          </div>
                        ) : (
                          <div
                            className="card-post__image"
                            style={{ backgroundImage: `url(${require("../../cover-default.jpg")})` }}
                          >
                          </div>
                        )
                      }
                      <br />
                      <h4 className="mb-0">
                        <a href={"/groups/" + group.id} className="text-fiord-blue">
                          {group.name}
                        </a>
                      </h4>
                    </CardHeader>
                    <CardBody>
                      { group.description === null ? (
                          "None description"
                        ) : (
                          <p className="card-text d-inline-block mb-3">{group.description}</p>
                        )
                      }
                      <br />
                      <br />
                      <span className="text-muted">
                        Category: {group.category === null ? ( "None" ) : ( group.category )}
                      </span>
                      <br />
                      <br />
                      <span className="text-muted">Created At: {group.created_at}</span>
                      <br />
                      <br />
                      <span className="text">{ group.is_public ? ("Public Group") : ("Private Group") }</span>
                      <br />
                      <br />
                      { group.current_user_role === null ? (
                        ""
                        ) : (
                          <span className="test">Goal Amount: {group.goals.length}</span>
                        )
                      }
                    </CardBody>
                    { (this.state.group.current_user_role === null ) ? (
                        <CardFooter className="border-top d-flex">
                          <div className="border-top d-flex">
                            <div onClick={() => this.handleJoinGroup({user_group: {
                              user_id: localStorage.getItem("user_id"),
                              group_id: this.state.group.id
                            }})}>
                              <Button variant="primary" size="sm">Join</Button>
                            </div>
                          </div>
                        </CardFooter>
                      ) : (
                        <CardFooter className="border-top d-flex">
                          <div className="my-auto ml-auto">
                            <div onClick={() => this.handleLeaveGroup({
                              user_group_id: this.state.group.user_group_id
                            })}>
                              <Button theme="danger" size="sm">Leave</Button>
                            </div>
                          </div>
                        </CardFooter>
                      )
                    }
                    <CardFooter className="border-top d-flex">
                      { this.state.group.current_user_role === null ?
                        (
                          ""
                        ) : ( group.current_user_role !== 1 ? (
                            <React.Fragment>
                              <div className="d-flex">
                                <Link to={"/groups/" + this.state.group.id + "/goals"}>
                                  <Button size="sm" theme="dark">Create Goal</Button>
                                </Link>
                              </div>
                              <div className="my-auto ml-auto">
                                <Link to={"/groups/" + this.state.group.id + "/members"}>
                                  <Button size="sm" theme="dark">Members</Button>
                                </Link>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )
                        )
                      }
                    </CardFooter>
                  </Card>
                </Col>

                <Col xs="7">
                  { this.state.loading ?
                    (
                      ""
                    ) : (
                      group.current_user_role === null ? (
                        'You can see all goals when join group'
                      ) : (
                        <Row>
                        {group.goals.map((goal, idx) => (
                          <Col lg="6" key={idx}>
                            <Card small className="card-post mb-4">
                              <CardBody>
                                <Link to={"/goals/" + goal.id}>
                                  <h5 className="card-title">{goal.name}</h5>
                                  <p className="card-text text-muted">{goal.description === null ? ("No description") : (goal.description)}</p>
                                </Link>
                              </CardBody>
                              <CardFooter className="border-top d-flex">
                                <div className="d-flex">
                                  <b>Start day</b>
                                </div>
                                <div className="my-auto ml-auto">
                                  {goal.start_day}
                                </div>
                              </CardFooter>
                              <CardFooter className="d-flex">
                                <div className="d-flex">
                                  <b>End day</b>
                                </div>
                                <div className="my-auto ml-auto">
                                  {goal.end_day}
                                </div>
                              </CardFooter>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      )
                    )
                  }
                </Col>
              </Row>
            </React.Fragment>
            )
          }
        </Container>
      </div>
    )
  }
}

export default GroupContainer;
