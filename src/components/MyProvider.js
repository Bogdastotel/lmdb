import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { MyContext } from "./MyContext";
import net from "./services";

class MyProvider extends React.Component {
  state = {
    authenticated: false,
    email: "",
    password: "",
    name: "",
    admin: 1,
    loggedUserName: "",
    id: "",
    deleteProfile: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      // this.setState({
      //   authenticated: true,
      //   admin: user.admin,
      //   name: user.name,
      //   id: user.id
      // });

      // `${net}/api/user`
      axios
        .get(`${net}/api/user`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          this.setState({
            authenticated: true,
            admin: response.data.role_id,
            name: response.data.name,
            id: response.data.id,
          });
        });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    // `${net}/api/login`

    // "http://25.32.37.187:8000/api/login"
    axios
      .post(`${net}/api/login`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // return  response;
        console.log(response);
        this.setState(
          {
            authenticated: true,
            email: response.data.user.email,
            name: response.data.user.name,
            admin: response.data.user.role_id,
            id: response.data.user.id,
          },
          () =>
            localStorage.setItem(
              "user",
              JSON.stringify({
                token: response.data.access_token,
                name: response.data.user.name,
                admin: response.data.user.role_id,
                id: response.data.user.id,
              })
            )
        );

        // browserHistory.push();
        this.props.history.push(from);
      })
      .catch((error) => {
        //return  error;
        console.log(error);
      });
  };

  logout = () => {
    // `${net}/api/logout`
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(`${net}/api/logout`, "", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          authenticated: false,
          name: "",
          admin: 1,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    localStorage.removeItem("user");
  };

  deleteCurrentUser = () => {
    this.setState((prevState) => ({
      deleteProfile: !prevState.deleteProfile,
    }));
  };

  confirmDeleteCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // `${net}/api/users/${this.state.id}`
    axios
      .delete(`${net}/api/users/${this.state.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);

        this.setState(
          {
            authenticated: false,
            name: "",
            admin: 1,
            deleteProfile: false,
          },
          () => localStorage.removeItem("user")
        );
      })
      .then(this.props.history.push("SignIn"))
      .catch((error) => {
        //return  error;
        console.log(error);
      });

    alert("Profile succesfully deleted!");
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          authenticated: this.state.authenticated,
          email: this.state.email,
          password: this.state.password,
          deleteProfile: this.state.deleteProfile,
          name: this.state.name,
          admin: this.state.admin,
          logout: this.logout,
          login: this.login,
          handleChange: this.handleChange,
          deleteCurrentUser: this.deleteCurrentUser,
          confirmDeleteCurrentUser: this.confirmDeleteCurrentUser,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default withRouter(MyProvider);
