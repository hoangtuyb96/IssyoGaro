import React, { Component } from "react";
import { Container, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userSigninFetch } from '../../redux/signin'

class SigninContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.userSigninFetch(this.state);
    this.props.history.push("/");
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
              placeholder="Enter email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              placeholder="Password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Signin
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userSigninFetch: userInfo => dispatch(userSigninFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(SigninContainer)
