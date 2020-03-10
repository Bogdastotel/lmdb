import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import star from "../assets/star.png";
import Pagination from "react-bootstrap/Pagination";
import { MyContext } from "./MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RatingsVideosContainer from "./RatingsVideosContainer";

const paddingTop = {
  paddingTop: "35px"
};

const net = "http://192.168.0.74:8000";

// const net = "https://ac239f73.ngrok.io";
toast.configure();

class TopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topMovies: [],
      activePage: 1,
      lastPage: null,
      total: 70,
      from: null,
      to: null,
      rating: 0,
      selectedVideoForRating: -1,
      ratedMovies: [],
      watchlist: []
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`${net}/api/videos/top`)
      .then(response => {
        this.setState(
          {
            topMovies: [...response.data.data],
            activePage: response.data.current_page,
            lastPage: response.data.last_page,
            total: response.data.total,
            from: response.data.from,
            to: response.data.to
          },
          () => console.log(response.data)
        );
      })
      .catch(function(error) {
        console.log(error);
      });

    if (user !== null) {
      axios
        .get(`${net}/api/user/watchlistId`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          }
        })
        .then(res => {
          this.setState(
            {
              watchlist: [...res.data.watchlist]
            },
            () => console.log(res.data)
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  notify = () => {
    toast.info("Basic notification");
  };

  changeRating = newRating => {
    const user = JSON.parse(localStorage.getItem("user"));
    //
    // "http://25.32.37.187:8000/api/user/rate"
    this.setState(
      {
        rating: newRating
      },
      () =>
        axios
          .post(
            `${net}/api/user/rate`,
            {
              video_id: this.state.selectedVideoForRating,
              rate: this.state.rating
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
              }
            }
          )
          .then(
            toast.info("You rated a video!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            })
          )
          .then(res => {
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          })
    );
  };

  deleteRating = movieId => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        `${net}/api/user/unrate`,
        {
          video_id: movieId
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .then(
        toast.error("You deleted a rating for this video!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        })
      )
      .then(res => {
        if (this.state.rating === 0) {
          this.setState({ selectedVideoForRating: -1 });
        } else {
          this.setState({ rating: 0 }, () => console.log(res));
        }
      })

      .catch(function(error) {
        console.log(error);
      });
  };

  selectForRating = movieId => {
    const user = JSON.parse(localStorage.getItem("user"));
    // "http://25.32.37.187:8000/api/user/rates2"
    this.setState(
      {
        selectedVideoForRating: movieId,
        rating: 0
      },
      () =>
        axios
          .post(
            `${net}/api/user/rates2`,
            { video_id: movieId },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
              }
            }
          )
          .then(res => {
            res.status === 404
              ? this.setState({
                  rating: 0,
                  selectedVideoForRating: movieId
                })
              : res.data.map(rated => {
                  if (rated.video_id === movieId) {
                    this.setState(
                      {
                        rating: rated.rate,
                        selectedVideoForRating: movieId
                      },
                      () => console.log(res)
                    );
                  }
                });
          })
          .catch(function(error) {
            console.log(error);
          })
    );
  };

  handleDel = () => {
    this.setState({
      selectedVideoForRating: -1
    });
    console.log("clicked outside");
  };

  addToWatchList = movieId => {
    const user = JSON.parse(localStorage.getItem("user"));

    let filteredWatchlist = this.state.watchlist.filter(
      video => video !== movieId
    );

    if (user !== null) {
      if (this.state.watchlist.includes(movieId)) {
        this.setState({ watchlist: filteredWatchlist }, () =>
          axios
            .post(
              `${net}/api/user/addToList`,
              {
                video_id: movieId
              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`
                }
              }
            )
            .then(res => {
              this.setState({
                watchlist: [...res.data.watchlist]
              });
            })
            .then(
              toast.error("You deleted a video from your watchlist!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
              })
            )
            .catch(function(error) {
              console.log(error);
            })
        );
      } else
        this.setState(
          {
            watchlist: [...this.state.watchlist, movieId]
          },
          () =>
            axios
              .post(
                `${net}/api/user/addToList`,
                {
                  video_id: movieId
                },
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                  }
                }
              )
              .then(res => {
                this.setState({
                  watchlist: [...res.data.watchlist]
                });
              })
              .then(
                toast.success("You added a video to your watchlist!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000
                })
              )
              .catch(function(error) {
                console.log(error);
              })
        );
    } else {
      this.props.history.push("signIn");
    }
  };

  firstPage = () => {
    axios
      .get(`${net}/api/videos/top?page=1`)
      .then(response => {
        this.setState(
          {
            topMovies: [...response.data.data],
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
      .get(`${net}/api/videos/top?page=${this.state.activePage + 1}`)
      .then(response => {
        this.setState(
          {
            topMovies: [...response.data.data],
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
      .get(`${net}/api/videos/top?page=${this.state.activePage - 1}`)
      .then(response => {
        this.setState(
          {
            topMovies: [...response.data.data],
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
      .get(`${net}/api/videos/top?page=${this.state.lastPage}`)
      .then(response => {
        this.setState(
          {
            topMovies: [...response.data.data],
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
    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            axios
              .get(`${net}/api/videos/top?page=${number}`)
              .then(response => {
                this.setState(
                  {
                    topMovies: [...response.data.data],
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
      <Container className="pb-3">
        <Table variant="dark" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Rank</th>
              <th>Movie poster</th>
              <th>Movie title</th>
              <th>IMDb rating</th>
              <th>Your rating</th>
              <th>Watchlist</th>
            </tr>
          </thead>
          <tbody>
            {this.state.topMovies.map((movie, index) => {
              return (
                <tr key={movie.id} className="text-center">
                  <td style={paddingTop}>{this.state.from + index}</td>
                  <td>
                    <Link
                      style={{ color: "white" }}
                      to={`/TopMovies/${movie.id}`}
                    >
                      <img
                        src={movie.poster}
                        alt="movie_poster"
                        style={{ width: "50px" }}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Martian_2014.jpg";
                        }}
                      />
                    </Link>
                  </td>
                  <td style={paddingTop}>
                    <Link
                      style={{ color: "white" }}
                      to={`/TopMovies/${movie.id}`}
                    >
                      {movie.name}
                    </Link>
                  </td>
                  <td style={paddingTop}>
                    <img
                      src={star}
                      style={{ width: "20px", marginRight: "10px" }}
                      alt="movie"
                    ></img>
                    {movie.rating_avg}
                  </td>
                  <td style={paddingTop}>
                    <MyContext.Consumer>
                      {context =>
                        context.authenticated ? (
                          this.state.selectedVideoForRating !== movie.id ? (
                            <React.Fragment>
                              <FontAwesomeIcon
                                data-tip="Click to rate the video"
                                icon={faStar}
                                size="2x"
                                style={{ color: "#D1C547", cursor: "pointer" }}
                                onClick={() => this.selectForRating(movie.id)}
                              ></FontAwesomeIcon>

                              <ReactTooltip place="bottom" effect="solid" />
                            </React.Fragment>
                          ) : (
                            <RatingsVideosContainer
                              movie={movie.id}
                              handleDel={this.handleDel}
                              rating_avg={movie.rating_avg}
                              rating={this.state.rating}
                              changeRating={this.changeRating}
                              deleteRating={this.deleteRating}
                            />
                          )
                        ) : (
                          <Link
                            to={{
                              pathname: "/SignIn",
                              state: { from: this.props.location }
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon
                              data-tip="Sign in to rate the video"
                              icon={faStar}
                              size="2x"
                              style={{ color: "#D1C547", cursor: "pointer" }}
                              onClick={() => this.selectForRating(movie.id)}
                            ></FontAwesomeIcon>
                            <ReactTooltip place="bottom" effect="solid" />
                          </Link>
                        )
                      }
                    </MyContext.Consumer>
                  </td>
                  <td style={{ paddingTop: "35px", paddingRight: "35px" }}>
                    {this.state.watchlist.includes(movie.id) ? (
                      <FontAwesomeIcon
                        key={movie.id}
                        data-tip="Click to add to Watchlist"
                        icon={faCheckSquare}
                        size="2x"
                        style={{
                          color: "lightgreen",
                          display: "inline-block",
                          marginLeft: "2rem",
                          cursor: "pointer"
                        }}
                        onClick={() => this.addToWatchList(movie.id)}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        key={movie.id}
                        data-tip="Click to add to Watchlist"
                        icon={faPlusSquare}
                        size="2x"
                        style={{
                          color: "lightblue",
                          display: "inline-block",
                          marginLeft: "2rem",
                          cursor: "pointer"
                        }}
                        onClick={() => this.addToWatchList(movie.id)}
                      ></FontAwesomeIcon>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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

export default TopMovies;
