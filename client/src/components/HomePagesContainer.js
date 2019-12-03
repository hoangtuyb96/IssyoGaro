import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';
import { joinGroup } from '../redux/groups/join';
import { Link } from 'react-router-dom';

class HomePagesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      is_loading: true
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
      this.setState({
        groups: response.data.groups
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
                <th>Public</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {this.state.groups.map( group => {
              return (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td><Link to={"/groups/" + group.id}>{group.name}</Link></td>
                  <td>{group.description}</td>
                  <td>
                    { (group.is_public) ? (
                      <p>Public</p>
                      ) : (
                      <p>Private</p>
                      )
                    }
                  </td>
                  <td>{group.created_at}</td>
                  <td>
                    <div onClick={() => this.handleJoinGroup({user_group: {
                      user_id: localStorage.getItem("user_id"),
                      group_id: group.id
                    }})}>
                      { ( group.is_joined ) ? (
                          <p>Joined</p>
                        ) : (
                          <p>Join</p>
                        )}
                    </div>
                  </td>
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
