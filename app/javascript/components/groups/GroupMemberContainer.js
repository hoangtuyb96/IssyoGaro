import React, { Component } from 'react';
import axios from 'axios';
import { Container, Table, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class GroupMemberContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      is_loading: true
    }
  }

  componentDidMount() {
    const { group_id } = this.props.match.params;
    axios.get("/api/groups/" + group_id + "/group_members")
    .then(response => {
      this.setState({
        group: response.data.data.group,
        is_loading: false
    })})
    .catch(error => {
      console.log(error)
    })
  }

  getRole(role) {
    switch(role) {
      case 1:
        return "Member"
      case 2:
        return "Admin"
      case 3:
        return "Global Admin"
      default:
    }
  }

  handleChangeAdmin(user_group_id) {
    axios.patch("/api/user_groups/" + user_group_id)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    window.location.reload(false);
  }

  render() {
    return (
      <div className="list-member">
        <Container>
          { (this.state.is_loading) ? (
            ""
            ) : (
            <React.Fragment>
              <Row noGutters className="page-header py-4">
                <PageTitle title="Requests" subtitle={this.state.group.name} md="12" className="ml-sm-auto mr-sm-auto" />
              </Row>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Set Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.group.users.map( user => {
                    return (
                      <tr key={user.user_info.id}>
                        <td>{user.user_info.id}</td>
                        <td><Link to={"/users/" + user.user_info.id}>{user.user_info.name}</Link></td>
                        <td>{user.user_info.email}</td>
                        <td>
                          {this.getRole(user.role)}
                        </td>
                        <td>
                          {
                            (this.getRole(user.role) === "Admin") ? 
                            ( 
                              <Link onClick={() => this.handleChangeAdmin(user.id)}>
                                Delete Admin
                              </Link>
                            ) :
                            (
                              (this.getRole(user.role) === "Member") ?
                              (
                                <Link onClick={() => this.handleChangeAdmin(user.id)}>
                                  Set Admin
                                </Link>
                              )
                              :
                              (
                                <p>Global Admin</p>
                              )
                            )
                          }
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              </Row>
            </React.Fragment>
            )
          }
        </Container>
      </div>
    );
  }
}

export default GroupMemberContainer;
