import React, { Component } from "react";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// const imgStyle = {
//   border: "5px solid lightgray",
//   borderRadius: "5px",
//   color: "white"
// };

class Movie extends Component {
  state = {
    hovered: false
  };
  changeBorderColorOnHover = e => {
    e.target.style.border = "5px solid #0275d8";
  };

  changeBorderColorOnLeaving = e => {
    e.target.style.border = "5px solid white";
  };

  render() {
    return (
      <Container>
        {this.props.title.length > 10 ? (
          <h6
            style={{
              color: "white",
              padding: "10px",
              marginBottom: "20px"
            }}
          >
            {this.props.title.substr(0, 20) + "... "}
          </h6>
        ) : (
          <h6 style={{ color: "white", lineHeight: "2.2" }}>
            {this.props.title}
          </h6>
        )}
        <Link to={`/SearchedMovieList/${this.props.movie}`}>
          <img
            src={this.props.image}
            alt="movie_image"
            width={200}
            height={300}
            style={{
              transform: `${
                this.state.hovered ? "scale(1.1,1.1)" : "scale(1,1)"
              }`,
              border: this.state.hovered
                ? "5px solid #e3d800"
                : "5px solid white"
            }}
            onMouseOver={() => this.setState({ hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Martian_2014.jpg";
            }}
          />
        </Link>
      </Container>
    );
  }
}

export default Movie;
