import React, { Component, useState } from 'react';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import { Button } from 'react-bootstrap';
import PageTitle from "../common/PageTitle";
import { Link } from "react-router-dom";
import FileBase64 from "react-file-base64";
import {
  Container,
  Card,
  CardHeader,
  CardFooter,
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
import Modal from "react-modal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root-container')

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      honnin: false,
      groups_can_be_invited: [],
      is_loading: true,
      modalIsOpen: false,
      avatar: null,
      avatar_show: null,
      name: "",
      phone: "",
      address: "",
      hobby: "",
      email: "",
      achievements: []
    }
  }

  snackbarRef = React.createRef();

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("/api/users/" + id)
    .then(response => {
      this.setState({
        id: response.data.data.user.id,
        name: response.data.data.user.name,
        phone: response.data.data.user.phone,
        address: response.data.data.user.address,
        hobby: response.data.data.user.hobby,
        email: response.data.data.user.email,
        avatar: response.data.data.user.avatar,
        avatar_show: response.data.data.user.avatar,
        achievements: response.data.data.user.achievement,
        honnin: response.data.data.honnin,
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

  handleShow = () => {
    this.setState({modalIsOpen: true})
  }

  handleClose = () => {
    this.setState({modalIsOpen: false})
  }

  handleInvite = (group_id) => {
    axios.post("/api/invites/",
      {user_id: this.state.id, group_id: group_id});
    window.location.reload(false);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getFile = file => {
    this.setState({avatar: file.base64})
  }

  handleUpdate = () => {
    axios.patch("/api/users/" + this.state.id,
      {user: {
        phone: this.state.phone,
        name: this.state.name,
        address: this.state.address,
        hobby: this.state.hobby,
        avatar: this.state.avatar
      }})
    .then(response => {
      this.setState({
        name: response.data.data.user.name,
        phone: response.data.data.user.phone,
        address: response.data.data.user.address,
        hobby: response.data.data.user.hobby,
        honnin: response.data.data.honnin,
        avatar: response.data.data.avatar,
        avatar_show: response.data.data.avatar,
        groups_can_be_invited: response.data.data.groups_can_be_invited,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  render() {
    console.log(this.state)
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
                  { this.state.avatar_show === null ? (
                      <img
                        className="rounded-circle"
                        src={ require("../../default-avatar.png")}
                        alt="default-avatar"
                        width="110"
                      />
                    ) : (
                      <Image className="rounded-circle" cloudName="my-stories" className="rounded-circle" publicId={this.state.avatar_show} alt="avatar">
                        <Transformation width="110" height="110" crop="scale" radios="max"/>
                      </Image>
                    )
                  }
                </div>
                <h4 className="mb-0">{this.state.name}</h4>
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
                    { this.state.hobby === null ? (
                        "None"
                      ) : (
                        <span>{this.state.hobby}</span>
                      )}
                  </div>
                </ListGroupItem>
                <ListGroupItem className="p-4">
                  <strong className="text-muted d-block mb-2">
                    Achievements:
                  </strong>
                  <span>
                    { this.state.is_loading === false ? (
                        this.state.achievements.length > 0 ? (
                          <React.Fragment>
                            { this.state.achievements.map(achi => {
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
                            <label htmlFor="feEmail">Email</label>
                            <FormInput
                              type="email"
                              id="feEmail"
                              placeholder="Email Address"
                              readOnly="true"
                              onChange={() => {}}
                              value={this.state.email}
                              autoComplete="email"
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Password</label>
                            <FormInput
                              type="password"
                              id="fePassword"
                              placeholder="Password"
                              readOnly="true"
                              value=""
                              onChange={() => {}}
                              autoComplete="current-password"
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feFullName">Fullname</label>
                            <FormInput
                              id="feFullName"
                              placeholder="Full Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePhoneNumber">Phone Number</label>
                            <FormInput
                              id="fePhoneNumber"
                              placeholder="Phone Number"
                              name="phone"
                              value={this.state.phone}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <FormGroup>
                          <label htmlFor="feAddress">Address</label>
                          <FormInput
                            id="feAddress"
                            placeholder="Address"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="feDescription">Hobbies</label>
                            <FormTextarea
                              id="feDescription"
                              rows="5"
                              placeholder="Hobbies"
                              name="hobby"
                              onChange={this.handleChange}
                              value={this.state.hobby}
                            />
                          </Col>
                        </Row>
                        {this.state.is_loading ?
                          (
                            ""
                          ) : (
                            this.state.honnin ?
                            (
                              <Row>
                                <Col md="6" className="form-group">
                                  <FormGroup>
                                    <label>Change Avatar</label>
                                    <br />
                                    <FileBase64
                                      placeholder="Pick you avatar..."
                                      onDone={ this.getFile } />
                                  </FormGroup>
                                </Col>
                              </Row>
                            ) : (
                              ""
                            )
                          )
                        }
                        <Row>
                          <Col md="9">
                            {this.state.is_loading ?
                              (
                                "Loading..."
                              ) : (
                                this.state.honnin ?
                                  (
                                    <Button variant="primary" onClick={this.handleUpdate}>Update Account</Button>
                                  ) : (
                                    ""
                                  )
                              )
                            }
                          </Col>
                          <Col md="3">
                            {this.state.is_loading ?
                              (
                                "Loading..."
                              ) : (
                                !this.state.honnin ?
                                  (
                                    <Button onClick={this.handleShow}> Invite to group</Button>
                                  ) : (
                                    ""
                                  )
                              )
                            }

                            <Modal
                              isOpen={this.state.modalIsOpen}
                              onRequestClose={this.handleClose}
                              style={customStyles}
                              contentLabel="Example Modal"
                            >

                              <Card small className="mb-4 pt-3">
                                <CardHeader className="border-bottom text-center" style={{backgroundColor: "white"}}>
                                  <h3>List Groups</h3>
                                </CardHeader>
                                { this.state.groups_can_be_invited.length === 0 ?
                                  (
                                    "~~~ You aren't managing any groups ~~~"
                                  ) : (
                                    this.state.groups_can_be_invited.map(group => {
                                      return (
                                        <CardFooter className="d-flex" style={{backgroundColor: "white", width: 500}}>
                                          <div className="d-flex">
                                            {group.group_name}
                                          </div>
                                          <div className="my-auto ml-auto">
                                            { group.is_joined ? (
                                                <Button variant="success" size="sm">Joined</Button>
                                              ) : (
                                                group.is_invited ? (
                                                  <Button variant="secondary" size="sm">Invited</Button>
                                                ) : (
                                                  <Button variant="primary" size="sm" onClick={group_id => this.handleInvite(group.group_id)}>Invite</Button>
                                                )
                                              )
                                            }
                                          </div>
                                        </CardFooter>
                                      )
                                    })
                                  )
                                }
                              </Card>                              
                            </Modal>
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

export default ProfileContainer;
