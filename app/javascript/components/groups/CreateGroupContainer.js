import React, { Component } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createGroup, createGroupSuccess } from '../../redux/groups/create';
import axios from "axios";
import {
  Row,
  Col,
  FormGroup
} from "shards-react";
import FileBase64 from "react-file-base64";


class CreateGroupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      category_id: "",
      is_public: true,
      cover: null,
      is_loading: true,
      categories: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("/api/categories")
    .then(response => {
      this.setState({
        categories: response.data.categories
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  async handleSubmit() {
    const createdGroup = await createGroup(this.state);
    console.log(createdGroup)
    this.props.dpCreateGroupSuccess(createdGroup);
    this.props.history.push({pathname: "groups/" + createdGroup.id, state: {message: "Create group succesfully"}})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getFiles(files){
    this.setState({ cover: files[0].base64 })
  }

  render() {
    return (
      <Container>
        <Form >
          <FormGroup controlId="formName">
            <Form.Label>Group name</Form.Label>
            <Form.Control type="text"
              placeholder="Enter group name"
              value={this.state.name}
              name="name"
              onChange={this.handleChange} required />
          </FormGroup>

        <FormGroup controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"
              placeholder="Enter group description"
              value={this.state.description}
              name="description"
              onChange={this.handleChange} />
          </FormGroup>

          <Form.Group controlId="formPublic">
            <Row>
              <Col md="4" className="form-group">
                <Form.Label>Group type</Form.Label>
                <Form.Control as="select"
                  value={this.state.is_public}
                  name="is_public"
                  onChange={this.handleChange} required>
                    <option value="1">Public</option>
                    <option value="0">Private</option>
                </Form.Control>
              </Col>
              <Col md="4" className="form-group">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select"
                  value={this.state.category_id}
                  name="category_id"
                  onChange={this.handleChange} required>
                    <option>Choose...</option>
                    {this.state.categories.map(category => {
                      return (
                        <option value={category.id} key={category.id}>{category.name}</option>
                      )
                    })}
                </Form.Control>
              </Col>
              <Col md="4" className="form-group">
                <Form.Label>Cover image</Form.Label>
                <FileBase64
                  multiple={ true }
                  onDone={ this.getFiles.bind(this) } />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" onClick={this.handleSubmit}>
            Create group
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
