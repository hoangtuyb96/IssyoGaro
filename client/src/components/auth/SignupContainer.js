import React, { Component } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login, loginUserSuccess } from '../../redux/signup'

class SignupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      signupErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event)  {
    event.preventDefault();

    let user_get = await login(this.state);
    const authUser = {
      id: user_get.id,
      name: user_get.name,
      token: user_get.authentication_token
    };
    this.props.dpLoginUserSuccess(authUser);
    this.props.history.push("/users/" + authUser.id);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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

        <Form.Group controlId="formBasicName">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text"
              placeholder="Enter fullname"
              value={this.state.name}
              name="name"
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password confirmation</Form.Label>
            <Form.Control type="password"
              placeholder="Password confirmation"
              value={this.state.password_confirmation}
              name="password_confirmation"
              onChange={this.handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dpLoginUserSuccess: authUser => dispatch(loginUserSuccess(authUser))
})

export default connect(null, mapDispatchToProps)(SignupContainer);
