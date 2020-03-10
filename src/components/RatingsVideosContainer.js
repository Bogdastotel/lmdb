import React, { Component } from "react";
import RatingsVideos from "./RatingsVideos";
import deleteRatings from "../assets/deleteRatings.png";
import onClickOutside from "react-onclickoutside";

class RatingsVideosContainer extends Component {
  deleteRating = movie => {
    this.props.deleteRating(movie);
  };

  handleClickOutside = evt => {
    this.props.handleDel();
  };

  render() {
    return (
      <div>
        <RatingsVideos
          handleDel={this.props.handleDel}
          rating_avg={this.props.rating_avg}
          rating={this.props.rating}
          changeRating={this.props.changeRating}
        />

        <div
          style={{ display: "inline-block" }}
          onClick={() => this.deleteRating(this.props.movie)}
        >
          <img
            src={deleteRatings}
            style={{
              width: "20px",
              marginLeft: "1rem",
              cursor: "pointer",
              paddingTop: "4px"
            }}
            alt="deleteRatings"
          />
        </div>
      </div>
    );
  }
}
export default onClickOutside(RatingsVideosContainer);
