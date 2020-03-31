import React from "react";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./navcss.css";
import { Form, FormControl, Button } from "react-bootstrap";
import imdb_logo from "../assets/imdb_logo.png";
import { MyContext } from "./MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

// import Cookies from "js-cookie";

// const getAccessToken = Cookies.get("user");

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchedMovies: [],
      term: ""
      // activePage: null,
      // lastPage: null,
      // total: 70,
      // from: null,
      // to: null
    };
  }

  handleChange = e => {
    this.setState({
      term: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (this.state.term !== "") {
      this.props.history.push({
        pathname: "/SearchedMovieList",
        state: {
          term: this.state.term
        }
      });
      // window.location.reload(false);
    }

    // console.log(this.state.term);
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.state.term !== "") {
        this.props.history.push({
          pathname: "/SearchedMovieList",
          state: {
            term: this.state.term
          }
        });
        // window.location.reload(false);
      }
    }
  };
  render() {
    return (
      <Navbar
        style={{
          backgroundColor: "#02122b",
          fontFamily: "Josefin Sans"
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={imdb_logo} width="80" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Menu
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="span">
                    {" "}
                    <Link to="/">Home</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="span">
                    {" "}
                    <Link to="/TopMovies">Top Movies</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form onKeyPress={this.handleKeyPress} inline className="ml-2 mr-2">
              <FormControl
                type="text"
                value={this.state.term}
                onChange={this.handleChange}
                placeholder="Search for movies, tv shows or actors"
                className="mr-sm-2"
                style={{ width: "400px" }}
              />
              <Button
                onClick={this.handleClick}
                variant="outline-primary"
                style={{ fontWeight: "500", letterSpacing: "2px" }}
              >
                Search
              </Button>
            </Form>
            <MyContext.Consumer>
              {context => (
                <React.Fragment>
                  <React.Fragment>
                    {context.authenticated ? (
                      <FontAwesomeIcon
                        style={{ color: "blue" }}
                        /* size="2x" */
                        icon={faUser}
                      />
                    ) : null}
                    <Link to="/UserProfile" className="ml-2">
                      {context.name}
                    </Link>
                  </React.Fragment>

                  <React.Fragment>
                    {context.authenticated ? (
                      <React.Fragment>
                        <FontAwesomeIcon
                          style={{ color: "blue" }}
                          /* size="2x" */
                          className="ml-3"
                          icon={faPlusSquare}
                        />
                        <Link to="/Watchlist" className="ml-2">
                          Watchlist
                        </Link>
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                </React.Fragment>
              )}
            </MyContext.Consumer>
            <MyContext.Consumer>
              {context =>
                context.admin === 2 ? (
                  <Link
                    style={{ color: "white" }}
                    className="ml-4 navLinks"
                    to="/Admin"
                  >
                    Admin Page
                  </Link>
                ) : null
              }
            </MyContext.Consumer>
            <MyContext.Consumer>
              {context => (
                <React.Fragment>
                  {context.authenticated === true ? (
                    <Link
                      style={{ color: "white" }}
                      className="ml-4 navLinks"
                      to="/"
                      onClick={context.logout}
                    >
                      Sign out
                    </Link>
                  ) : (
                    <Link
                      style={{ color: "white" }}
                      className="ml-2 navLinks"
                      to="/SignIn"
                    >
                      Sign in
                    </Link>
                  )}
                </React.Fragment>
              )}
            </MyContext.Consumer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(NavigationBar);
