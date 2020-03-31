import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

const Episodes = props => {
  return (
    <div key={props.number}>
      <Form.Group>
        <Form.Label style={{ color: "white" }}>
          Season {props.number + 1} episodes
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={`Enter season ${props.number + 1} episodes`}
          onChange={e => props.onChange(props.number, e.target.value)}
          value={props.episodesPerSeason}
        />
      </Form.Group>
    </div>
  );
};

class Seasons extends Component {
  render() {
    let elements = new Array(+this.props.numberOfSeasons || 0).fill(1);
    return elements.map((e, index) => (
      <Episodes
        onChange={this.props.onChange}
        number={index}
        value={this.props.value}
        key={index}
      />
    ));
  }
}

class FormPage1 extends Component {
  renderSeasonInputs = () => {
    if (this.props.video_type_id !== 1 && this.props.seasons <= 30) {
      return (
        <Seasons
          onChange={this.props.onChangeEpisodes}
          numberOfSeasons={this.props.seasons}
          value={this.props.episodesPerSeason}
        />
      );
    }
  };
  render() {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Video type</Form.Label>
          <Form.Control
            as="select"
            value={this.props.video_type_id}
            onChange={this.props.onChange}
            name="video_type_id"
          >
            <option value={1}>Movie</option>
            <option value={2}>Tv Show</option>
          </Form.Control>
        </Form.Group>
        {this.props.video_type_id !== "1" ? (
          <div>
            <Form.Group>
              <Form.Label style={{ color: "white" }}>
                Enter the number of Seasons
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Seasons"
                name="seasons"
                onChange={this.props.onChange}
                value={this.props.seasons}
              />
            </Form.Group>
          </div>
        ) : null}

        {this.props.video_type_id !== 1 ? this.renderSeasonInputs() : null}

        {/* <h1>{this.props.mpaa_rating}</h1> */}
        <p>
          <Button variant="outline-primary" onClick={this.props.nextStep}>
            Next step
          </Button>
        </p>
      </div>
    );
  }
}

export default FormPage1;
