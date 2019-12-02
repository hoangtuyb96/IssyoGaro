import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/users/" + id)
    .then(response => {
      console.log(response.data.data.user);
      this.setState({
        user: response.data.data.user
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <div className="profile_user">
        <Container>
          <h1 className="user_information">{this.state.user.name}</h1>
          <Row>
            <Col xs="3"></Col>
            <Col xs="3">Full name:</Col>
            <Col xs="3">{this.state.user.name}</Col>
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Email:</Col>
            <Col xs="3">{this.state.user.email}</Col>
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Phone:</Col>
            <Col xs="3">{this.state.user.phone}</Col>
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Address:</Col>
            <Col xs="3">{this.state.user.adress}</Col>
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Hobbies:</Col>
            <Col xs="3">{this.state.user.hobby}</Col>
            <Col xs="3"></Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ProfileContainer;
