import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout, logoutUserSuccess } from "../../redux/logout"

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

  render() {
    const {isLogin} = this.props;
    console.log(this.props.auth)
    return (
      <Container>
        <div className="header">
          <Row>
            <Col xs="2"><Link to="/">Logo</Link></Col>
            <Col xs="md"></Col>
            {!isLogin ? (
              <React.Fragment>
                <Col xs="1"><Link to="/signup">Signup</Link></Col>
                <Col xs="1"><Link to="/signin">Login</Link></Col>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col xs="1">{ this.props.auth.currentUser.name }</Col>
                <Col xs="1"><div onClick={this.handleLogout}>Logout</div></Col>
              </React.Fragment>
            )}
          </Row>
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
