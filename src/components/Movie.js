import React, { Component } from "react";

import { Container } from "react-bootstrap";

// const imgStyle = {
//   border: "5px solid lightgray",
//   borderRadius: "5px",
//   color: "white"
// };

class Movie extends Component {
  changeBorderColorOnHover = e => {
    e.target.style.border = "5px solid #0275d8";
  };

  changeBorderColorOnLeaving = e => {
    e.target.style.border = "5px solid white";
  };

  render() {
    return (
      <Container>
        {this.props.title.length > 15 ? (
          <h6 style={{ color: "white", padding: "10px" }}>
            {this.props.title.substr(0, 20) + "... "}
          </h6>
        ) : (
          <h6 style={{ color: "white" }}>{this.props.title}</h6>
        )}
        <img
          src={this.props.image}
          alt="movie_image"
          width={200}
          height={300}
          onMouseOver={this.changeBorderColorOnHover}
          onMouseLeave={this.changeBorderColorOnLeaving}
          onError={e => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Martian_2014.jpg";
          }}
        />
        )}
      </Container>
    );
  }
}

export default Movie;
