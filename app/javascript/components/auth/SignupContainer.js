import React, { Component } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login, loginUserSuccess } from '../../redux/signup';
import { Row, Col, FormGroup } from "shards-react";
import FileBase64 from "react-file-base64";
import { Snackbar } from "../../snackbar";

class SignupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      avatar: null,
      phone: "",
      address: "",
      hobby: "",
      signupErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  snackbarRef = React.createRef();

  async handleSubmit(event)  {
    event.preventDefault();

    let user_get = await login(this.state);
    if (user_get.status === 422) {
      let error_message = ""
      if (user_get.data.message.email !== undefined) {
        error_message += "Email " + user_get.data.message.email + ". "
      }
      if (user_get.data.message.password !== undefined) {
        error_message += "Password " + user_get.data.message.password + ". "
      }
      this.setState({signupErrors: error_message})
    } else {
      const user = user_get.data.data.user
      const authUser = {
      id: user.id,
      name: user.name,
      token: user.authentication_token
    };
    this.props.dpLoginUserSuccess(authUser);
    this.props.history.push({pathname: "/users/" + authUser.id, state: {message: user_get.data.message}});
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getFile(file) {
    this.setState({avatar: file.base64})
  }

  render() {
    return (
      <Container style={{paddingTop: 100}}>
      <Snackbar ref = {this.snackbarRef} />
      { this.snackbarRef.current !== null ? (
          this.state.signupErrors !== "" ? (
            this.snackbarRef.current.openSnackBar(this.state.signupErrors),
            this.setState({signupErrors: ""})
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

          <Row>
            <Col md="6" className="form-group">
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange} required />
              </Form.Group>
            </Col>

            <Col md="6" className="form-group">
              <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control type="password"
                  placeholder="Password confirmation"
                  value={this.state.password_confirmation}
                  name="password_confirmation"
                  onChange={this.handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md="6" className="form-group">
              <Form.Group controlId="formBasicName">
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="text"
                  placeholder="Enter fullname"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange} required />
              </Form.Group>
            </Col>

            <Col md="6" className="form-group">
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text"
                  placeholder="Enter Address"
                  value={this.state.address}
                  name="address"
                  onChange={this.handleChange} />
              </Form.Group>
            </Col>
          </Row>


          <Row>
            <Col md="6" className="form-group">
              <Form.Group controlId="formTelephone">
                <Form.Label>Telephone number</Form.Label>
                <Form.Control type="number"
                  placeholder="Enter telephone number"
                  value={this.state.phone}
                  name="phone"
                  onChange={this.handleChange} />
              </Form.Group>
            </Col>

            <Col md="6" className="form-group">
              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <br/ >
                <FileBase64
                  placeholder="Pick you avatar..."
                  onDone={ this.getFile.bind(this) } />
              </Form.Group>
            </Col>
          </Row>

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
