import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from "react-redux"
import { logout, logoutUserSuccess } from "../../redux/logout"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { ActionCableConsumer } from "react-actioncable-provider";
import { Link } from "react-router-dom";
import {
  NavLink,
  Badge,
  Collapse,
  DropdownItem,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Row,
  Col
} from "shards-react";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      unread_count: "",
      visible: false,
      querry: {},
      is_loading: true
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  async handleLogout(event) {
    event.preventDefault();
    await logout(this.state);
    this.props.dpLogoutUserSuccess();
    this.props.history.push({pathname: "/", state: {message: "Signout successfully"}})
  }

  handleReceive = response => {
    this.setState({
      notifications: response.notifications,
      unread_count: response.unread_count
    })
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentDidMount() {
    const {isLogin} = this.props
    if (isLogin) {
      axios.get("/api/notifications")
      .then(response => {
        this.setState({
          notifications: response.data.data.notifications,
          unread_count: response.data.data.unread_count,
          is_loading: false
        })
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }

  handleAccept = invite_id => {
    this.setState({
      visible: !this.state.visible
    });
    const acceptResponse = axios.patch("/api/invites/" + invite_id)
    .then(response => {
      console.log(response)
      this.setState({
        notifications: response.data.notifications,
        unread_count: response.data.unread_count
      })
      this.props.history.push({pathname: "/groups/" + response.data.group_id, state: {message: response.data.messages}})
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  handleReject = invite_id => {
    this.setState({
      visible: !this.state.visible
    });
    const rejectResponse = axios.delete("/api/invites/" + invite_id)
    .then(response => {
      this.setState({
        notifications: response.data.notifications,
        unread_count: response.data.unread_count
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  handleChangeQuerrySearch = (event) => {
    this.setState({
      querry: event.target.value
    })
  }

  handleSearch = (event) => {
    event.preventDefault()
    this.props.history.push(`/search?q=${this.state.querry}`)
  }

  render() {
    const {isLogin} = this.props;
    if (!isLogin) {
      if (this.props.location.pathname !== "/") {
        if (this.props.location.pathname !== "/signin") {
          if (this.props.location.pathname !== "/signup") {
            this.props.history.push({pathname: "/signin", state: {message: "You need to signin or signup"}})
          }
        }
      }
    }
    return (
      <Container>
        <ActionCableConsumer
          channel={{ channel: "NotificationChannel"}}
          onReceived={this.handleReceive}
        />
        <div className="header">
          <Navbar expand="lg">
            <Navbar.Brand href="/">
              <img src={ require("../../logo.png")} heigh="80" width="80" alt="logo"/>
              {' '}IssyoGaro
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {!isLogin ? (
              <React.Fragment>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" onSubmit={this.handleSearch}>
                    <InputGroup seamless className="ml-3">
                      <InputGroupAddon type="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <FormInput
                        name="query"
                        className="navbar-search"
                        placeholder="Search for something..."
                        onChange={this.handleChangeQuerrySearch}
                      />
                    </InputGroup>
                  </Form>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                  <Nav className="mr-sm-2">
                    <Nav.Link href="/signup">Signup</Nav.Link>
                    <Nav.Link href="/signin">Signin</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" onSubmit={this.handleSearch}>
                    <InputGroup seamless className="ml-3">
                      <InputGroupAddon type="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <FormInput
                        className="navbar-search"
                        placeholder="Search for something..."
                        onChange={this.handleChangeQuerrySearch}
                      />
                    </InputGroup>
                  </Form>
                </Navbar.Collapse>
                
                <NavLink
                  style={{position: "relative"}}
                  className="nav-link-icon text-center"
                  onClick={this.toggleNotifications}
                >
                    <i className="fa fa-bell"></i>
                    { this.state.is_loading ?
                      (
                        ""
                      ) :
                      (
                        <Badge pill theme="danger">
                          {this.state.unread_count}
                        </Badge>
                      )
                    }
                  <Collapse
                    open={this.state.visible}
                    className="dropdown-menu dropdown-menu-small"
                    style={{right: 0, top: 40, left: "auto", width: 500, maxHeight: 600, overflowY: "scroll"}}
                  >
                    { this.state.is_loading ?
                      (
                        "Loading..."
                      ) : (
                        this.state.notifications.length === 0 ? (
                          <p style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>No notifications</p>
                        ) : (
                          this.state.notifications.map(notification => {
                            return (
                              notification.notificationable_type === "Group" ?
                              (
                                <Link to={"/groups/" + notification.notificationable_id}>
                                <DropdownItem key={notification.id} style={{whiteSpace: 'pre-wrap'}}>
                                  <Row>
                                    <Col md="8">
                                      <span className="notification__category"><strong>{notification.sender_name}</strong></span>
                                      <br /><p className="word-wrap">{notification.context}</p>
                                    </Col>
                                  </Row>
                                </DropdownItem>
                                </Link>
                              ) : (
                                <DropdownItem key={notification.id} style={{whiteSpace: 'pre-wrap'}}>
                                  <Row>
                                    <Col md="8">
                                      <span className="notification__category"><strong>{notification.sender_name}</strong></span>
                                      <br /><p className="word-wrap">{notification.context}</p>
                                    </Col>
                                    <Col md="4">
                                      { notification.notificationable_type === "Invite" && notification.is_read === false ?
                                        (
                                          <div className="my-auto ml-auto">
                                            <Button theme="primary" size="sm" onClick={invite_id => this.handleAccept(notification.notificationable_id)}>Accept</Button>
                                            <span> </span>
                                            <Button theme="dark" size="sm" onClick={invite_id => this.handleReject(notification.notificationable_id)}>Reject</Button>
                                          </div>
                                        ) : (
                                          ""
                                        )
                                      }
                                    </Col>
                                  </Row>
                                </DropdownItem>
                              )
                            )
                          })
                        )
                      )
                    }
                    
                    <DropdownItem className="notification__all text-center">
                      View all Notifications
                    </DropdownItem>
                  </Collapse>
                </NavLink>
                <Nav className="mr-sm-2">
                  <Nav.Link href="/create_group">Create Group</Nav.Link>
                  <NavDropdown title={ this.props.auth.currentUser.name } id="basic-nav-dropdown">
                    <NavDropdown.Item href={`/users/${localStorage.getItem('user_id')}`}>Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.handleLogout} href="#action/3.4">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </React.Fragment>
            )}
          </Navbar>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}

const mapDispatchToProps = dispatch => ({
  dpLogoutUserSuccess: () => dispatch(logoutUserSuccess())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
