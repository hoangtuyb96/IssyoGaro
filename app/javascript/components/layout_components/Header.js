import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from "react-redux"
import { logout, logoutUserSuccess } from "../../redux/logout"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { ActionCableConsumer } from "react-actioncable-provider";
import { NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      visible: false,
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
      notifications: response.notifications
    })
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentDidMount() {
    axios.get("/api/notifications")
    .then(response => {
      this.setState({
        notifications: response.data.data.notifications,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  render() {
    const {isLogin} = this.props;
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
                  {/*<Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form>*/}
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
                  {/*<Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form>*/}
                </Navbar.Collapse>
                
                <NavLink
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
                          {this.state.notifications.length}
                        </Badge>
                      )
                    }
                </NavLink>
                <Collapse
                  open={this.state.visible}
                  className="dropdown-menu dropdown-menu-small"
                  style={{left: 300, right: 250, top: 60}}
                >
                  { this.state.is_loading ?
                    (
                      "Loading..."
                    ) : (
                      this.state.notifications.length === 0 ? (
                        "No notifications"
                      ) : (
                        this.state.notifications.map(notification => {
                          return (
                            <DropdownItem key={notification.id}>
                              <div className="notification__content">
                                <span className="notification__category"><strong>{notification.sender_name}</strong></span>
                                <p>
                                  {notification.context}
                                </p>
                              </div>
                            </DropdownItem>
                          )
                        })
                      )
                    )
                  }
                  
                  <DropdownItem className="notification__all text-center">
                    View all Notifications
                  </DropdownItem>
                </Collapse>
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
