import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { MyContext } from "./MyContext";
// import { Redirect } from "react-router-dom";

class MyProvider extends React.Component {
  state = {
    authenticated: false,
    email: "",
    password: "",
    name: "",
    admin: 1
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.setState({
        authenticated: true,
        admin: user.admin,
        name: user.name
      });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  login = e => {
    e.preventDefault();

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    // "http://25.32.37.187:8000/api/login"
    axios
      .post("http://25.32.37.187:8000/api/login", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        // return  response;
        console.log(response);
        this.setState(
          {
            authenticated: true,
            email: response.data.user.email,
            name: response.data.user.name,
            admin: response.data.user.role_id
          },

          localStorage.setItem(
            "user",
            JSON.stringify({
              token: response.data.access_token,
              name: response.data.user.name,
              admin: response.data.user.role_id
            })
          )
        );

        // browserHistory.push();
        this.props.history.push(from);
      })
      .catch(error => {
        //return  error;
        console.log(error);
      });
  };

  logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("http://25.32.37.187:8000/api/logout", "", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          authenticated: false,
          name: "",
          admin: 1
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    localStorage.removeItem("user");
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          authenticated: this.state.authenticated,
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          admin: this.state.admin,
          logout: this.logout,
          login: this.login,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default withRouter(MyProvider);
