import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import star from "../assets/star.png";
import { MyContext } from "./MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteVideoFromWatchList from "./DeleteVideoFromWatchList";
import RatingsVideosContainer from "./RatingsVideosContainer";
import net from "./services";

// import { dom } from "@fortawesome/fontawesome-svg-core";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

const paddingTop = {
  paddingTop: "35px"
};

// const net = "http://192.168.0.74:8000";

// const net = "https://1321eac5.ngrok.io";

// const net = "https://ac239f73.ngrok.io";

export default class Watchlist extends Component {
  state = {
    watchlist: [[{}]],
    deletedVideo: false,
    selectedVideoForDelete: -1,
    selectedVideoForRating: -1,
    rating: 0
  };

  componentDidMount() {
    //

    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`${net}/api/user/list2`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          watchlist: res.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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

  handleWatchListDelete = movieId => {
    const user = JSON.parse(localStorage.getItem("user"));

    let filteredWatchlist = this.state.watchlist.filter(
      video => video.id !== movieId
    );

    this.setState(
      {
        watchlist: filteredWatchlist
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
              watchlist: [...res.data]
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

    console.log(filteredWatchlist);
  };

  handleWatchList = movieId => {
    this.setState({
      selectedVideoForDelete: movieId
    });
  };

  handleDel = () => {
    this.setState({
      selectedVideoForDelete: -1,
      selectedVideoForRating: -1
    });
  };

  render() {
    return (
      <Container>
        {/* <div style={{ color: "white", textAlign: "center" }}>Hello Sparta</div>; */}
        <React.Fragment>
          <MyContext.Consumer>
            {context => (
              <h2 style={{ color: "white" }} className="mt-3">
                Hi {context.name}
              </h2>
            )}
          </MyContext.Consumer>

          {this.state.watchlist.length < 1 ? (
            <h3 style={{ color: "white" }} className="mt-3">
              You currently have no movies added to your watchlist!
            </h3>
          ) : (
            <h3 style={{ color: "white" }} className="mt-3">
              Here is your Watchlist:
            </h3>
          )}
        </React.Fragment>

        {this.state.watchlist.length < 1 ? null : (
          <Table
            /* ref={deleteNode => (this.deleteNode = deleteNode)} */
            variant="dark"
            striped
            bordered
            hover
            className="mt-4"
          >
            <thead>
              <tr className="text-center">
                <th>Rank</th>
                <th>Movie poster</th>
                <th>Movie title</th>
                <th>IMDb rating</th>
                <th>Your rating</th>
                <th>Watchlist </th>
              </tr>
            </thead>
            <tbody>
              {this.state.watchlist.map((movie, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td style={paddingTop}>{index + 1}</td>
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
                      {/* {this.state.ratings.map(
                      rate => rate.id === movie.id && rate.rating_avg
                    )}{" "} */}

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
                                  style={{
                                    color: "#D1C547",
                                    cursor: "pointer"
                                  }}
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
                      {this.state.selectedVideoForDelete !== movie.id ? (
                        <FontAwesomeIcon
                          key={movie.id}
                          icon={faTrashAlt}
                          size="2x"
                          style={{
                            color: "lightblue",
                            display: "inline-block",
                            marginLeft: "2rem",
                            cursor: "pointer"
                          }}
                          onClick={() => this.handleWatchList(movie.id)}
                        ></FontAwesomeIcon>
                      ) : (
                        <div>
                          <DeleteVideoFromWatchList
                            movie={movie.id}
                            handleDel={this.handleDel}
                            handleWatchListDelete={this.handleWatchListDelete}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    );
  }
}
