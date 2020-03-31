import React, { Component } from "react";
import $ from "jquery";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Movie from "./Movie";

export default class HomeVideos extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    let videosNodes = this.props.data.map(function(movie, index) {
      return (
        <Col xs={3} key={movie.id} className="my-2 text-primary  text-center">
          <Movie
            key={index}
            movie={movie.id}
            image={movie.poster}
            title={movie.name}
          />
          <Link
            style={{
              display: "block",
              padding: "10px",
              marginTop: "10px"
            }}
            to={`/SearchedMovieList/${movie.id}`}
          >
            View Details
          </Link>
        </Col>
      );
    });

    return (
      <Container>
        <Row>{videosNodes}</Row>
      </Container>
    );
  }
}
