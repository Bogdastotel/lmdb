import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HomeVideos from "./HomeVideos";
import $ from "jquery";
import ReactPaginate from "react-paginate";
import net from "./services";
window.React = React;

class SearchedMovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      perPage: 20,
      url: `${net}/api/videos/search?query=${this.props.location.state.term}`,
      term: this.props.location.state.term,
    };
  }

  componentDidMount() {
    console.log(this.state.term);
    this.loadVideosFromServer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      console.log("... prevProps.key", prevProps.location.key);
      console.log("... this.props.key", this.props.location.key);
      this.loadVideosFromServer();
    }
  }

  loadVideosFromServer() {
    $.ajax({
      url: `${net}/api/videos/search?query=${this.props.location.state.term}`,
      data: { limit: this.state.perPage, offset: this.state.offset },
      dataType: "json",
      type: "GET",

      success: (data) => {
        this.setState(
          {
            data: data.videos,
            pageCount: Math.ceil(data.total / 20),
          },
          () => console.log(this.state.data)
        );
      },

      error: (xhr, status, err) => {
        console.error(this.state.url, status, err.toString()); // eslint-disable-line
      },
    });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset }, () => {
      this.loadVideosFromServer();
    });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <Container>
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

export default withRouter(SearchedMovieList);
