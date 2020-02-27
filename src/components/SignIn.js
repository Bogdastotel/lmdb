import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MyContext } from "./MyContext";

class SignIn extends React.Component {
  state = {
    redirectToRefferer: false
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Container className="my-2 p-3 text-center">
            <h2 style={{ color: "white" }} className="mb-4">
              Welcome to sign in page!
            </h2>
            <Form
              style={{ width: "500px", margin: "0 auto", color: "white" }}
              onSubmit={context.login}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={context.email}
                  onChange={context.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={context.password}
                  onChange={context.handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <p style={{ color: "white" }} className="mt-3">
              or
            </p>
            <Button
              variant="outline-primary"
              onClick={() => this.props.history.push("/Registration")}
            >
              Create new account
            </Button>
          </Container>
        )}
      </MyContext.Consumer>
    );
  }
}

export default SignIn;
