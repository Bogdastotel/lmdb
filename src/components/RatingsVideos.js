import React, { Component } from "react";
// import onClickOutside from "react-onclickoutside";
import Ratings from "react-ratings-declarative";

class RatingsVideos extends Component {
  // handleClickOutside = evt => {
  //   this.props.handleDel();
  // };
  render() {
    return (
      <Ratings
        rating={this.props.rating_avg === null ? 0 : this.props.rating}
        widgetDimensions="15px"
        widgetSpacings="10px"
        changeRating={this.props.changeRating}
      >
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
        <Ratings.Widget widgetRatedColor="yellow" widgetHoverColor="blue" />
      </Ratings>
    );
  }
}

export default RatingsVideos;

// export default onClickOutside(RatingsVideos);
