import React, { Component, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      groups_can_be_invited: []
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get("http://localhost:3001/api/users/" + id)
    .then(response => {
      this.setState({
        user: response.data.data.user,
        groups_can_be_invited: response.data.data.groups_can_be_invited
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
          <Image cloudName="my-stories" publicId={this.state.user.avatar} width="300" crop="scale" />
          <Invite receiver={this.state}/>

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

function Invite(receiver) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
  }

  const handleInvite = (group_id) => {
    console.log(receiver.receiver.user);
    axios.post("http://localhost:3000/api/invites/",
      {user_id: receiver.receiver.user.id, group_id: group_id});
    window.location.reload(false);
  }

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>
        Invite to group
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            { receiver.receiver.groups_can_be_invited.length === 0 ? (
                "chua load xong"
              ) : (
                receiver.receiver.groups_can_be_invited.map( group => {
                  return (
                    <React.Fragment>
                    <Col xs="9">
                      {group.group_name}
                    </Col>
                    <Col xs="3">
                      { group.is_joined ? (
                          <Button variant="success" size="sm">Joined</Button>
                        ) : (
                          group.is_invited ? (
                            <Button variant="secondary" size="sm">Invited</Button>
                          ) : (
                            <Button variant="primary" size="sm" onClick={group_id => handleInvite(group.group_id)}>Invite</Button>
                          )
                        )
                      }
                    </Col>
                  </React.Fragment>
                  )
                })
              )
            }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileContainer;
