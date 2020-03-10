import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class DeleteVideoFromWatchList extends Component {
  handleClickOutside = evt => {
    this.props.handleDel();
  };
  render() {
    return (
      <div>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => this.props.handleWatchListDelete(this.props.movie)}
          className="ml-4"
        >
          Delete?{" "}
        </h5>
      </div>
    );
  }
}

export default onClickOutside(DeleteVideoFromWatchList);

// export default DeleteVideoFromWatchList;
