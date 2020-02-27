import React, { Component } from "react";

import Ratings from "react-ratings-declarative";

class RatingsVideos extends Component {
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
