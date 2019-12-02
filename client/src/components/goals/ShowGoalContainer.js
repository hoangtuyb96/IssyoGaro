import React, { Component } from 'react';
import GoalForm from './GoalForm';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';

class ShowGoalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: {},
      loading: true
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/goals/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      this.setState({
        goal: response.data.data.goal,
        loading: false
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <Container>
        { console.log(this.state.goal) }
        <h1 className="user_information">{this.state.goal.name}</h1>
          <Row>
            <Col xs="3"></Col>
            <Col xs="3">Goal name:</Col>
            <Col xs="3">{this.state.goal.name}</Col>
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Description:</Col>
            {(this.state.goal.category == null) ? (
              <Col xs="3">None</Col>
            ) : (
              <Col xs="3">{this.state.goal.description}</Col>
            )}
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Category:</Col>
            {(this.state.goal.category == null) ? (
              <Col xs="3">None</Col>
            ) : (
              <Col xs="3">{this.state.goal.adress}</Col>
            )}
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Type:</Col>
            {this.state.goal.is_public ? (
              <Col xs="3">Public</Col>
            ) : (
              <Col xs="3">Private</Col>
            )}
            <Col xs="3"></Col>

            <Col xs="3"></Col>
            <Col xs="3">Goals:</Col>
            { !this.state.loading ? (
              <Col xs="3">{this.state.goal.tasks.length}</Col>
              ) : (
              ""
            )}
            <Col xs="3"></Col>

            { !this.state.loading ? (
              this.state.goal.tasks.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Start day</th>
                      <th>End day</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.goal.tasks.map( goal => {
                    return (
                      <tr key={goal.id}>
                        <td>{goal.id}</td>
                        <td>{goal.name}</td>
                        <td>{goal.description}</td>
                        <td>{goal.start_day}</td>
                        <td>{goal.end_day}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              ) : (
                ""
              )
              ) : (
              ""
            )}
          </Row>
      </Container>
    )
  }
}

export default ShowGoalContainer;
