import React, { Component } from 'react';
import axios from 'axios';
import { joinGroup } from '../redux/groups/join';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import PageTitle from "./common/PageTitle";
import { Snackbar } from "../snackbar";

class HomePagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      is_loading: true
    }
    this.handleJoinGroup = this.handleJoinGroup.bind(this);
  }

  snackbarRef = React.createRef();

  async handleJoinGroup(event) {
    const user_group = await joinGroup(event.user_group);
    console.log(user_group);
    this.props.history.push("/groups/" + user_group.data.group.id)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/home')
    .then(response => {
      this.setState({
        groups: response.data.groups,
        is_loading: false
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    const colors = ["dark", "info", "royal-blue", "warning"]
    console.log(this.state)
    return (
        <Container fluid className="main-content-container px-4">
        <Snackbar ref = {this.snackbarRef} />
          { this.snackbarRef.current !== null ? (
              this.props.history.location.state !== undefined ? (
                this.snackbarRef.current.openSnackBar(this.props.history.location.state.message),
                this.props.history.replace({state: undefined})
              ) : (
                ""
              )
            ) : (
              ""
            )
          }
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Groups" subtitle="Homepage" className="text-sm-left" />
          </Row>
          { this.state.is_loading ? (
              "Loading..."
            ) : (
              <Row>
                {this.state.groups.map((group, idx) => (
                  <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                    <Card small className="card-post card-post--1">
                      { group.cover === null ? (
                          <div
                            className="card-post__image"
                            style={{ backgroundImage: `url(${require("../cover-default.jpg")})` }}
                          >
                            <Badge
                              pill
                              className={`card-post__category bg-${colors[Math.floor(Math.random()*colors.length)]}`}
                            >
                              {group.category === null ? (
                                  "None"
                                ) : (
                                  group.category
                                )
                              }
                            </Badge>
                          </div>
                        ) : (
                          <div
                            className="card-post__image"
                            style={{ backgroundImage: `url(https://res.cloudinary.com/my-stories/${group.cover})` }}
                          >
                            <Badge
                              pill
                              className={`card-post__category bg-${colors[Math.floor(Math.random()*colors.length)]}`}
                            >
                              {group.cover === null ? (
                                  "None"
                                ) : (
                                  group.category
                                )
                              }
                            </Badge>
                          </div>
                        )
                      }
                      <CardBody>
                        <h5 className="card-title">
                          <a href={"/groups/" + group.id} className="text-fiord-blue">
                            {group.name}
                          </a>
                        </h5>
                        <p className="card-text d-inline-block mb-3">{group.description}</p>
                        <br />
                        <span className="text-muted">{group.created_at}</span>
                      </CardBody>
                      <CardFooter className="border-top d-flex">
                        <div className="d-flex">
                          <a
                            href="#"
                            className="card-post__author-avatar card-post__author-avatar--small"
                            style={{ backgroundImage: `url(${require("../cover-default.jpg")})` }}
                          >
                            Written by User...
                          </a>
                          <div className="d-flex flex-column justify-content-center ml-3">
                            <span className="card-post__author-name">
                              {group.user}
                            </span>
                            { group.is_public ? (
                                <small className="text-muted">Public Group</small>
                              ) : (
                                <small className="text-muted">Private Group</small>
                              )
                            }
                          </div>
                        </div>
                        <div className="my-auto ml-auto">
                          <div onClick={() => this.handleJoinGroup({user_group: {
                            user_id: localStorage.getItem("user_id"),
                            group_id: group.id
                          }})}>
                            { group.is_joined ? (
                                <Button size="sm" theme="dark">
                                    <i className="far fa-bookmark mr-1" />
                                    Joined
                                </Button>
                              ) : (
                                <Button size="sm" theme="primary">
                                    <i className="far fa-bookmark mr-1" />
                                    Join
                                </Button>
                              )
                            }
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                ))}
              </Row>
            )
          }
        </Container>
      
    );
  }
}

export default HomePagesContainer;
