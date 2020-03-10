import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class FormPage2 extends Component {
  render() {
    return (
      <React.Fragment>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Video name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter video name"
            name="name"
            onChange={this.props.onChange}
            value={this.props.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Video poster file</Form.Label>

          <input
            type="file"
            onChange={this.props.fileSelectedHandler}
            className="form-control-file bg-white p-1 rounded"
            name="file"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ color: "white" }}>Video mpaa rating</Form.Label>
          <Form.Control
            as="select"
            value={this.props.mpaa_rating}
            onChange={this.props.onChange}
            name="mpaa_rating"
          >
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="A">A</option>
            <option value="R">R</option>
            <option value="NR">NR</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Video duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the video's duration in minutes"
            value={this.props.duration_in_minutes}
            onChange={this.props.onChange}
            name="duration_in_minutes"
          />
        </Form.Group>
        {/* <h1>{this.props.plot}</h1> */}
        <Form.Group>
          <Form.Label style={{ color: "white" }}>
            Videos release date
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the video's release date"
            value={this.props.release_date}
            name="release_date"
            onChange={this.props.onChange}
          />
          <Form.Text className="text-primary">example "1972-02-04"</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ color: "white" }}>
            Video country origin
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the video's country origin "
            value={this.props.country}
            onChange={this.props.onChange}
            name="country"
          />
          <Form.Text className="text-primary">example "Serbia"</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ color: "white" }}>Video's plot'</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Enter the video's plot (overview)"
            name="plot"
            value={this.props.plot}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Button variant="outline-primary" onClick={this.props.previousStep}>
          Previous step
        </Button>
        <p className="my-3">
          <Button variant="primary" onClick={this.props.nextStep}>
            Next step
          </Button>
        </p>
      </React.Fragment>
    );
  }
}

export default FormPage2;
