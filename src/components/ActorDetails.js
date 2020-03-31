import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class ActorDetails extends Component {
  goBack = () => {
    this.props.history.push(`/TopMovies/${this.props.location.state.id}`);
  };

  render() {
    const { artist } = this.props.location.state;
    return (
      <Container
        style={{
          paddingLeft: "20px",
          paddingTop: "20px",
          color: "#B0B0B0"
        }}
      >
        {console.log(artist)}
        <h5 style={{ color: "white" }} className=" mt-2 mb-4">
          {artist.name}
        </h5>
        <h6 style={{ color: "white" }} className=" mt-2 mb-4">
          {" "}
          {artist.artist_type_id === 1 ? "Actor" : " Actor & Director"}
        </h6>

        <img
          style={{ height: "300px", display: "block", marginBottom: "20px" }}
          src={artist.poster}
          alt="Ashleigh Grady"
        />
        <p>{artist.bio}</p>
        <p>
          <strong style={{ color: "white" }}>Born: </strong>
          {artist.birth_date} in <span>{artist.country}</span>
        </p>
        <Button variant="outline-primary" onClick={this.goBack}>
          Go back to video details
        </Button>
        <Button
          variant="success"
          className="ml-4"
          onClick={() =>
            this.props.history.push({
              pathname: "/EditActor",
              state: {
                artist: artist
              }
            })
          }
        >
          Edit Actor info
        </Button>
      </Container>
    );
  }
}

export default ActorDetails;
