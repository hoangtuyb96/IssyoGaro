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
  CardFooter,
  Form,
  FormGroup,
  FormSelect,
  FormInput
} from "shards-react";
import { Snackbar } from "../../snackbar";
import FileBase64 from "react-file-base64";

class GroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group_id: "",
      name: "",
      description: "",
      cover: "",
      cover_show: "",
      is_public: "",
      category: "",
      is_joined: true,
      is_requested: true,
      created_at: "",
      current_user_role: 1,
      goals: [],
      user_group_id: "",
      loading: true,
      edit: false
    }
  }

  snackbarRef = React.createRef();

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("/api/groups/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      const group = response.data.group
      this.setState({
        loading: false,
        group_id: group.id,
        name: group.name,
        description: group.description,
        cover: group.cover,
        cover_show: group.cover,
        is_public: group.is_public,
        category: group.category,
        is_joined: group.is_joined,
        is_requested: group.is_requested,
        created_at: group.created_at,
        current_user_role: group.current_user_role,
        goals: group.goals,
        user_group_id: group.user_group_id
      })
    })
    .catch(error => {
      console.log(error.response)
      if (error.response.status === 404) {
        this.props.history.push("/404")
      }
    });
  }

  async handleJoinGroup(event) {
    const user_group = await joinGroup(event.user_group);
    window.location.reload(false); 
  }

  async handleLeaveGroup(event) {
    if (window.confirm("Are you sure?")) {
      await leaveGroup(event.user_group_id);
      window.location.reload(false);
    }
  }

  handleDeleteGroup(event) {
    if (window.confirm("Are you sure?")) {
      axios.delete("/api/groups/" + event.id)
      .then(response => {
        this.props.history.push({pathname: "/", state: {message: "Delete group successfully"}})
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push("/404")
        }
      })
    }
  }

  handleChangeEditForm = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getFiles(files){
    this.setState({ cover: files[0].base64 })
  }

  handleUpdate = () => {
    const { id } = this.props.match.params
    axios.patch("/api/groups/" + id,
      {group: {
        description: this.state.description,
        cover: this.state.cover,
        is_public: this.state.is_public
      }}
    )
    .then(response => {
      const group = response.data.group
      this.setState({
        loading: false,
        group_id: group.id,
        name: group.name,
        description: group.description,
        cover: group.cover,
        cover_show: group.cover,
        is_public: group.is_public,
        category: group.category,
        is_joined: group.is_joined,
        is_requested: group.is_requested,
        created_at: group.created_at,
        current_user_role: group.current_user_role,
        goals: group.goals,
        user_group_id: group.user_group_id
      })
    })
    .catch(error => {
      if (error.response !== undefined) {
        if (error.response.status === 404) {
          this.props.history.push("/404")
        }
      }
    });
  }

  render() {
    const group_state = this.state;
    return (
      <div className="profile_user">
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
                      { group_state.cover !== null ? (
                          <div
                            className="card-post__image"
                            style={{ backgroundImage: `url(https://res.cloudinary.com/my-stories/${group_state.cover})` }}
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
                        <a href={"/groups/" + group_state.group_id} className="text-fiord-blue">
                          {group_state.name}
                        </a>
                      </h4>
                    </CardHeader>
                    <CardBody>
                      { group_state.description === null ? (
                          "None description"
                        ) : (
                          <p className="card-text d-inline-block mb-3">{group_state.description}</p>
                        )
                      }
                      <br />
                      <br />
                      <span className="text">
                        <strong>Category</strong>: {group_state.category === null ? ( "None" ) : ( group_state.category )}
                      </span>
                      <br />
                      <br />
                      <span className="text"><strong>Created At:</strong> {group_state.created_at}</span>
                      <br />
                      <br />
                      <span className="text"><strong>{ group_state.is_public ? ("Public Group") : ("Private Group") }</strong></span>
                      <br />
                      <br />
                      { group_state.current_user_role === null ? (
                        ""
                        ) : (
                          <span className="test"><strong>Goal Amount:</strong> {group_state.goals.length}</span>
                        )
                      }
                    </CardBody>
                    { !group_state.is_joined ? (
                        group_state.is_requested ? (
                          <CardFooter className="border-top d-flex">
                            <div className="d-flex">
                              <h4>You should wait till your request gets approved by admin</h4>
                            </div>
                          </CardFooter>
                        ) : (
                          <CardFooter className="border-top d-flex">
                            <div className="border-top d-flex">
                              <div onClick={() => this.handleJoinGroup({user_group: {
                                user_id: localStorage.getItem("user_id"),
                                group_id: group_state.group_id
                              }})}>
                                { group_state.is_public ? (
                                  <Button size="sm" theme="primary">
                                    Join
                                  </Button>
                                ) : (
                                  <Button size="sm" theme="primary">
                                    Request
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardFooter>
                        )
                      ) : (
                        <CardFooter className="border-top d-flex">
                          { group_state.current_user_role === 3 ?
                            (
                              <div className="d-flex">
                               <div onClick={this.handleChangeEditForm}>
                                  { this.state.edit ?
                                    (
                                      <Button theme="primary" size="sm">Show Goals</Button>
                                    ) : (
                                      <Button theme="primary" size="sm">Edit Groups</Button>
                                    )
                                  }
                                </div>
                                <div onClick={(event) => this.handleDeleteGroup(this.props.match.params)}>
                                  <Button theme="danger" size="sm">Delete Group</Button>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          }
                          <div className="my-auto ml-auto">
                            <Link to={"/groups/" + group_state.group_id + "/chat"}>
                              <Button size="sm" theme="primary">Join Chat</Button>
                            </Link>
                            <div onClick={() => this.handleLeaveGroup({
                              user_group_id: group_state.user_group_id
                            })}>
                              <Button theme="danger" size="sm">Leave</Button>
                            </div>
                          </div>
                        </CardFooter>
                      )
                    }
                    <CardFooter className="border-top d-flex">
                      { group_state.current_user_role === null ?
                        (
                          ""
                        ) : ( group_state.current_user_role !== 1 ? (
                            <React.Fragment>
                              <div className="d-flex">
                                <Link to={"/groups/" + group_state.group_id + "/goals"}>
                                  <Button size="sm" theme="dark">Create Goal</Button>
                                </Link>
                              </div>
                              <div className="my-auto ml-auto">
                                <Link to={"/groups/" + group_state.group_id + "/members"}>
                                  <Button size="sm" theme="dark">Members</Button>
                                </Link>
                              </div>
                              <div className="my-auto ml-auto">
                                <Link to={"/groups/" + group_state.group_id + "/requests"}>
                                  <Button size="sm" theme="dark">Requests</Button>
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
                      this.state.edit ?
                      (
                        <Card>
                          <CardBody>
                            <Form onSubmit={this.handleUpdate}>
                              <FormGroup>
                                <label>Description</label>
                                <FormInput type="text"
                                  placeholder="Enter group description"
                                  value={this.state.description}
                                  name="description"
                                  onChange={this.handleChange} />
                              </FormGroup>

                              <FormGroup>
                                <Row>
                                  <Col md="6" className="form-group">
                                    <label>Group type</label>
                                    <FormSelect
                                      value={this.state.is_public}
                                      name="is_public"
                                      onChange={this.handleChange} required>
                                        <option value="1">Public</option>
                                        <option value="0">Private</option>
                                    </FormSelect>
                                  </Col>
                                  <Col md="6" className="form-group">
                                    <label>Cover image</label>
                                    <FileBase64
                                      multiple={ true }
                                      onDone={ this.getFiles.bind(this) } />
                                  </Col>
                                </Row>
                              </FormGroup>
                              <Button variant="primary" onClick={this.handleUpdate}>
                                Update
                              </Button>
                            </Form>
                          </CardBody>
                        </Card>
                      ) : (
                        group_state.current_user_role === null ? (
                          'You can see all goals when join group'
                        ) : (
                          <Row>
                          {group_state.goals.length === 0 ?
                            (
                              <Col lg="12">
                                <Card>
                                  <CardBody>
                                    Create new goal and achieve it!!!
                                  </CardBody>
                                </Card>
                              </Col>
                            ) : (
                              group_state.goals.map((goal, idx) => (
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
                              ))
                            )
                          }
                        </Row>
                        )
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
