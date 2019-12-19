import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from "react-bootstrap";
import { ActionCableProvider } from "react-actioncable-provider";
import { ActionCableConsumer } from "react-actioncable-provider";
import {
  Container,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Row,
  Col
} from "shards-react";

class ChatContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      group: {},
      is_loading: true,
      message: ""
    }
  }

  componentDidMount() {
    const chatInfo = axios.get("/api/users/" + localStorage.getItem("user_id") + "/groups/" + this.props.match.params.group_id + "/chats")
    .then(response => {
      this.setState({
        group: response.data.group,
        messages: response.data.chats,
        is_loading: false
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  handleChange = (event) => {
    this.setState({message: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post("/api/users/" + localStorage.getItem("user_id") + "/groups/" + this.props.match.params.group_id + "/chats", {chat: {context: this.state.message}})
    .then(response => {
      this.setState({
        messages: response.data.chats
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  handleReceive = response => {
    this.setState({
      messages: response.chats
    })
  }

  render() {
    return (
      <Container className="main-content-container px-4">
        <ActionCableConsumer
          channel={{ channel: "ChatChannel"}}
          onReceived={this.handleReceive}
        />
        { this.state.is_loading ?
          (
            ""
          ) : (
            <Card className="mb-4 pt-3">
              <CardHeader className="border-bottom text-center"  style={{backgroundColor: "white"}}>
                <h3>{this.state.group.name}</h3>
              </CardHeader>
              <CardBody>
                { this.state.messages.map(message => {
                  return (
                    <div className="d-flex" key={message.id}>
                      <div className="d-flex">
                        <strong><h5>「{message.user_name}」：</h5></strong>
                        {message.context}
                      </div>
                      <div className="my-auto ml-auto">
                        <span>{message.created_at}</span>
                      </div>
                    </div>
                  )
                })}
              </CardBody>
              <CardFooter>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col sm="11">
                      <Form.Control
                        type="text"
                        placeholder="Say Hi! to everyone..."
                        name="message"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col sm="1">
                      <Button size="sm" type="submit">Send</Button>
                    </Col>
                  </Row>
                </Form>
              </CardFooter>
            </Card>
          )
        }
      </Container>
    );
  }
}

export default ChatContainer;
