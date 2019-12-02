import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';
import { joinGroup } from '../redux/groups/join'

class HomePagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: []
    }
    this.handleJoinGroup = this.handleJoinGroup.bind(this);
  }

  async handleJoinGroup(event) {
    const user_group = await joinGroup(event.user_group);
    console.log(user_group);
    this.props.history.push("/groups/" + user_group.data.group.id)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/home')
    .then(response => {
      console.log(response.data.data.groups)
      this.setState({
        groups: response.data.data.groups
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created at</th>
                <th>Action</th>
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
                  <td><div onClick={() => this.handleJoinGroup({user_group: {
                    user_id: localStorage.getItem("user_id"),
                    group_id: group.id
                  }})}>Join</div></td>
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
