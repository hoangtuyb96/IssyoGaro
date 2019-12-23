import React, { Component } from 'react';
import axios from 'axios';
import { Container, Table, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from "../common/PageTitle";
import { Button } from "shards-react";

class GroupMemberContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      requests: [],
      is_loading: true
    }
  }

  componentDidMount() {
    const { group_id } = this.props.match.params;
    axios.get("/api/groups/" + group_id + "/requests")
    .then(response => {
      this.setState({
        group: response.data.group,
        requests: response.data.requests,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleApprove = request_id => {
    const { group_id } = this.props.match.params;
    axios.patch("/api/groups/" + group_id + "/requests/" + request_id)
    .then(response => {
      this.setState({
        group: response.data.group,
        requests: response.data.requests,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleReject = request_id => {
    const { group_id } = this.props.match.params;
    axios.delete("/api/groups/" + group_id + "/requests/" + request_id)
    .then(response => {
      this.setState({
        group: response.data.group,
        requests: response.data.requests,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    console.log(this.state)
    const requests = this.state.requests;
    let count = 0;
    return (
      <div className="list-member">
        <Container className="main-content-container px-4">
          { (this.state.is_loading) ? (
            ""
            ) : (
            <React.Fragment>
              <Row noGutters className="page-header py-4">
                <PageTitle title="Requests" subtitle={this.state.group.name} md="12" className="ml-sm-auto mr-sm-auto" />
              </Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>User name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.requests.map(request => {
                  count += 1
                  return (
                    <tr key={request.id}>
                      <td>{count}</td>
                      <td><Link to={"/users/" + request.user_id}>{request.user_name}</Link></td>
                      <td>
                        { request.is_approve ?
                          (
                            <h4>Approved</h4>
                          ) : (
                            <React.Fragment>
                              <Button theme="primary" onClick={request_id => this.handleApprove(request.id)}>
                                Approve
                              </Button>
                              <Button theme="danger" onClick={request_id => this.handleReject(request.id)}>
                                Reject
                              </Button>
                            </React.Fragment>
                          )
                        }
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </React.Fragment>
            )
          }
        </Container>
      </div>
    );
  }
}

export default GroupMemberContainer;
