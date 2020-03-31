import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";

class FormPage3 extends Component {
  render() {
    const genres = this.props.genres.map(genre => {
      return {
        value: genre.id,
        label: genre.name
      };
    });

    const artists = this.props.artists.map(artist => {
      return {
        value: artist.id,
        label: artist.name
      };
    });

    const directors = this.props.directors.map(director => {
      return {
        value: director.id,
        label: director.name
      };
    });

    return (
      <div style={{ minHeight: "100vh" }}>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Group>
            <Form.Label style={{ color: "white" }}>Video trailer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the link of the video trailer"
              name="trailer"
              onChange={this.props.onChange}
              value={this.props.trailer}
            />
            <Form.Text className="text-primary">
              Needs to start with: https://www.youtube.com/embed/
            </Form.Text>
          </Form.Group>

          <Form.Label style={{ color: "white" }}>Select Genre(s)</Form.Label>

          <Select
            isMulti
            name="genres"
            options={genres}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.props.handleChangeGenres}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Select Director</Form.Label>
          <Select
            options={directors}
            className="basic-single"
            classNamePrefix="select"
            name="director_id"
            onChange={this.props.handleChangeDirectors}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ color: "white" }}>Select Actors</Form.Label>
          <Select
            defaultValue={"Filip"}
            isMulti
            name="artists"
            options={artists}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.props.handleChangeActors}
          />
        </Form.Group>

        <Button variant="outline-primary" onClick={this.props.previousStep}>
          Previous step
        </Button>
        <p className="my-3">
          <Button
            onClick={this.props.formUpload}
            variant="primary"
            type="submit"
          >
            Submit Video
          </Button>
        </p>
      </div>
    );
  }
}

export default FormPage3;
