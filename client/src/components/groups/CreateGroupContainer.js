import React, { Component } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createGroup, createGroupSuccess } from '../../redux/groups/create';

class CreateGroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      cover: "",
      category_id: "",
      is_public: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit() {
    const createdGroup = await createGroup(this.state);
    this.props.dpCreateGroupSuccess(createdGroup);
    this.props.history.push({pathname: "groups/" + createdGroup.id, state: {message: "Create group succesfully"}})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Container>
        <Form >
          <Form.Group controlId="formName">
            <Form.Label>Group name</Form.Label>
            <Form.Control type="text"
              placeholder="Enter group name"
              value={this.state.name}
              name="name"
              onChange={this.handleChange} required />
          </Form.Group>

        <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"
              placeholder="Enter group description"
              value={this.state.description}
              name="description"
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formPublic">
            <Form.Label>Group type</Form.Label>
            <Form.Control as="select"
              value={this.state.is_public}
              name="is_public"
              onChange={this.handleChange} required>
                <option value="1">Public</option>
                <option value="0">Private</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit}>
            Signup
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dpCreateGroupSuccess: createGroup => dispatch(createGroupSuccess(createGroup))
})

export default connect(null, mapDispatchToProps)(CreateGroupContainer);
