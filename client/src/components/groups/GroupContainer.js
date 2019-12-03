import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { joinGroup } from '../../redux/groups/join';
import { leaveGroup } from '../../redux/groups/leave';

class GroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/groups/" + id,
      {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(response => {
      const group = response.data.group
      this.setState({
        loading: false,
        group: group
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  async handleJoinGroup(event) {
    const user_group = await joinGroup(event.user_group);
    console.log(user_group);
    window.location.reload(false); 
  }

  async handleLeaveGroup(event) {
    await leaveGroup(event.user_group_id);
    window.location.reload(false);
  }

  render() {
    return (
      <div className="profile_user">
        <Container>
          <h1 className="user_information">{this.state.group.name}</h1>
          { (this.state.group.current_user_role === null ) ? (
              <div onClick={() => this.handleJoinGroup({user_group: {
                user_id: localStorage.getItem("user_id"),
                group_id: this.state.group.id
              }})}>
                <Button variant="primary" size="sm">Join</Button>
              </div>
            ) : (
              <div onClick={() => this.handleLeaveGroup({
                user_group_id: this.state.group.user_group_id
              })}>
                <Button variant="danger" size="sm">Leave</Button>
              </div>
            )
          }
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
              <Col xs="3">{this.state.group.category}</Col>
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

            { (this.state.group.current_user_role === null ) ? (
              'You can see all goals without join group'
              ) : (

              <div className="goals_details">
              <Row>
                <Col xs="3"></Col>
                <Col xs="3">Goals:</Col>
                { !this.state.loading ? (
                  <Col xs="3">{this.state.group.goals.length}</Col>
                  ) : (
                  ""
                )}
                <Col xs="3"></Col>

                { !this.state.loading ? (
                    this.state.group.goals.length > 0 ? (
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
                        {this.state.group.goals.map( goal => {
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
                  )
                }

                { this.state.group.current_user_role != 1 ? (
                      <Link to={"/groups/" + this.state.group.id + "/goals"}>
                        <Button variant="primary">Create Goal</Button>
                      </Link>
                  ) : (
                  ""
                  )
                }
              </Row>
            </div>
            )
            }
            
          </Row>
        </Container>
      </div>
    )
  }
}

export default GroupContainer;
