import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Table, Col } from 'react-bootstrap';

class GroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {}
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/groups/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      const group = response.data.data.group
      this.setState({
        group: group
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
          <h1 className="user_information">{this.state.group.name}</h1>
          <Row>
            <Col xs="3"></Col>
            <Col xs="3">Group name:</Col>
            <Col xs="3">{this.state.group.name}</Col>
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Description:</Col>
            {(this.state.group.category == null) ? (
              <Col xs="3">None</Col>
            ) : (
              <Col xs="3">{this.state.group.description}</Col>
            )}
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Category:</Col>
            {(this.state.group.category == null) ? (
              <Col xs="3">None</Col>
            ) : (
              <Col xs="3">{this.state.group.adress}</Col>
            )}
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Type:</Col>
            {this.state.group.is_public ? (
              <Col xs="3">Public</Col>
            ) : (
              <Col xs="3">Private</Col>
            )}
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Goals:</Col>
            {(this.state.group.goals == null) ? (
              <Col xs="3">None</Col>
            ) : (
              <Col xs="3">Have</Col>
            )}
            <Col xs="3"></Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default GroupContainer;
