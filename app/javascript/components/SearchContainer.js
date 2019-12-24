import React, { Component } from "react";
import axios from 'axios';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from "./common/PageTitle";
import { Button } from "shards-react";

class SearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_loading: true,
      groups_result: {},
      users_result: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    window.location.reload(false)
  }

  componentDidMount() {
    axios.get("/api/search/", {params: { q: this.props.location.search.split('=')[1] }})
    .then(response => {
      this.setState({
        is_loading: false,
        groups_result: response.data.groups,
        users_result: response.data.users
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    let count_user = 0;
    let count_group = 0;
    console.log(this.state);
    return (
      <div className="list-member">
        <Container className="main-content-container px-4">
          { (this.state.is_loading) ? (
            ""
            ) : (
            <React.Fragment>
              <Row>
                <Col md="7">
                  <Row>
                    <PageTitle title="Users" subtitle="Search result" md="12" className="ml-sm-auto mr-sm-auto" />
                  </Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>User name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.users_result.map(user => {
                      count_user += 1
                      return (
                        <tr key={user.id}>
                          <td>{count_user}</td>
                          <td><Link to={"/users/" + user.id}>{user.name}</Link></td>
                          <td>{user.email}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                </Col>
                <Col md="5">
                  <Row>
                    <PageTitle title="Groups" subtitle="Search result" md="12" className="ml-sm-auto mr-sm-auto" />
                  </Row>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.groups_result.map(group => {
                      count_group += 1
                      return (
                        <tr key={group.id}>
                          <td>{count_group}</td>
                          <td><Link to={"/groups/" + group.id}>{group.name}</Link></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </React.Fragment>
            )
          }
        </Container>
      </div>
    )
  }
}

export default SearchContainer;
