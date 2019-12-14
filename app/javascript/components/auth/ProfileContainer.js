import React, { Component, useState } from 'react';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import { Modal, Button } from 'react-bootstrap';
import PageTitle from "../common/PageTitle";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormTextarea,
} from "shards-react";
import { Snackbar } from "../../snackbar";

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      groups_can_be_invited: [],
      is_loading: true
    }
  }

  snackbarRef = React.createRef();

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("/api/users/" + id)
    .then(response => {
      this.setState({
        user: response.data.data.user,
        groups_can_be_invited: response.data.data.groups_can_be_invited,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error.response)
      if (error.response.status === 404) {
        this.props.history.push("/404")
      }
    });
  }

  render() {
    return (
      <Container className="main-content-container px-4">
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
          <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <Card small className="mb-4 pt-3">
              <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                  { this.state.user.avatar === null ? (
                      <img
                        className="rounded-circle"
                        src={ require("../../default-avatar.png")}
                        alt="default-avatar"
                        width="110"
                      />
                    ) : (
                      <Image className="rounded-circle" cloudName="my-stories" className="rounded-circle" publicId={this.state.user.avatar} alt="avatar">
                        <Transformation width="110" height="110" crop="scale" radios="max"/>
                      </Image>
                    )
                  }
                </div>
                <h4 className="mb-0">{this.state.user.name}</h4>
                {/*<span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
                <Button pill outline size="sm" className="mb-2">
                  <i className="material-icons mr-1">person_add</i> Follow
                </Button>*/}
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="px-4">
                  <div className="progress-wrapper">
                    <strong className="text-muted d-block mb-2">
                      Hobbies:
                    </strong>
                    { this.state.user.hobby === null ? (
                        "None"
                      ) : (
                        <span>{this.state.user.hobby}</span>
                      )}
                  </div>
                </ListGroupItem>
                <ListGroupItem className="p-4">
                  <strong className="text-muted d-block mb-2">
                    Achievements:
                  </strong>
                  <span>
                    { this.state.is_loading === false ? (
                        this.state.user.achievement.length > 0 ? (
                          <React.Fragment>
                            { this.state.user.achievement.map(achi => {
                              return(
                                <Row key={achi.id}>
                                  <Col xs="3">
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
                                  </Col>
                                  <Col xs="9">
                                    <Link to={`/goals/${achi.goal_id}`}>{achi.goal_name}</Link>
                                  </Col>
                                </Row>
                              )
                            })}
                          </React.Fragment>
                        ) : (
                          "No achievement"
                        )
                      ) : (
                        "Loading..."
                      )
                    }
                  </span>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col xs="8">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">User Details</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feFullName">Fullname</label>
                            <FormInput
                              id="feFullName"
                              placeholder="Full Name"
                              value={this.state.user.name}
                              onChange={() => {}}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePhoneNumber">Phone Number</label>
                            <FormInput
                              id="fePhoneNumber"
                              placeholder="Phone Number"
                              value={this.state.user.phone}
                              onChange={() => {}}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Email</label>
                            <FormInput
                              type="email"
                              id="feEmail"
                              placeholder="Email Address"
                              onChange={() => {}}
                              value={this.state.user.email}
                              autoComplete="email"
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Password</label>
                            <FormInput
                              type="password"
                              id="fePassword"
                              placeholder="Password"
                              value=""
                              onChange={() => {}}
                              autoComplete="current-password"
                            />
                          </Col>
                        </Row>
                        <FormGroup>
                          <label htmlFor="feAddress">Address</label>
                          <FormInput
                            id="feAddress"
                            placeholder="Address"
                            value={this.state.user.address}
                            onChange={() => {}}
                          />
                        </FormGroup>
                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="feDescription">Hobbies</label>
                            <FormTextarea
                              id="feDescription"
                              rows="5"
                              placeholder="Hobbies"
                              onChange={() => {}}
                              value={this.state.user.hobby}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md="9">
                            <Button variant="primary">Update Account</Button>
                          </Col>
                          <Col md="3">
                            <Invite receiver={this.state}/>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

function Invite(receiver) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  const handleInvite = (group_id) => {
    console.log(receiver.receiver.user);
    axios.post("http://localhost:3000/api/invites/",
      {user_id: receiver.receiver.user.id, group_id: group_id});
    window.location.reload(false);
  }

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
        Invite to group
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            { receiver.receiver.groups_can_be_invited.length === 0 ? (
                "~~~Only Admin Can Invite People To Group~~~"
              ) : (
                receiver.receiver.groups_can_be_invited.map( group => {
                  return (
                    <Row key={group.id}>
                      <Col xs="9">
                        {group.group_name}
                      </Col>
                      <Col xs="3">
                        { group.is_joined ? (
                            <Button variant="success" size="sm">Joined</Button>
                          ) : (
                            group.is_invited ? (
                              <Button variant="secondary" size="sm">Invited</Button>
                            ) : (
                              <Button variant="primary" size="sm" onClick={group_id => handleInvite(group.group_id)}>Invite</Button>
                            )
                          )
                        }
                      </Col>
                    </Row>
                  )
                })
              )
            }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileContainer;
