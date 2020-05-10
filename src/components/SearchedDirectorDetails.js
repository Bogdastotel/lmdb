import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MyContext } from "./MyContext";

// searched director component

class SearchedDirectorDetails extends Component {
  goBack = () => {
    this.props.history.push(
      `/SearchedMovieList/${this.props.location.state.id}`
    );
  };

  render() {
    const { director } = this.props.location.state;
    return (
      <Container
        style={{
          paddingLeft: "20px",
          paddingTop: "20px",
          color: "#B0B0B0",
        }}
      >
        {console.log(director)}
        <h5 style={{ color: "white" }} className=" mt-2 mb-4">
          {director[0].name}
        </h5>
        <h6 style={{ color: "white" }} className=" mt-2 mb-4">
          Director
        </h6>

        <img
          style={{ height: "300px", display: "block", marginBottom: "20px" }}
          src={director[0].poster}
          alt="Ashleigh Grady"
        />
        <p>{director[0].bio}</p>
        <p>
          <strong style={{ color: "white" }}>Born: </strong>
          {director[0].birth_date} in <span>{director[0].country}</span>
        </p>
        <Button variant="outline-primary" onClick={this.goBack}>
          Go back
        </Button>

        <MyContext.Consumer>
          {(context) =>
            context.admin === 2 ? (
              <Button
                variant="success"
                className="ml-4"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/EditDirector",
                    state: {
                      director: director[0],
                    },
                  })
                }
              >
                Edit Director's info
              </Button>
            ) : null
          }
        </MyContext.Consumer>
      </Container>
    );
  }
}

export default SearchedDirectorDetails;
