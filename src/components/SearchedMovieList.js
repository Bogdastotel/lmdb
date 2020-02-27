import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "./Movie";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

class SearchedMovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedMovies: [],
      term: this.props.location.state.term,
      activePage: null,
      lastPage: null,
      total: 70,
      from: null,
      to: null
    };
  }

  componentDidMount() {
    axios
      .get(
        // `http://192.168.0.74:8000/api/search/video?query=${this.state.term}`
        `http://25.32.37.187:8000/api/videos/search?query=${this.state.term}`
        // `http://25.64.100.106:8000/api/videos/search?query=${this.state.term}`
      )
      .then(res => {
        this.setState({
          searchedMovies: [...res.data.data],
          activePage: res.data.current_page,
          lastPage: res.data.last_page,
          total: res.data.total,
          from: res.data.from,
          to: res.data.to
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      console.log("... prevProps.key", prevProps.location.key);
      console.log("... this.props.key", this.props.location.key);
      axios
        .get(
          // `http://192.168.0.74:8000/api/search/video?query=${this.state.term}`
          `http://25.32.37.187:8000/api/videos/search?query=${this.props.location.state.term}`
          // `http://25.64.100.106:8000/api/videos/search?query=${this.state.term}`
        )
        .then(res => {
          this.setState({
            searchedMovies: [...res.data.data],
            activePage: res.data.current_page,
            lastPage: res.data.last_page,
            total: res.data.total,
            from: res.data.from,
            to: res.data.to
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  firstPage = () => {
    axios
      .get(
        `http://25.32.37.187:8000/api/videos/search?query=${this.state.term}&page=1`
      )
      .then(response => {
        this.setState(
          {
            searchedMovies: [...response.data.data],
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
      .get(
        `http://25.32.37.187:8000/api/videos/search?query=${
          this.state.term
        }&page=${this.state.activePage + 1}`
      )
      .then(response => {
        this.setState(
          {
            searchedMovies: [...response.data.data],
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
      .get(
        `http://25.32.37.187:8000/api/videos/search?query=${
          this.state.term
        }&page=${this.state.activePage - 1}`
      )
      .then(response => {
        this.setState(
          {
            searchedMovies: [...response.data.data],
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
      .get(
        `http://25.32.37.187:8000/api/videos/search?query=${this.state.term}&page=${this.state.lastPage}`
      )
      .then(response => {
        this.setState(
          {
            searchedMovies: [...response.data.data],
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
              .get(
                `http://25.32.37.187:8000/api/videos/search?query=${this.state.term}&page=${number}`
              )
              .then(response => {
                this.setState(
                  {
                    searchedMovies: [...response.data.data],
                    activePage: response.data.current_page,
                    from: response.data.from,
                    to: response.data.to
                  },
                  () => console.log(response.data)
                );

                console.log(response.data);
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
      <Container style={{ backgroundColor: "#1D1D1D", minHeight: "100vh" }}>
        <Row className="justify-content-center">
          {this.state.searchedMovies.map(movie => {
            return (
              <Col xs={3} key={movie.id} className="my-2 text-center">
                <Movie key={movie.id} image={movie.poster} title={movie.name} />

                <Link
                  style={{ display: "block", padding: "10px" }}
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
            <Pagination style={{ paddingLeft: "50px" }}>
              <Pagination.First onClick={this.firstPage} />
              <Pagination.Prev onClick={this.previousPage} />
              {items}
              <Pagination.Next onClick={this.nextPage} />
              <Pagination.Last onClick={this.lastPage} />
            </Pagination>
          </Col>
          <Col md="4"></Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SearchedMovieList);
