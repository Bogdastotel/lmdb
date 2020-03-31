import React from "react";
// import { MyContext } from "./MyContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import $ from "jquery";
import "./navcss.css";
import HomeVideos from "./HomeVideos";
import axios from "axios";
import net from "./services";

window.React = React;

// const net = "http://192.168.0.74:8000";

// const net = "https://56831765.ngrok.io";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      url: `${net}/api/videos`,
      perPage: 20,
      genre: "",
      order: "",
      direction: "asc"
    };
  }

  componentDidMount() {
    this.loadVideosFromServer();

    // axios.get(`${net}/api/genres`).then(res => {
    //   console.log(res);
    // });
  }

  loadVideosFromServer() {
    $.ajax({
      url: this.state.url,
      data: { limit: this.state.perPage, offset: this.state.offset },
      dataType: "json",
      type: "GET",

      success: data => {
        this.setState({
          data: data.videos,
          pageCount: Math.ceil(data.total / 20)
        });
      },

      error: (xhr, status, err) => {
        console.error(this.state.url, status, err.toString()); // eslint-disable-line
      }
    });
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset }, () => {
      this.loadVideosFromServer();
    });
    window.scrollTo(0, 0);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOrderChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state.order)
    );
  };

  onGoClick = () => {
    if (this.state.genre === "" && this.state.order !== "") {
      axios
        .get(
          `${this.state.url}?offset=${this.state.offset}&limit=${this.state.perPage}&ord=${this.state.order}&dir=${this.state.direction}`
        )
        .then(res => {
          this.setState(
            {
              data: [...res.data.videos],
              pageCount: Math.ceil(res.data.total / 20)
            },
            () => console.log(res)
          );
        });
    } else if (this.state.genre !== "" && this.state.order === "") {
      axios
        .get(
          `${this.state.url}?offset=${this.state.offset}&limit=${this.state.perPage}&genre=${this.state.genre}&dir=${this.state.direction}`
        )
        .then(res => {
          this.setState(
            {
              data: [...res.data.videos],
              pageCount: Math.ceil(res.data.total / 20)
            },
            () => console.log(res)
          );
        });
    } else {
      axios
        .get(
          `${this.state.url}?offset=${this.state.offset}&limit=${this.state.perPage}&dir=${this.state.direction}`
        )
        .then(res => {
          this.setState(
            {
              data: [...res.data.videos],
              pageCount: Math.ceil(res.data.total / 20)
            },
            () => console.log(res)
          );
        });
    }
  };

  render() {
    return (
      <Container style={{ minHeight: "100vh" }}>
        {/* <MyContext.Consumer>
          {context =>
            context.authenticated && (
              <h3
                style={{ color: "white", marginLeft: "220px" }}
                className="mt-3"
              >
                Hello {context.name}, here is a list of latest added videos:
              </h3>
            )
          }
        </MyContext.Consumer> */}
        <Row>
          <Col
            style={{
              height: "100px",
              display: "inline-block",
              marginTop: "20px  "
            }}
          >
            <Form.Group>
              <Form.Label style={{ color: "white", textAlign: "center" }}>
                Select by genre
              </Form.Label>
              <Form.Control
                as="select"
                value={this.state.genre}
                onChange={this.handleChange}
                name="genre"
                style={{ width: "300px" }}
              >
                <option value="All">All</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Drama">Drama</option>
                <option value="Mystery">Mystery</option>
                <option value="Horror">Horror</option>
                <option value="Comedy">Comedy</option>
                <option value="Sports">Sports</option>
                <option value="Biography">Biography</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Thriller">Thriller</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col
            style={{
              height: "100px",
              marginTop: "20px"
            }}
          >
            <Form.Group>
              <Form.Label style={{ color: "white", textAlign: "center" }}>
                Order by:
              </Form.Label>
              <Form.Control
                as="select"
                value={this.state.order}
                onChange={this.handleChange}
                name="order"
                style={{ width: "300px" }}
              >
                <option value="All">All</option>
                <option value="name">Name</option>
                <option value="rating_avg">Rating</option>
                <option value="release_date">Release date</option>
                <option value="country">Country</option>
                <option value="created_at">Created at</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "20px"
                }}
              >
                Direction:
              </Form.Label>
              <Form.Control
                as="select"
                value={this.state.direction}
                onChange={this.handleChange}
                name="direction"
                style={{ width: "300px" }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col
            style={{
              display: "inline-block",
              marginTop: "20px",
              marginLeft: "10px"
            }}
          >
            <Button onClick={this.onGoClick} style={{ marginTop: "30px" }}>
              Search
            </Button>
          </Col>
        </Row>

        <HomeVideos data={this.state.data} />

        <Row className="justify-content-end">
          <Col xs="3"></Col>
          <Col>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              /* breakClassName={"break-me"} */
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
