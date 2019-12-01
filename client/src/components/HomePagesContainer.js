import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';

class HomePagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/home')
    .then(response => {
      console.log(response.data.data.groups.object)
      this.setState({
        groups: response.data.data.groups.object
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="List_group">
      <Container>
        <h1 className="IssyoGarou-title">Groups</h1>
        <Row>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
            {this.state.groups.map( group => {
              return (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td>{group.created_at}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Row>
      </Container>
      </div>
    );
  }
}

export default HomePagesContainer;
