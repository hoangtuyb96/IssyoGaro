import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from "react-redux"
import { logout, logoutUserSuccess } from "../../redux/logout"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { ActionCable } from "react-actioncable-provider";

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout(event) {
    event.preventDefault();
    await logout(this.state);
    this.props.dpLogoutUserSuccess();
    this.props.history.push("/");
  }

  handleReceive = response => {
    console.log(response)
  }

  render() {
    const {isLogin} = this.props;
    return (
      <Container>
        <ActionCable
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
                <Navbar.Collapse className="justify-content-end">
                  <Nav className="mr-sm-2">
                    <Nav.Link href="/create_group">Create Group</Nav.Link>
                    <NavDropdown title={ this.props.auth.currentUser.name } id="basic-nav-dropdown">
                      <NavDropdown.Item href={`/users/${localStorage.getItem('user_id')}`}>Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={this.handleLogout} href="#action/3.4">Logout</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
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
