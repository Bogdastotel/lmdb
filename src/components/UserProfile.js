import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { MyContext } from "./MyContext";
import ConfirmDeleteProfile from "./ConfirmDeleteProfile";
import net from "./services";

export default class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: "",
        surname: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
      },
      errorsForm: {
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        // newPassword_confirmation: ""
      },
      id: "",
      goodInput: false,
      userDeleted: false,
      editPassword: false,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(this.state.fields);

    if (user) {
      axios
        .get(`${net}/api/user`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          this.setState(
            {
              fields: {
                name: res.data.name,
                surname: res.data.surname,
                email: res.data.email,
              },

              id: res.data.id,
            },
            () => console.log(res)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  contactSubmit(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    !this.state.fields["newPassword"] !==
      this.state.fields["newPassword_confirmation"] &&
      axios
        .put(`${net}/api/users/${this.state.id}`, this.state.fields, {
          headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(
          (response) => {
            console.log(response);

            this.setState(
              {
                errorsForm: {
                  name: "",
                  email: "",
                  currentPassword: "",
                  newPassword: "",
                  confirmedPassword: "",
                },
              },
              () => alert("Succesfully updated profile ")
            );
          },
          (err) =>
            // console.log({ ...err })
            {
              this.setState({
                errorsForm: {
                  ...err.response.data.errors,
                },
              });
            }
        )
        .catch((error) => {
          //return  error;
          console.log(error);
        });
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleDel = () => {
    this.setState({
      deleteProfile: false,
    });
  };

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <Container className="text-center my-2" style={{ width: "600px" }}>
            <h3 style={{ color: "white" }} className="my-4">
              Edit profile
            </h3>

            <Form
              style={{ color: "white" }}
              className="mt-3"
              onSubmit={this.contactSubmit.bind(this)}
            >
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name..."
                  onChange={this.handleChange.bind(this, "name")}
                  value={this.state.fields["name"]}
                ></Form.Control>
                <span style={{ color: "red" }}>
                  {this.state.errorsForm["name"]}
                </span>
              </Form.Group>

              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name..."
                  value={this.state.fields["surname"]}
                  onChange={this.handleChange.bind(this, "surname")}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email..."
                  value={this.state.fields["email"]}
                  onChange={this.handleChange.bind(this, "email")}
                />
                <span style={{ color: "red" }}>
                  {this.state.errorsForm["email"]}
                </span>
              </Form.Group>

              <Button
                variant="warning"
                type="button"
                style={{ width: "100%" }}
                className="mt-4"
                onClick={() =>
                  this.setState((prevState) => ({
                    editPassword: !prevState.editPassword,
                  }))
                }
              >
                Edit Password
              </Button>

              {this.state.editPassword ? (
                <React.Fragment>
                  <Form.Group className="mt-4">
                    <Form.Label>Current password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.fields["currentPassword"] || ""}
                      onChange={this.handleChange.bind(this, "currentPassword")}
                    />
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      {this.state.errorsForm["currentPassword"]}
                    </span>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> New password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter the new password..."
                      value={this.state.fields["newPassword"] || ""}
                      onChange={this.handleChange.bind(this, "newPassword")}
                    />

                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      {this.state.errorsForm["newPassword"]}
                    </span>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Repeat new password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repeat the new password..."
                      value={
                        this.state.fields["newPassword_confirmation"] || ""
                      }
                      onChange={this.handleChange.bind(
                        this,
                        "newPassword_confirmation"
                      )}
                    />

                    {this.state.errorsForm["newPassword"] ? (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {this.state.errorsForm["newPassword"]}
                      </span>
                    ) : null}
                  </Form.Group>
                </React.Fragment>
              ) : null}

              <Button
                variant="primary"
                type="submit"
                style={{ width: "100%" }}
                className="mt-4 "
              >
                Submit
              </Button>
            </Form>

            {context.deleteProfile !== true ? (
              <Button
                variant="danger"
                type="submit"
                style={{ width: "100%" }}
                onClick={context.deleteCurrentUser}
                className="mt-4"
              >
                Delete Profile
              </Button>
            ) : (
              <div>
                <ConfirmDeleteProfile handleDel={context.deleteCurrentUser} />
              </div>
            )}
          </Container>
        )}
      </MyContext.Consumer>
    );
  }
}
