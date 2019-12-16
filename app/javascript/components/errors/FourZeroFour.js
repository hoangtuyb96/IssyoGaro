import React, { Component } from "react";
import { Container, Button } from "shards-react";
import { Link } from "react-router-dom";

class Errors extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h2>404</h2>
            <h3>Not found!</h3>
            <p>There was a problem on our end. Please try again later.</p>
            <Link to=""><Button pill>&larr; Go To Homepage</Button></Link>
          </div>
        </div>
      </Container>
    )
  }
};

export default Errors;
