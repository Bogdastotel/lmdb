import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import net from "./services";

// const net = "http://192.168.0.74:8000";

// const net = "https://56831765.ngrok.io";

class Registration extends Component {
  state = {
    name: "",
    surname: "",
    // email: "",
    // password: ""
    // grant_type: "password",
    // client_id: 2,
    // client_secret: "RQuPHhPR1DK3LYBvuy9WvMabbyZNLk288oZdTdi0",
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick = () => {
    // axios
    //   .post("http://192.168.0.74:8001/oauth/token", this.state)
    //   .then(response => {
    //     console.log(response);
    //   });

    // "http://25.32.37.187:8000/api/login"
    axios
      .post(`${net}/api/register`, this.state, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDEyZjQyMjcyZTE5OWExM2YyNzA0Y2Q4YTE3YjFlNDg3ZmQwYThlNWU0MzJjZTgwZDYzNjQ3NGIyMTdkNTYzYTMxZDhiMTFmOTZkODgzMmIiLCJpYXQiOjE1ODE0MTg3MzUsIm5iZiI6MTU4MTQxODczNSwiZXhwIjoxNjEzMDQxMTM1LCJzdWIiOiIzNTIiLCJzY29wZXMiOltdfQ.Hvg-cVNaQ3ZgXqZjYwLsD0lLejop454e4SZSfMl-wkpJGRn6YWVwOw-aqUOHrs0wxvRDLyovzVCQhB77ZKyXgc_X06WM0m2fQLvUkvmXBIUM82uudIyAzh5Z2Xr4hfL3xjTpy6n5fkS6R7rgHMyXIBzRLW-uvj3LSsJTzNGoNBCHU9ZxG5ej-twsKwy5vOLECHI9XMgr3_zeEzh09-px1fEc-0hKXo06ijoZnmuWViLt11i7GHAKDsinBylp0e6Laek9-3-w5oLhubRJKs-z0zLZHKGYh_88wlQq1YFyfLz3Mv7WcnPUYwNjB54VnRa9yT0Awzw7tNCPaLYyFb9x6ftjrUBbaM6DL5jpf-qDMYiKdm2BOYUlPishwkb2Je2btckEF3AWmgyzhLYviCb2Dte-ncUm_CfecqrKyoO5Y8DL5S_bSaA8MqjMhvab63Gsc09Yc9JYFBe3AjfVJV513_OYsXePyrTyxTy_NDFL2hTpScCMkWgdFD9T-4jmo-fp6yxvPwiuJaKnw5L1hV_z36lEme-boCt-8dDx8PhDHGXiZAD_NZmY9J5ZY6YJJFo6pt7e2nkq_1-0UjrNCoo6Eg4k__IChT3GTV7LyNfXqzS5IOP84tivZsOxK7tsN1DdFMBICs8IWvx6NAcrpvIMmaXn9-R82GxRO6UAzjyLfWM`
        }
      })
      .then(response => {
        // return  response;
        console.log(response);
        this.props.history.push("SignIn");
      })
      .catch(error => {
        //return  error;
        console.log(error);
      });
  };

  render() {
    return (
      <Container className="text-center my-2" style={{ width: "600px" }}>
        <h3 style={{ color: "white" }} className="my-4">
          Welcome to registration page!
        </h3>

        <Form style={{ color: "white" }} className="mt-3">
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name..."
              name="name"
              onChange={this.handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name..."
              name="surname"
              onChange={this.handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email..."
              name="email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password..."
              name="password"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>

        <Button variant="primary" type="submit" onClick={this.handleClick}>
          Submit
        </Button>
      </Container>
    );
  }
}

export default Registration;
