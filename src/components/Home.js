import React from "react";
import { MyContext } from "./MyContext";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "./Movie";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

const net = "http://192.168.0.74:8000";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      latestMovies: [],
      activePage: null,
      lastPage: null,
      total: 70,
      from: null,
      to: null
    };
  }

  componentDidMount() {
    axios.get(`${net}/api/videos`).then(res => {
      this.setState(
        {
          latestMovies: [...res.data.data],
          activePage: res.data.current_page,
          lastPage: res.data.last_page,
          total: res.data.total,
          from: res.data.from,
          to: res.data.to
        },
        () => console.log(res)
      );
    });
  }

  firstPage = () => {
    axios
      .get(`${net}/api/videos?page=1`)
      .then(response => {
        this.setState(
          {
            latestMovies: [...response.data.data],
            activePage: 1,
            from: response.data.from,
            to: response.data.to
          },
          () => console.log(response.data)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    window.scrollTo(0, 0);
  };

  nextPage = () => {
    axios
      .get(`${net}/api/videos?page=${this.state.activePage + 1}`)
      .then(response => {
        this.setState(
          {
            lastestMovies: [...response.data.data],
            activePage: this.state.activePage + 1,
            from: response.data.from,
            to: response.data.to
          },
          () => console.log(response.data)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    window.scrollTo(0, 0);
  };

  previousPage = () => {
    axios
      .get(`${net}/api/videos?page=${this.state.activePage - 1}`)
      .then(response => {
        this.setState(
          {
            lastestMovies: [...response.data.data],
            activePage: this.state.activePage - 1,
            from: response.data.from,
            to: response.data.to
          },
          () => console.log(response.data)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    window.scrollTo(0, 0);
  };

  lastPage = () => {
    axios
      .get(`${net}/api/videos?page=${this.state.lastPage}`)
      .then(response => {
        this.setState(
          {
            lastestMovies: [...response.data.data],
            activePage: response.data.last_page,
            from: response.data.from,
            to: response.data.to
          },
          () => console.log(response.data)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
    window.scrollTo(0, 0);
  };

  render() {
    let active = this.state.activePage;
    let items = [];
    for (let number = 1; number <= this.state.lastPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            axios
              .get(`${net}/api/videos?page=${number}`)
              .then(response => {
                this.setState(
                  {
                    latestMovies: [...response.data.data],
                    activePage: response.data.current_page,
                    from: response.data.from,
                    to: response.data.to
                  },
                  () => console.log(response.data)
                );
              })
              .catch(function(error) {
                console.log(error);
              });
            window.scrollTo(0, 0);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <Container style={{ minHeight: "100vh" }}>
        <MyContext.Consumer>
          {context => (
            <h3
              style={{ color: "white", marginLeft: "220px" }}
              className="mt-3"
            >
              Hello {context.name}, here is a list of latest added videos:
            </h3>
          )}
        </MyContext.Consumer>
        <Row className="justify-content-center">
          {this.state.latestMovies.map(movie => {
            return (
              <Col xs={3} key={movie.id} className="my-2  text-center">
                <Movie
                  key={movie.id}
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
          })}
        </Row>
        <Row className="justify-content-center">
          <Col md="4"></Col>
          <Col md="4">
            {/* {items.length > 1 && (
              <Pagination style={{ paddingLeft: "10px" }}>
                <Pagination.First onClick={this.firstPage} />
                <Pagination.Prev onClick={this.previousPage} />
                {items}
                <Pagination.Next onClick={this.nextPage} />
                <Pagination.Last onClick={this.lastPage} />
              </Pagination>
            )} */}
          </Col>
          <Col md="4"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
