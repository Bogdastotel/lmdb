import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MyContext } from "./MyContext";

class DirectorDetails extends Component {
  goBack = () => {
    this.props.history.push(`/TopMovies/${this.props.location.state.id}`);
  };

  render() {
    const { director } = this.props.location.state;
    return (
      <Container
        style={{
          paddingLeft: "20px",
          paddingTop: "20px",
          color: "white",
        }}
      >
        {console.log(director)}
        <h5 className=" mt-2 mb-4">{director[0].name}</h5>
        <h6 className=" mt-2 mb-4">Director</h6>

        <img
          style={{ height: "300px", display: "block", marginBottom: "20px" }}
          src={director[0].poster}
          alt="Ashleigh Grady"
        />
        <p style={{ color: "#B0B0B0" }}>{director[0].bio}</p>
        <p style={{ color: "#B0B0B0" }}>
          <strong style={{ color: "white" }}>Born: </strong>
          {director[0].birth_date} in{" "}
          <span style={{ color: "#B0B0B0" }}>{director[0].country}</span>
        </p>
        <Button variant="outline-primary" onClick={this.goBack}>
          Go back to video details
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

export default DirectorDetails;
