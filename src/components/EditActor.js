import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import net from "./services";

class EditActor extends Component {
  state = {
    name: this.props.location.state.artist.name,
    surname: this.props.location.state.artist.surname,
    gender: this.props.location.state.artist.gender,
    artist_type_id: this.props.location.state.artist.artist_type_id,
    poster: this.props.location.state.artist.poster,
    bio: this.props.location.state.artist.bio,
    birth_date: this.props.location.state.artist.birth_date,
    country: this.props.location.state.artist.country,
    id: this.props.location.state.artist.id,
    _method: "PUT"
  };

  componentDidMount() {
    console.log(this.props.location.state.artist);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formUpload = event => {
    event.preventDefault();
    const fd = new FormData();
    const user = JSON.parse(localStorage.getItem("user"));

    fd.append("poster", this.state.poster, this.state.poster.name);
    fd.append("surname", this.state.surname);
    fd.append("gender", this.state.gender);
    fd.append("artist_type_id", this.state.artist_type_id);
    fd.append("name", this.state.name);
    fd.append("bio", this.state.bio);
    fd.append("birth_date", this.state.birth_date);
    fd.append("country", this.state.country);
    fd.append("_method", this.state._method);

    axios
      .post(`${net}/api/artists/${this.state.id}`, fd, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        console.log(res);
        alert("Artist succesfully edited!");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fileSelectedHandler = event => {
    this.setState({
      poster: event.target.files[0]
    });
  };

  deleteArtist = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .delete(`${net}/api/artists/${this.state.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        console.log(res);
        alert("Artist succesfully deleted!");
      })
      .catch(function(error) {
        console.log(error);
      });

    this.props.history.push("/");
  };

  render() {
    const { artist } = this.props.location.state;
    return (
      <Container className="text-center p-3" style={{ color: "white" }}>
        <Form style={{ width: "500px", margin: "0 auto" }}>
          <h3>Edit actor's info</h3>
          <img
            style={{ height: "300px", display: "block", margin: "20px auto" }}
            src={artist.poster}
            alt="Ashleigh Grady"
          />

          <Form.Group>
            <Form.Label style={{ color: "white" }}>
              Artist's poster file
            </Form.Label>

            <input
              type="file"
              onChange={this.fileSelectedHandler}
              className="form-control-file bg-white p-1 rounded"
              name="file"
              style={{ color: "black" }}
            />
          </Form.Group>

          <Form.Group
            className="my-2"
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Label style={{ color: "white" }}>Artist's name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
            />
          </Form.Group>
          <Form.Group
            className="my-2"
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Label style={{ color: "white" }}>Artist's surname</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              value={this.state.surname}
              name="surname"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "white" }}>Gender</Form.Label>
            <Form.Control
              as="select"
              value={this.state.gender}
              onChange={this.handleChange}
              name="gender"
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className="my-2"
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Label style={{ color: "white" }}>
              Artist's biography
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="6"
              onChange={this.handleChange}
              value={this.state.bio}
              name="bio"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "white" }}>
              Actor's birth date
            </Form.Label>
            <Form.Control
              type="text"
              value={this.state.birth_date}
              name="birth_date"
              onChange={this.handleChange}
            />
            <Form.Text className="text-primary">
              input example yyyy-mm-dd 1972-09-04
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "white" }}>
              Artist's origin country
            </Form.Label>
            <Form.Control
              type="text"
              value={this.state.country}
              name="country"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <Button
          variant="outline-primary"
          onClick={() => this.props.history.goBack()}
        >
          Go back
        </Button>
        <Button className="mx-4" onClick={this.formUpload}>
          Submit
        </Button>
        <Button variant="danger" onClick={this.deleteArtist}>
          Delete
        </Button>
      </Container>
    );
  }
}

export default EditActor;
