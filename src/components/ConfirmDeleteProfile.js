import React, { Component } from "react";
import { MyContext } from "./MyContext";
import Button from "react-bootstrap/Button";
import onClickOutside from "react-onclickoutside";

class ConfirmDeleteProfile extends Component {
  handleClickOutside = evt => {
    this.props.handleDel();
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Button
            variant="danger"
            type="submit"
            style={{ width: "100%" }}
            onClick={context.confirmDeleteCurrentUser}
            className="mt-4"
          >
            Are you sure you want to delete your profile?
          </Button>
        )}
      </MyContext.Consumer>
    );
  }
}

export default onClickOutside(ConfirmDeleteProfile);
