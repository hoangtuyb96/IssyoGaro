import React, { Component } from "react";
import { Container, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userSigninFetch } from '../../redux/signin'
import { Snackbar } from "../../snackbar";

class SigninContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      error: ""
    }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarRef = React.createRef();

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleError = message => {
    if (message === 401) {
      this.setState({error: "Invalid email or password"});
    } else {
      this.props.history.push({pathname: "/", state: {message: "Signin successfully"}})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginUser = this.props.userSigninFetch(this.state, this.handleError);
  }

  render() {
    return (
      <Container>
      <Snackbar ref = {this.snackbarRef} />
        { this.snackbarRef.current !== null ? (
            this.state.error !== "" ? (
              this.snackbarRef.current.openSnackBar(this.state.error),
              this.setState({error: ""})
            ) : (
              ""
            )
          ) : (
            ""
          )
        }
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
  userSigninFetch: (userInfo, handleError) => dispatch(userSigninFetch(userInfo, handleError))
})

export default connect(null, mapDispatchToProps)(SigninContainer)
